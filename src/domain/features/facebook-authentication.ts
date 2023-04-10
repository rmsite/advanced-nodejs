import { type AuthenticationError } from '@/domain/entities/errors'
import { type AccessToken } from '@/domain/entities'

export interface FaceBookAuthentication {
  perform: (params: FaceBookAuthentication.Params) => Promise<FaceBookAuthentication.Result>
}

export namespace FaceBookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
