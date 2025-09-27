import express from 'express';
import verifyJwt from '../middlewares/jwt.js';
import { deleteDocuments, editDocuments, getDocumentsbyUser, postDocuments, toggleImp } from '../controllers/document.js';

const docRouter = express.Router();

docRouter.post('/docs', verifyJwt, postDocuments);
docRouter.get('/docs', verifyJwt, getDocumentsbyUser);
docRouter.put('/docs/:docId', verifyJwt, editDocuments);
docRouter.delete('/docs/:docId', verifyJwt, deleteDocuments);
docRouter.patch('/docs/:docId', verifyJwt, toggleImp);

export default docRouter;