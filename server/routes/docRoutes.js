import express from 'express';
import verifyJwt from '../middlewares/jwt.js';
import { getDocumentsbyUser, postDocuments } from '../controllers/document.js';

const docRouter = express.Router();

docRouter.post('/docs', verifyJwt, postDocuments);
docRouter.get('/docs', verifyJwt, getDocumentsbyUser);

export default docRouter;