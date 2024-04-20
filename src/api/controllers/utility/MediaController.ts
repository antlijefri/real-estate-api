import { Get, JsonController, Param, Post, QueryParam, Res, UploadedFiles } from 'routing-controllers';
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

    @Post('/upload')
    public async upload(@Res() response: any, @QueryParam('path') path: string, @UploadedFiles('files', { required: true }) files: Array<{ mimetype: string, buffer: Buffer }>): Promise<any> {

        const uploadSaveFiles = [];

        for (const file of files) {
            try {
                const uploadSave = this.mediaService.uploadBuffer(file.buffer, file.mimetype, path?.length ? path : '/');
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

    @Get('/preview/:fileName')
    public async preview(@QueryParam('path') path: string, @QueryParam('height') height: number, @QueryParam('width') width: number, @Param('fileName') fileName: string, @Res() response: any): Promise<any> {
        try {

            const preview = await this.mediaService.preview(fileName, path, height, width);

            response.writeHead(200, {
                'Content-Type': preview.contentType,
                'Content-Length': preview.buffer.length
            });

            return response.end(preview.buffer);

        } catch (err) {

            return response.status(400).send({
                message: err,
            });

        }
    }
}
