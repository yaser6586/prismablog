import { S3Client } from "@aws-sdk/client-s3";
export const endpoint = process.env.LIARA_ENDPOINT as string
export const bucket = process.env.LIARA_BUCKET_NAME as string
export const accessKey = process.env.LIARA_ACCESS_KEY as string
export const secretKey = process.env.LIARA_SECRET_KEY as string

export const client = new S3Client({
    region: "default" ,
	endpoint: endpoint,
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretKey
	},
});

