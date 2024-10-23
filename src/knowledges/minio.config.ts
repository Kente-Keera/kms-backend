import * as Minio from 'minio';
// import * as sharp from 'sharp';
import { HttpException, HttpStatus } from '@nestjs/common';

interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | string;
}

// accepted only pdf or docx
type AppMimeType =
  | 'application/pdf'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const bucket = 'document';

function isValidMimeType(mimeType: string): boolean {
  const validMimeTypes: AppMimeType[] = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  return validMimeTypes.includes(mimeType as AppMimeType);
}

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9001,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "miniopassword",
  pathStyle: true,
});

export const saveFiletToBucket = async (
  file: BufferedFile,
  destinationObject: string,
): Promise<any> => {
  if (!isValidMimeType(file.mimetype)) {
    throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
  }

  const exists = await minioClient.bucketExists(bucket);
  if (exists) {
    console.log('Bucket ' + bucket + ' exists.');
  } else {
    await minioClient.makeBucket(bucket, 'us-east-1');
    console.log('Bucket ' + bucket + ' created in "us-east-1".');
  }
  const metaData: any = {
    'Content-Type': file.mimetype,
    'X-Amz-Meta-Testing': 1234,
  };

  await minioClient.putObject(bucket, destinationObject, file.buffer, metaData);
};



export const deleteFileFormBucket = async (fileName: string) => {
  await minioClient.removeObject(bucket, fileName);
  console.log('Delete File on Bucket : ' + fileName);
};
