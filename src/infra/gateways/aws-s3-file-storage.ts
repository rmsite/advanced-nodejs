import { type DeleteFile, type UploadFile } from '@/domain/contracts/gateways'

import { config, S3 } from 'aws-sdk'

export class AwsS3FileStorage implements DeleteFile, UploadFile {
  constructor (accessKey: string, secret: string, private readonly bucket: string, s3endpoint?: string) {
    config.update({
      accessKeyId: accessKey,
      secretAccessKey: secret,
      s3: {
        endpoint: s3endpoint,
        s3ForcePathStyle: true
      }
    })
  }

  async upload ({ fileName, file }: UploadFile.Input): Promise<UploadFile.Output> {
    await new S3().putObject({
      Bucket: this.bucket,
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    }).promise()
    return `https://${this.bucket}.s3.amazonaws.com/${encodeURIComponent(fileName)}`
  }

  async delete ({ fileName }: DeleteFile.Input): Promise<void> {
    await new S3().deleteObject({
      Bucket: this.bucket,
      Key: fileName
    }).promise()
  }
}
