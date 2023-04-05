import { type FaceBookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredFieldError, ServerError } from '@/application/errors'
import { badRequest, type HttpResponse } from '@/application/helpers'

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FaceBookAuthentication) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }
      const result = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (result instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: result.value
          }
        }
      } else {
        return {
          statusCode: 401,
          data: result
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: new ServerError(error as Error)
      }
    }
  }
}
