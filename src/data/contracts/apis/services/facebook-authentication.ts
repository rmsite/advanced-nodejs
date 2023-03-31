import { type FaceBookAuthentication } from '@/domain/features'
import { type LoadFacebookUserAPi } from '../facebook'
import { type UpdateFacebookAccountRepository, type CreateFacebookAccountRepository, type LoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserAPi,
    private readonly userAccountRepo: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}

  async perform (params: FaceBookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })
      if (accountData !== undefined) {
        await this.userAccountRepo.updateWithFacebook({
          id: accountData.id,
          name: accountData.name ?? fbData.name,
          facebookId: fbData.facebookId
        })
      } else {
        await this.userAccountRepo.createFromFacebook(fbData)
      }
    }
    return new AuthenticationError()
  }
}
