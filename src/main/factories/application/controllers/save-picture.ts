import { SavePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '../../domain/use-cases'

export const makeSavePictureController = (): SavePictureController => {
  return new SavePictureController(makeChangeProfilePicture())
}
