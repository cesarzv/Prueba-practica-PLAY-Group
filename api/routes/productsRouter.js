import { Router } from 'express'
import { ProductController } from '../controllers/productsController.js'

export const productsRouter = Router()

productsRouter.get('/', ProductController.getAll)

productsRouter.post('/', ProductController.create)

productsRouter.put('/:id', ProductController.update)

productsRouter.delete('/:id', ProductController.delete)
