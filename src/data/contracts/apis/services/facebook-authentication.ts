import { type FaceBookAuthentication } from '@/domain/features'
import { type LoadFacebookUserAPi } from '../facebook'
import { AuthenticationError } from '@/domain/errors'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserAPi
  ) {}

  async perform (params: FaceBookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}
