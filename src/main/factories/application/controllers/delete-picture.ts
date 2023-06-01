import { DeletePictureController } from '@/application/controllers'
import { makeChangeProfilePicture } from '../../domain/use-cases'

export const makeDeletePictureController = (): DeletePictureController => {
  return new DeletePictureController(makeChangeProfilePicture())
}
