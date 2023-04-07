import { type Request, type Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { type Controller } from '@/application/controllers'
import { type MockProxy, mock } from 'jest-mock-extended'

class ExpressRouter {
  constructor (private readonly controller: Controller) {}

  async adapt (req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
  }
}

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let controller: MockProxy<Controller>
  let sut: ExpressRouter

  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    controller = mock()
    sut = new ExpressRouter(controller)
  })

  it('Shoul call handle with correct request', async () => {
    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })

  it('Shoul call handle with empty request', async () => {
    const req = getMockReq()

    await sut.adapt(req, res)

    expect(controller.handle).toHaveBeenCalledWith({})
  })
})
