import { Schema, model } from "mongoose";

const documentSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    fileid: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    size: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    uploadedAt: {
        type: Date,
        default: Date.now()
    }
})

const Document = model("Document", documentSchema);

export default Document;