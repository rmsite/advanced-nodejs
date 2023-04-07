import { type Controller } from '@/application/controllers'
import { type RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return (async (req, res) => {
    const httpResponse = await controller.handle({ ...req.body })

    if (httpResponse.statusCode === 200) {
      res.status(200).json(httpResponse.data)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
    }
  }) as RequestHandler
}
