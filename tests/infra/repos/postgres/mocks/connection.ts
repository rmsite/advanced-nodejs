import { PgConnection } from '@/infra/repos/postgres/helpers'

import { newDb, type IMemoryDb } from 'pg-mem'

export const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb({ autoCreateForeignKeyIndices: true })
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database'
  })
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'version'
  })
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/repos/postgres/entities/index.ts']
  })
  await connection.synchronize()
  await PgConnection.getInstance().connect()
  return db
}
