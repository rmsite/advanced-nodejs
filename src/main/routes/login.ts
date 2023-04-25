import { makeFacebookLoginController } from '@/main/factories/application/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/login/facebook', adapt(makeFacebookLoginController()))
}
