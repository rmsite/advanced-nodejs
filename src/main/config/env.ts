export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '',
    accessToken: process.env.FB_ACCESS_TOKEN ?? ''
  },
  s3: {
    accessKey: process.env.AWS_S3_ACCESS_KEY ?? '',
    secret: process.env.AWS_S3_SECRET ?? '',
    bucket: process.env.AWS_S3_BUCKET ?? '',
    endpoint: process.env.AWS_S3_ENDPOINT ?? ''
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? ''
}

/* TODO
import { DataSource, type DataSourceOptions } from 'typeorm'

const config: DataSourceOptions = {
  type: 'postgres',
  host: 'motty.db.elephantsql.com',
  port: 5432,
  username: 'ildwvnre',
  password: 'cMz2508RQg5vsmzK678j3zT5UbwukabL',
  database: 'ildwvnre',
  entities: ['dist/infra/postgres/entities/index.js']
}

export const connectDB = new DataSource(config)
*/
