import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {unlink, writeFile, mkdir} from 'fs/promises';
import {extname, join} from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);
  private readonly ALLOWED_PDF_TYPES = ['application/pdf'];
  private readonly ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/jpg',
  ];
  private readonly MAX_PDF_SIZE = 10 * 1024 * 1024;

  async uploadImage(
    files: Express.Multer.File[],
    folder: string,
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const imagePaths: string[] = [];

    for (const file of files) {
      if (!this.ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        throw new BadRequestException(`Invalid file type: ${file.mimetype}`);
      }

      const uniqueName = this.generateUniqueName(file.originalname);
      const relativePath = `/uploads/${folder}`;
      const fullPath = join(process.cwd(), relativePath);
      const filePath = join(fullPath, uniqueName);

      try {
        await this.ensureDirectoryExists(fullPath);

        // Convert the image to webp format
        const webpBuffer = await sharp(file.buffer)
          .webp({quality: 80})
          .toBuffer();
        const webpFilePath = filePath.replace(extname(filePath), '.webp');

        await writeFile(webpFilePath, webpBuffer);
        imagePaths.push(join(relativePath, uniqueName.replace(extname(uniqueName), '.webp')));
        this.logger.log(`Successfully saved image: ${webpFilePath}`);
      } catch (error) {
        this.logger.error(`Error saving image: ${filePath}`, error.stack);
        throw new BadRequestException(
          `Error saving image: ${file.originalname}`,
        );
      }
    }

    return imagePaths;
  }

  async deleteImages(imagePaths: string[]): Promise<void> {
    const errors: string[] = [];

    for (const path of imagePaths) {
      try {
        const fullPath = join(process.cwd(), path);
        if (fs.existsSync(fullPath)) {
          await unlink(fullPath);
          this.logger.log(`Successfully deleted image: ${path}`);
        } else {
          this.logger.warn(`File not found: ${path}`);
        }
      } catch (error) {
        this.logger.error(`Error deleting image: ${path}`, error.stack);
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
      throw new BadRequestException('No PDF files uploaded');
    }

    const pdfPaths: string[] = [];

    for (const file of files) {
      if (!this.ALLOWED_PDF_TYPES.includes(file.mimetype)) {
        throw new BadRequestException('Only PDF files are allowed');
      }

      if (file.size > this.MAX_PDF_SIZE) {
        throw new BadRequestException(
          `PDF file size exceeds ${this.MAX_PDF_SIZE / (1024 * 1024)}MB limit`,
        );
      }

      const uniqueName = this.generateUniqueName(file.originalname);
      const relativePath = `/uploads/${folder}/pdfs`;
      const fullPath = join(process.cwd(), relativePath);
      const filePath = join(fullPath, uniqueName);

      try {
        await this.ensureDirectoryExists(fullPath);
        await writeFile(filePath, file.buffer);
        pdfPaths.push(join(relativePath, uniqueName));
        this.logger.log(`Successfully saved PDF: ${filePath}`);
      } catch (error) {
        this.logger.error(`Error saving PDF: ${filePath}`, error.stack);
        throw new BadRequestException(`Error saving PDF: ${file.originalname}`);
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
          this.logger.log(`Successfully deleted file: ${path}`);
        } else {
          this.logger.warn(`File not found: ${path}`);
        }
      } catch (error) {
        this.logger.error(`Error deleting file: ${path}`, error.stack);
        errors.push(`Error deleting file: ${path}`);
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join(', '));
    }
  }

  private generateUniqueName(originalName: string): string {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    return `${randomName}${extname(originalName)}`;
  }

  private async ensureDirectoryExists(directory: string): Promise<void> {
    try {
      await mkdir(directory, {recursive: true});
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }
}
