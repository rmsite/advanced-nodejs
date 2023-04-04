import { type LoadUserAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

export class PgUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOneBy({ email: params.email })
    if (pgUser !== undefined && pgUser !== null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}
