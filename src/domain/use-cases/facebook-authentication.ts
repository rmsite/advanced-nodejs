import { type LoadFacebookUserAPi } from '@/domain/contracts/apis'
import { type TokenGenerator } from '@/domain/contracts/crypto'
import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'

type Setup = (facebookApi: LoadFacebookUserAPi, userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository, crypto: TokenGenerator) => FacebookAuthentication
export type FacebookAuthentication = (params: { token: string }) => Promise<AccessToken | AuthenticationError>

export const setupFacebookAuthentication: Setup = (facebookApi, userAccountRepo, crypto) => async params => {
  const fbData = await facebookApi.loadUser(params)
  if (fbData !== undefined) {
    const accountData = await userAccountRepo.load({ email: fbData.email })
    const fbAccount = new FacebookAccount(fbData, accountData)
    const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
    const token = await crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
    return new AccessToken(token)
  }
  return new AuthenticationError()
}
