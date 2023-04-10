import { type ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'motty.db.elephantsql.com',
  port: 5432,
  username: 'ildwvnre',
  password: 'cMz2508RQg5vsmzK678j3zT5UbwukabL',
  database: 'ildwvnre',
  entities: ['dist/infra/postgres/entities/index.js']
}

/* import { DataSource, type DataSourceOptions } from 'typeorm'

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
