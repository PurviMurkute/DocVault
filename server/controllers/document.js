import Document from "../models/Document.js";
import { imagekit } from '../config/imagekit.js';

const postDocuments = async (req, res) => {
  const { url, name, fileid, type, size, uploadedAt } = req.body;
  const userId = req.user?._id;

  try {
    const newDocument = await Document.create({
      url,
      name,
      fileid,
      type: name.split('.').pop(),
      size,
      userId,
      uploadedAt,
    });

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
    const documents = await Document.find({ userId });

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

    return res.status(200).json({
      success: true,
      data: document,
      message: "File deleted successfully"
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
}

export { postDocuments, getDocumentsbyUser, editDocuments, deleteDocuments };
