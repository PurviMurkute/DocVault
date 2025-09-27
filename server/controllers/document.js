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
      documents = await Document.find({ userId }).sort({
        createdAt: -1,
      });
      await createCache(getUserDocCacheKey(userId), documents);
      console.log(`cache create ${userId}`);
    }

    if (documents.length === 0) {
      return res.status(404).json({
        success: false,
        data: null,
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

const deleteDocuments = async (req, res) => {
  const { docId } = req.params;
  const userId = req.user._id;

  try {
    const doc = await Document.findById(docId);
    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    await imagekit.deleteFile(doc.fileid);

    const document = await Document.findByIdAndDelete(docId);

    await flushCache(getUserDocCacheKey(userId));
    console.log(`cache flush ${userId}`);

    return res.status(200).json({
      success: true,
      data: document,
      message: "File deleted successfully",
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
        data: null,
        message: "No documents found matching your search."
      });
    }

    return res.status(200).json({
      success: true,
      data: searchedDocs,
      message: "Documents fetched successfully"
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
  deleteDocuments,
  toggleImp,
  searchDoc,
};
