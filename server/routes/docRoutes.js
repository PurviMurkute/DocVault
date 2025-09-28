import express from "express";
import verifyJwt from "../middlewares/jwt.js";
import {
  deleteDocuments,
  editDocuments,
  getTempDeletedDocuments,
  getDocumentsbyUser,
  postDocuments,
  searchDoc,
  tempDelete,
  toggleImp,
  restoreDocument,
} from "../controllers/document.js";

const docRouter = express.Router();

docRouter.post("/docs", verifyJwt, postDocuments);
docRouter.get("/docs", verifyJwt, getDocumentsbyUser);
docRouter.get("/docs/search", verifyJwt, searchDoc);
docRouter.put("/docs/:docId", verifyJwt, editDocuments);
docRouter.patch(`/docs/delete/:docId`, verifyJwt, tempDelete);
docRouter.patch("/docs/restore/:docId", verifyJwt, restoreDocument);
docRouter.delete("/docs/:docId", verifyJwt, deleteDocuments);
docRouter.get("/docs/deleted", verifyJwt, getTempDeletedDocuments);
docRouter.patch("/docs/:docId", verifyJwt, toggleImp);

export default docRouter;
