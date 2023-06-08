import 'dotenv/config';
import express, { Request, Response } from 'express';
import multer, { memoryStorage } from 'multer';
import { Sharp } from './sharp';
import { join } from 'node:path';

const app = express();
const PORT = process.env.PORT;

const upload = multer({
  storage: memoryStorage(),
});

const sharpUpload = new Sharp();

app.get('/', (req, res) => {
  res.json({
    message: 'Application Is Running',
  });
});

app.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response) => {
    const buf = req.file?.buffer;
    const fileName = await sharpUpload.createThumb(
      buf,
      200,
      200,
      'contain',
      '#000'
    );
    // const imagePath = join(process.cwd(), 'uploads', fileName);
    // res.sendFile(imagePath);
    res.json({ fileName });
  }
);

app.get('/image/:fileName', (req: Request, res: Response) => {
  const imagePath = join(process.cwd(), 'uploads', req.params.fileName);
  res.sendFile(imagePath, { headers: { 'Content-Type': 'image/png' } });
});

app.listen(PORT, () => {
  console.log(`Application is running in the port ${PORT}`);
});
