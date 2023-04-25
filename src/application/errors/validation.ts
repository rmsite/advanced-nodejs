export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined ? 'Field is required' : `Field ${fieldName} is required`
    super(message)
    this.name = 'ServerError'
  }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Invalid type. Allowed type: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (maxSizeInMb: number) {
    super(`File upload limit is: ${maxSizeInMb}MB`)
    this.name = 'MaxFileSizeError'
  }
}
