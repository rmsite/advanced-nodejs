import { PgUser } from '@/infra/repos/postgres/entities'
import { type SaveFacebookAccount, type LoadUserAccount } from '@/domain/contracts/repos'
import { PgRepository } from '@/infra/repos/postgres/repository'

export class PgUserAccountRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadUserAccount.Input): Promise<LoadUserAccount.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ where: { email } })
    if (pgUser !== undefined && pgUser !== null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveFacebookAccount.Input): Promise<SaveFacebookAccount.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
