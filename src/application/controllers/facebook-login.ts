import { type FaceBookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredFieldError } from '@/application/errors'
import { badRequest, unauthorized, type HttpResponse, serverError } from '@/application/helpers'

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FaceBookAuthentication) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }
      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value
          }
        }
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
