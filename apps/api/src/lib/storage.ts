import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const STORAGE_ROOT = path.join(process.cwd(), 'storage', 'media');

if (!fs.existsSync(STORAGE_ROOT)) {
  fs.mkdirSync(STORAGE_ROOT, { recursive: true });
}

export const StorageService = {
  async saveFile(fileName: string, buffer: Buffer): Promise<string> {
    const ext = path.extname(fileName);
    const hash = crypto.randomUUID();
    const diskFileName = `${hash}${ext}`;
    const filePath = path.join(STORAGE_ROOT, diskFileName);
    
    await fs.promises.writeFile(filePath, buffer);
    return diskFileName;
  },
  
  async getFile(diskFileName: string): Promise<Buffer | null> {
    const filePath = path.join(STORAGE_ROOT, diskFileName);
    try {
      return await fs.promises.readFile(filePath);
    } catch (e) {
      return null;
    }
  },

  getMimeType(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase();
    switch (ext) {
      case '.jpg':
      case '.jpeg': return 'image/jpeg';
      case '.png': return 'image/png';
      case '.webp': return 'image/webp';
      case '.gif': return 'image/gif';
      default: return 'application/octet-stream';
    }
  }
};
