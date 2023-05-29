import { type Validator, ValidationBuilder as Builder } from '@/application/validation'
import { type HttpResponse, ok } from '@/application/helpers'
import { type ChangeProfilePicture } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ id: userId, file })
    return ok(data)
  }

  override buildValidators ({ file }: any): Validator[] {
    return [
      ...Builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
    ]
  }
}
