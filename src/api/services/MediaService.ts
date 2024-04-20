import { Service } from 'typedi';
import fs from 'fs';
import { mediaConfig } from '../../config/utils/env';

const mime = require('mime');

enum MediaType {
    video = 'VID',
    image = 'IMG',
    doc = 'DOC',
}

@Service()
export class MediaService {
    constructor() {
        // --
    }

    public uploadBase64(base64: string, path: string): { fileName: string, filePath: string } {

        const base64Type = base64.split(':')[1].split(';')[0];
        const ext = mime.getExtension(base64Type);

        if (!ext) {
            throw new Error('Unable to retrive file type..!');
        }

        let mediaType: any;

        if (mediaConfig.allowedImageType.includes(ext)) {
            mediaType = MediaType.image;
        } else if (mediaConfig.allowedVideoType.includes(ext)) {
            mediaType = MediaType.video;
        } else if (mediaConfig.allowedDocType.includes(ext)) {
            mediaType = MediaType.doc;
        } else {
            throw new Error(`Invalid File Extension ${ext}`);
        }

        const fileName: string = `${mediaType}_${Date.now()}.${ext}`;
        const filePath: string = process.cwd() + '/uploads/' + path;

        if (!fs.existsSync(filePath)) {
            throw new Error('Invalid Path');
        }

        const base64Body = base64.split(',')[1];

        const base64Buffer = Buffer.from(base64Body);
        fs.writeFileSync(filePath + fileName, base64Buffer);

        return {
            fileName: fileName,
            filePath: filePath,
        };
    }

    public uploadBuffer(buffer: Buffer, mimeType: string, path: string): { fileName: string, filePath: string } {

        const ext = mime.getExtension(mimeType);

        if (!ext) {
            throw new Error('Unable to retrive file type..!');
        }

        let mediaType: string;

        if (mediaConfig.allowedImageType.includes(ext)) {
            mediaType = MediaType.image;
        } else if (mediaConfig.allowedVideoType.includes(ext)) {
            mediaType = MediaType.video;
        } else if (mediaConfig.allowedDocType.includes(ext)) {
            mediaType = MediaType.doc;
        } else {
            throw new Error(`Invalid File Extension ${ext}`);
        }

        const fileName: string = `${mediaType}_${Date.now()}.${ext}`;
        const filePath: string = path;

        const filePathSanity = filePath.charAt(filePath.length - 1) == '/' ? filePath : filePath + '/';

        if (!fs.existsSync(process.cwd() + '/uploads/' + filePathSanity)) {
            throw new Error('Invalid Path');
        }

        fs.writeFileSync(process.cwd() + '/uploads/' + filePathSanity + fileName, buffer);

        return {
            fileName,
            filePath: filePathSanity,
        };
    }

    public async preview(fileName: string, path: string, height: number, width: number): Promise<{ buffer: Buffer, contentType: string }> {

        const filePathSanity = path.charAt(path.length - 1) == '/' ? path : path + '/';
        const buffer = fs.readFileSync(process.cwd() + '/uploads/' + filePathSanity + fileName);
        const mimeType = mime.getType(fileName.split('.')[1]);

        const isImageType = mediaConfig.allowedImageType.includes(mime.getExtension(mimeType));

        if (isImageType) {
            const sharp = require('sharp');
            const imageBuffer: Buffer = await new Promise((res, rej) => {
                sharp(buffer)
                    .resize(width, height)
                    .toBuffer((err: any, buff: Buffer) => {
                        if (err) return rej(err);
                        return res(buff);
                    });
            });

            return {
                buffer: imageBuffer,
                contentType: mimeType,
            };
        }

        return {
            buffer,
            contentType: mimeType,
        };
    }
}
