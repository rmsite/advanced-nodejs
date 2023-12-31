import { makeSavePictureController } from '@/main/factories/application/controllers'
import { adaptExpressRoute as adapt, adaptMulter as upload } from '@/main/adapters'

import { type Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(makeSavePictureController()))
  router.put('/users/picture', auth, upload, adapt(makeSavePictureController()))
}
