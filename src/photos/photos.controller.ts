import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

let filename: string
let extension: string
export const storage = {
  storage: diskStorage({
    destination: './uploads/company/logo',
    filename: (req, file, cb) => {
      filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      extension= path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`)
    }
  })
}

@Controller('photos')
export class PhotosController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(){
    return filename + extension
  }
}
