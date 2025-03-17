import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import sharp from 'sharp';
import * as fs from 'fs';

@Injectable()
export class ServicesService {
  private readonly ALLOWED_PDF = 'application/pdf';
  private readonly ALLOWED_IMAGES_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
  ];
  private readonly MAX_PDF_SIZE = 10 * 1024 * 1024;

  async uploadImages(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No images uploaded');
    }

    const imagesPath: string[] = [];

    for (const file of files) {
      if (!this.ALLOWED_IMAGES_TYPES.includes(file.mimetype)) {
        throw new BadRequestException(`Invalid file type: ${file.mimetype}`);
      }

      const uniqueName = this.generateRandomName(file.originalname);
      const relativePath = `/uploads/${folder}`;
      const fullPath = join(process.cwd(), relativePath);
      const filePath = join(fullPath, uniqueName);

      try {
        await this.ensureDirectoryExists(fullPath);

        const webpBuffer = await sharp(file.buffer)
          .webp({ quality: 75 })
          .toBuffer();
        const webpFilePath = filePath.replace(extname(uniqueName), '.webp');

        await writeFile(webpFilePath, webpBuffer);
        imagesPath.push(
          join(relativePath, uniqueName.replace(extname(uniqueName), '.webp')),
        );
      } catch {
        throw new InternalServerErrorException(
          `Error saving image ${filePath}`,
        );
      }
    }

    return imagesPath;
  }

  async deleteImages(imagePaths: string[]): Promise<void> {
    const errors: string[] = [];
    for (const path of imagePaths) {
      try {
        const fullPath = join(process.cwd(), path);
        if (fs.existsSync(fullPath)) {
          await unlink(fullPath);
        }
      } catch {
        errors.push(`Error deleting image: ${path}`);
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join(', '));
    }
  }

  async uploadPDF(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException(
        'Only files with .pdf extension is allowed',
      );
    }

    const pdfPaths: string[] = [];

    for (const file of files) {
      if (!this.ALLOWED_PDF.includes(file.mimetype)) {
        throw new BadRequestException(
          'Only files with .pdf extension is allowed',
        );
      }

      if (file.size > this.MAX_PDF_SIZE) {
        throw new BadRequestException(
          `PDF file size exceeds ${this.MAX_PDF_SIZE / (1024 * 1024)}MB limit`,
        );
      }

      const uniqueName = this.generateRandomName(file.originalname);
      const relativePath = `uploads/${folder}/pdfs`;
      const fullPath = join(process.cwd(), relativePath);
      const filePath = join(fullPath, uniqueName);

      try {
        await this.ensureDirectoryExists(fullPath);
        await writeFile(filePath, file.buffer);
        pdfPaths.push(join(relativePath, uniqueName));
      } catch {
        throw new BadRequestException(`Error savig PDF: ${file.originalname}`);
      }
    }

    return pdfPaths;
  }

  async deleteFiles(filePaths: string[]): Promise<void> {
    const errors: string[] = [];
    for (const path of filePaths) {
      try {
        const fullPath = join(process.cwd(), path);
        if (fs.existsSync(fullPath)) {
          await unlink(fullPath);
        }
      } catch {
        errors.push(`Error deleting file: ${path}`);
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join(', '));
    }
  }

  private generateRandomName(originalName: string): string {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    return `${randomName}${extname(originalName)}`;
  }

  private async ensureDirectoryExists(directory: string): Promise<void> {
    try {
      await mkdir(directory, { recursive: true });
    } catch {
      throw new InternalServerErrorException('Failed to create directory');
    }
  }
}
