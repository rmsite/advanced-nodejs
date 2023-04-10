export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '961574021546434',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'e989dc6676aa98a69ce9d74e1bd47ff1'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'p!#@$FA1'
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
