import { PgUserProfileRepository } from '@/infra/repos/postgres'
import { PgUser } from '@/infra/repos/postgres/entities'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { PgRepository } from '@/infra/repos/postgres/repository'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { type IBackup } from 'pg-mem'
import { type Repository } from 'typeorm'

describe('PgUserProfileRepository', () => {
  let sut: PgUserProfileRepository
  let connection: PgConnection
  let pgUserRepo: Repository<PgUser>
  let backup: IBackup

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = connection.getRepository(PgUser)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserProfileRepository()
  })

  it('Should extend PgRepository', async () => {
    expect(sut).toBeInstanceOf(PgRepository)
  })

  describe('savePicture', () => {
    it('Should update user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', initials: 'any_initials' })

      await sut.savePicture({ id: id.toString(), pictureUrl: 'any_url' })
      const pgUser = await pgUserRepo.findOne({ id })

      expect(pgUser).toMatchObject({ id, pictureUrl: 'any_url', initials: null })
    })
  })

  describe('load', () => {
    it('Should load user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'any_name' })

      const userProfile = await sut.load({ id: id.toString() })

      expect(userProfile?.name).toBe('any_name')
    })

    it('Should load user profile', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email' })

      const userProfile = await sut.load({ id: id.toString() })

      expect(userProfile?.name).toBeUndefined()
    })

    it('Should return undefined', async () => {
      const userProfile = await sut.load({ id: '1' })

      expect(userProfile).toBe(undefined)
    })
  })
})
