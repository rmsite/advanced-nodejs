import { type Controller } from '@/application/controllers'
import { type HttpResponse } from '@/application/helpers'

import { type MockProxy, mock } from 'jest-mock-extended'

class DbTransactionController {
  constructor (
    private readonly decoratee: Controller,
    private readonly db: DbTransaction
  ) { }

  async perform (httpRequest: any): Promise<HttpResponse | undefined> {
    await this.db.openTransaction()
    try {
      const httpResponse = await this.decoratee.perform(httpRequest)
      await this.db.commit()
      await this.db.closeTransaction()
      return httpResponse
    } catch {
      await this.db.rollback()
    }
    await this.db.closeTransaction()
  }
}

interface DbTransaction {
  openTransaction: () => Promise<void>
  closeTransaction: () => Promise<void>
  commit: () => Promise<void>
  rollback: () => Promise<void>
}

describe('DbTransactionController', () => {
  let db: MockProxy<DbTransaction>
  let decoratee: MockProxy<Controller>
  let sut: DbTransactionController

  beforeAll(async () => {
    db = mock()
    decoratee = mock()
    decoratee.perform.mockResolvedValue({ statusCode: 204, data: null })
  })

  beforeEach(() => {
    sut = new DbTransactionController(decoratee, db)
  })

  it('Should open transaction', async () => {
    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })

  it('Should execute decoratee', async () => {
    await sut.perform({ any: 'any' })

    expect(decoratee.perform).toHaveBeenCalledWith({ any: 'any' })
    expect(decoratee.perform).toHaveBeenCalledTimes(1)
  })

  it('Should call commit abd close transaction on success', async () => {
    await sut.perform({ any: 'any' })

    expect(db.commit).toHaveBeenCalledWith()
    expect(db.commit).toHaveBeenCalledTimes(1)
    expect(db.rollback).not.toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('Should call rollback abd close transaction on failure', async () => {
    decoratee.perform.mockRejectedValueOnce(new Error('decoratee_error'))
    await sut.perform({ any: 'any' })

    expect(db.commit).not.toHaveBeenCalledWith()
    expect(db.rollback).toHaveBeenCalledWith()
    expect(db.rollback).toHaveBeenCalledTimes(1)
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('Should return same result as decoratee on success', async () => {
    const httpRequest = await sut.perform({ any: 'any' })

    expect(httpRequest).toEqual({ statusCode: 204, data: null })
  })
})
