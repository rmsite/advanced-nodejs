import { type TokenValidator } from '@/domain/contracts/crypto'
import { type Authorize, setupAuthorize } from '@/domain/use-cases'

import { mock, type MockProxy } from 'jest-mock-extended'

describe('Authorize', () => {
  let crypto: MockProxy<TokenValidator>
  let sut: Authorize
  let token: string

  beforeAll(() => {
    token = 'any_token'
    crypto = mock()
    crypto.validateToken.mockResolvedValue('any_value')
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('Should call TokenValidator with correct input', async () => {
    await sut({ token })

    expect(crypto.validateToken).toHaveBeenCalledWith({ token: 'any_token' })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })

  it('Should return the correct accessToken', async () => {
    const userId = await sut({ token })

    expect(userId).toBe('any_value')
  })
})
