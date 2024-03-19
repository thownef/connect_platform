import aws from 'aws-sdk';
import dotenv from 'dotenv';
import crypto, { randomBytes } from 'crypto';
dotenv.config();

const region = 'ap-southeast-1';
const bucketName = 'vjpconnect';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

export async function generateUploadURL(id) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: `${id}/${imageName}`,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}

export async function deleteImage(name) {
  const params = {
    Bucket: bucketName,
    Key: name,
  };

  try {
    await s3.deleteObject(params).promise();
    return { message: 'Image deleted from S3' };
  } catch (error) {
    return { error: 'Failed to delete image from S3' };
  }
}
