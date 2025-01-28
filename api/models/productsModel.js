import { randomUUID } from 'node:crypto'
import products from '../products.json' with {type: "json"}

export class ProductModel {
  static async getAll() {
    return products
  }

  static async create({input}){
    const newProduct = {
        id: randomUUID(),
        ...input
    }

    products.push(newProduct)

    return newProduct
  }

  static async update({id, input}){
    const productIndex = products.findIndex((prod) => prod.id == id)

    if( productIndex === -1) return false

    products[productIndex] = {
        ...products[productIndex],
        ...input
    }

    return products[productIndex]
  }

  static async delete({id}){
    const productIndex = products.findIndex((prod) => prod.id == id)

    if( productIndex === -1) return false

    products.splice(productIndex, 1)
    return true

  }
}
