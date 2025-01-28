import { ProductModel } from '../models/productsModel.js'

export class ProductController {
  static async getAll(req, res) {
    const products = await ProductModel.getAll()
    res.json(products)
  }

  static async create(req, res) {
    const newProduct = await ProductModel.create({ input: req.body })

    res.status(201).json(newProduct)
  }

  static async update(req, res) {
    const { id } = req.params

    const updatedProduct = await ProductModel.update({ id, input: req.body })

    return res.json(updatedProduct)
  }

  static async delete(req, res) {
    const { id } = req.params

    const result = await ProductModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.json({ message: 'Product deleted' })
  }
}
