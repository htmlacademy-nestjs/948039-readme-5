import { BadRequestException, Controller, Get, Param, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationServiceURL } from './app.config';
import 'multer';
import { Express } from 'express';
import { ALLOWED_MIME_TYPES, MAX_AVATAR_SIZE, MAX_PHOTO_SIZE } from './constants';

@Controller('file')
@UseFilters(AxiosExceptionFilter)
export class FileController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/avatar/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File
    ) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file format. Only JPEG and PNG images are allowed.');
    }
    if (file.size > MAX_AVATAR_SIZE) {
      throw new BadRequestException('File size exceeds the maximum limit of 1 megabyte.');
    }
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', blob, file.originalname);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.File}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
    }});
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/photo/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhotoFile(
    @UploadedFile() file: Express.Multer.File
    ) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file format. Only JPEG and PNG images are allowed.');
    }
    if (file.size > MAX_PHOTO_SIZE) {
      throw new BadRequestException('File size exceeds the maximum limit of 0.5 megabyte.');
    }
    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', blob, file.originalname);
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.File}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
    }});
    return data;
  }

  @Get('/:fileId')
  public async show(@Param('fileId') fileId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.File}/${fileId}`);
    return data;
  }
}
