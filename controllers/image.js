import { deleteImage, generateUploadURL } from '../s3.js';

export const uploadS3 = async (req, res) => {
  const url = await generateUploadURL(req.body.id);
  res.send({ url });
};

export const deleteImageS3 = async (req, res) => {
  const data = await deleteImage(req.query.imageName);
  res.send({ data });
};
