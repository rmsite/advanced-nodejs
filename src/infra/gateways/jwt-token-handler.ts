import { type TokenGenerator, type TokenValidator } from '@/domain/contracts/gateways'

import { type JwtPayload, sign, verify } from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  constructor (private readonly secret: string) {}

  async generate ({ expirationInMs, key }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const expiraionInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expiraionInSeconds })
  }

  async validate ({ token }: TokenValidator.Input): Promise<TokenValidator.Output> {
    const payload = verify(token, this.secret) as JwtPayload
    return payload.key
  }
}
