import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'

import { type IBackup, newDb, type IMemoryDb } from 'pg-mem'
import { type Repository, getRepository, getConnection } from 'typeorm'

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
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
    entities: entities ?? ['src/infra/postgres/entities/index.ts']
  })
  await connection.synchronize()
  return db
}

describe('PgUserAccountRepository', () => {
  describe('load', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })

    afterAll(async () => {
      await getConnection().close()
    })
    beforeEach(() => {
      backup.restore()
      sut = new PgUserAccountRepository()
    })

    it('Should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: '1' })
    })
    it('Should return undefined if email does not exists', async () => {
      const account = await sut.load({ email: 'new_email' })

      expect(account).toBe(undefined)
    })
  })
})
