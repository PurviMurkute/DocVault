import ImageKit from 'imagekit';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const Router = express.Router();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

Router.get('/auth', (req, res) => {
    const result = imagekit.getAuthenticationParameters();

    console.log(result);

    return res.status(200).json({
        success: true,
        data: result,
        message: "success"
    })
})

export default Router;