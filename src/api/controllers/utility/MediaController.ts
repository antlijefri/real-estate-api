import { Get, JsonController, Param, Post, Res, UploadedFiles } from 'routing-controllers';
import { Service } from 'typedi';
import { MediaService } from '../../services/MediaService';

@Service()
@JsonController('/media')
export class MediaController {
    constructor(
        private mediaService: MediaService
    ) {
        // --
    }

    @Post('/upload/:path')
    public async upload(@Res() response: any, @Param('path') path: string, @UploadedFiles('files', { required: true }) files: Array<{ mimetype: string, buffer: Buffer }>): Promise<any> {

        const uploadSaveFiles = [];

        for (const file of files) {
            try {
                const uploadSave = this.mediaService.uploadBuffer(file.buffer, file.mimetype, path);
                uploadSaveFiles.push(uploadSave);
            } catch (err: any) {
                return response.status(400).send({
                    message: err.message,
                });
            }
        }

        return response.status(200).send({
            message: `Successfully uploaded Files...!`,
            data: uploadSaveFiles,
        });
    }
}
