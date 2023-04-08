import { S3 } from "aws-sdk";
import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: "v4",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ex = (req.query.fileType as string).split("/")[1];

  const Key = `${randomUUID()}.${ex as string}`;

  const uploadUrl = s3.getSignedUrl("putObject", {
    Bucket: process.env.BUCKET_NAME,
    Key,
    Expires: 60,
    ContentType: `image/${ex as string}`,
  });

  console.log("uploadUrl", uploadUrl);

  res.status(200).json({
    uploadUrl,
    key: Key,
  });
}
