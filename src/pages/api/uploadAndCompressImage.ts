import { S3 } from "aws-sdk";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: "v4",
});

type RequestBody = {
  imageDataUrl: string;
  fileType: string;
};

function isValidBody<T extends Record<string, unknown>>(
  body: any,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body as object).every((key) => fields.includes(key));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!isValidBody<RequestBody>(req.body, ["imageDataUrl", "fileType"])) {
      return res.status(400).end();
    } else {
      const imageDataUrl = req.body.imageDataUrl;
      const imageDataRegex = /^data:image\/\w+;base64,/;
      const imageData = Buffer.from(
        imageDataUrl.replace(imageDataRegex, ""),
        "base64"
      );
      const compressedImage = await sharp(imageData)
        .resize({ width: 400 })
        .jpeg({ quality: 80 })
        .toBuffer();

      const ex = req.body.fileType.split("%2F")[1];

      const Key = `${randomUUID()}.${ex as string}`;

      const params = {
        Bucket: process.env.BUCKET_NAME as string,
        Key,
        ContentType: `image/${ex as string}`,
        Body: compressedImage,
      };

      const result = await s3.upload(params).promise();
      res.status(200).json({ imageUrl: result.Location });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to compress and upload image" });
  }
}
