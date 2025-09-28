import { Schema, model } from "mongoose";

const documentSchema = new Schema(
  {
    url: {
      type: String,
    },
    name: {
      type: String,
    },
    fileid: {
      type: String,
    },
    type: {
      type: String,
    },
    size: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    uploadedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Document = model("Document", documentSchema);

export default Document;
