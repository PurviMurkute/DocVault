import Document from "../models/Document.js";
import { imagekit } from "../config/imagekit.js";
import { createCache, flushCache, getCache } from "../utils/cache.js";

const getUserDocCacheKey = (userId) => `Documents:${userId}`;

const postDocuments = async (req, res) => {
  const { url, name, fileid, type, size, uploadedAt } = req.body;
  const userId = req.user?._id;

  try {
    const newDocument = await Document.create({
      url,
      name,
      fileid,
      type: name.split(".").pop(),
      size,
      userId,
      uploadedAt,
    });

    await flushCache(getUserDocCacheKey(userId));
    console.log(`cache flush ${userId}`);

    return res.status(201).json({
      success: true,
      data: newDocument,
      message: "Document uploaded successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const getDocumentsbyUser = async (req, res) => {
  const userId = req?.user?._id;

  try {
    let documents = [];

    const documentsFromRedis = await getCache(getUserDocCacheKey(userId));
    if (documentsFromRedis) {
      documents = documentsFromRedis;
    } else {
      documents = await Document.find({ userId, isDeleted: false }).sort({
        createdAt: -1,
      });
      await createCache(getUserDocCacheKey(userId), documents);
      console.log(`cache create ${userId}`);
    }

    console.log("USER ID in getDocumentsbyUser:", userId, documents);

    if (documents.length === 0) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "No documents added yet",
      });
    }

    return res.status(200).json({
      success: true,
      data: documents,
      message: "Documents fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const editDocuments = async (req, res) => {
  const { docId } = req.params;
  const { name } = req.body;
  const userId = req.user._id;

  if (!name) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Document name is required",
    });
  }

  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      docId,
      { name },
      { new: true }
    );

    await flushCache(getUserDocCacheKey(userId));
    console.log(`cache flush ${userId}`);

    return res.status(200).json({
      success: true,
      data: updatedDocument,
      message: "File name updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const tempDelete = async (req, res) => {
  const { docId } = req.params;
  const userId = req.user._id;

  try {
    const doc = await Document.findOne({ _id: docId, userId: userId });
    if (!doc || doc.isDeleted === true) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    (doc.isDeleted = true), (doc.deletedAt = new Date());
    await doc.save();
    await flushCache(getUserDocCacheKey(userId));
    await flushCache(`Temp deleted: ${userId}`);

    return res.status(200).json({
      success: true,
      data: doc,
      message: "Document moved to trash",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: [],
      message: error?.message,
    });
  }
};

const deleteDocuments = async (req, res) => {
  const { docId } = req.params;
  const userId = req.user._id;

  try {
    const doc = await Document.findOne({ _id: docId, userId });
    if (!doc || doc.isDeleted !== true) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    await imagekit.deleteFile(doc.fileid);
    await Document.deleteOne({ _id: docId, userId });

    await flushCache(`Temp deleted: ${userId}`);

    return res.status(200).json({
      success: true,
      data: doc,
      message: "Document permanently deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const getTempDeletedDocuments = async (req, res) => {
  const userId = req.user._id;
  try {
    let deletedDocs = [];

    const deletedDocsFromRedis = await getCache(`Temp deleted: ${userId}`);

    if (deletedDocsFromRedis) {
      deletedDocs = deletedDocsFromRedis;
    } else {
      deletedDocs = await Document.find({
        userId,
        isDeleted: true,
      }).sort({ deletedAt: -1 });

      await createCache(`Temp deleted: ${userId}`, deletedDocs);
      console.log(`cache created for deleted doc ${userId}`);
    }

    if (deletedDocs.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Trash is empty",
      });
    }

    return res.status(200).json({
      success: true,
      data: deletedDocs,
      message: "deleted docs fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const restoreDocument = async (req, res) => {
  const { docId } = req.params;

  try {
    const document = await Document.findOne({
      _id: docId,
      userId: req.user._id,
    });

    if (!document || document.isDeleted !== true) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Document not found",
      });
    }

    (document.isDeleted = false),
      (document.deletedAt = null),
      await document.save();

    await flushCache(getUserDocCacheKey(req.user._id));
    await flushCache(`Temp deleted: ${req.user._id}`);

    return res.status(200).json({
      success: true,
      data: document,
      message: "Document restored successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const toggleImp = async (req, res) => {
  const { docId } = req.params;
  const userId = req.user._id;

  try {
    const document = await Document.findById(docId);
    if (!document) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Document not found",
      });
    }

    if (document.isDeleted) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Cannot mark deleted document as important",
      });
    }

    document.isImportant = !document.isImportant;
    await document.save();
    await flushCache(getUserDocCacheKey(userId));

    return res.status(200).json({
      success: true,
      data: document,
      message: `Marked as ${
        document.isImportant ? "important" : "unimportant"
      }`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const searchDoc = async (req, res) => {
  const { query } = req.query;
  const userId = req.user._id;

  try {
    const searchedDocs = await Document.find({
      userId: userId,
      name: { $regex: query, $options: "i" },
    });

    if (searchedDocs.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No documents found matching your search.",
      });
    }

    return res.status(200).json({
      success: true,
      data: searchedDocs,
      message: "Documents fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

export {
  postDocuments,
  getDocumentsbyUser,
  editDocuments,
  tempDelete,
  deleteDocuments,
  getTempDeletedDocuments,
  restoreDocument,
  toggleImp,
  searchDoc,
};
