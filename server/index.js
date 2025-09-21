import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    })
});

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
    
})