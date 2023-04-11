/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { type HttpResponse } from '@/application/helpers'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { type RequestHandler } from 'express'
import { mock } from 'jest-mock-extended'

type Adapter = (middleware: Middleware) => RequestHandler

const adaptExpressMiddleware: Adapter = middleware => async (req, res, next) => {
  await middleware.handle({ ...req.headers })
}

interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}

describe('ExpressMiddleware', () => {
  it('Should call handle with correct request', async () => {
    const req = getMockReq({ headers: { any: 'any' } })
    const res = getMockRes().res
    const next = getMockRes().next
    const middleware = mock<Middleware>()
    const sut = adaptExpressMiddleware(middleware)

    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })

  it('Should call handle with empty request', async () => {
    const req = getMockReq()
    const res = getMockRes().res
    const next = getMockRes().next
    const middleware = mock<Middleware>()
    const sut = adaptExpressMiddleware(middleware)

    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({})
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })
})
