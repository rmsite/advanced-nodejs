import { type AuthenticationError } from '@/domain/errors'
import { type AccessToken } from '@/domain/models'

export interface FaceBookAuthentication {
  perform: (params: FaceBookAuthentication.Params) => Promise<FaceBookAuthentication.Result>
}

export namespace FaceBookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
