import { Module } from '@nestjs/common';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FilesConfigModule, getMongooseOptions } from '@project/libs/config/files';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    FileUploaderModule,
    FilesConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
