import { type FaceBookAuthentication } from '@/domain/features'

import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { type TokenGenerator } from '@/domain/contracts/crypto'
import { type LoadFacebookUserAPi } from '@/domain/contracts/apis'

export class FacebookAuthenticationUseCase implements FaceBookAuthentication {
  constructor (
    private readonly facebookApi: LoadFacebookUserAPi,
    private readonly userAccountRepo: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform (params: FaceBookAuthentication.Params): Promise<FaceBookAuthentication.Result> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await this.userAccountRepo.saveWithFacebook(fbAccount)
      const token = await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return new AccessToken(token)
    }
    return new AuthenticationError()
  }
}
