import Document from "../models/Document.js";

const postDocuments = async (req, res) => {
  const { url, name, fileid, type, size, userId, uploadedAt } = req.body;

  if (!url || !fileid) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "file is required",
    });
  }

  try {
    const newDocument = new Document.create({
      url,
      name,
      fileid,
      type,
      size,
      userId,
      uploadedAt,
    });

    const savedDoc = await newDocument.save();

    return res.status(201).json({
      success: true,
      data: savedDoc,
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
    const documents = await Document.find({ _id: userId });

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

export { postDocuments, getDocumentsbyUser };
