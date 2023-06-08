import sharp from 'sharp';
import { randomUUID } from 'crypto';

export class Sharp {
  async createThumb(
    buffer: any,
    w: number,
    h: number,
    fit: 'cover' | 'contain' | 'fill',
    bg: string
  ) {
    const idUnique = randomUUID();
    await sharp(buffer)
      .resize(w, h, {
        kernel: sharp.kernel.nearest,
        fit: fit,
        position: 'center',
        background: bg,
      })
      .toFile(`./uploads/${idUnique}.png`);
    return `${idUnique}.png`;
  }
}
