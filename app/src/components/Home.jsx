import axios from 'axios'
import { useEffect, useState } from 'react'
import ModalCreate from './ModalCreate'

const Home = () => {
  const [products, setProducts] = useState()
  const [showModal, setShowModal] = useState(false)
  const [origin, setOrigin] = useState('')
  const [productData, setProductData] = useState('')

  const closeModal = () => {
    setShowModal(false)
  }

  const getProducts = async () => {
    const result = await axios.get('http://localhost:4000/products')
    setProducts(result.data)
  }

  const handleCreate = () => {
    setOrigin('create')
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    console.log(id)

    try {
      const response = await axios.delete(
        `http://localhost:4000/products/${id}`
      )

      console.log(response)
      if (response.status === 200) {
        getProducts()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (prod) => {
    setOrigin('edit')
    setShowModal(true)
    setProductData(prod)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className='mt-10 flex items-center justify-end'>
        <button
          onClick={handleCreate}
          className='bg-gray-500 rounded-md text-white font-semibold px-4 py-2 cursor-pointer hover:bg-gray-800 transition-all'
        >
          Crear producto
        </button>
      </div>
      {products?.length > 0 ? (
        <div className='mt-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {products?.map((prod) => (
            <div key={prod.id} className='border rounded-md'>
              <div>
                <img className='rounded-t-md' src={prod.image} alt='' />
              </div>
              <div className='p-4 flex flex-col items-start gap-1'>
                <p className='text-left'>
                  <span className='font-semibold'>Producto:</span> {prod.name}{' '}
                </p>

                <p className='text-left'>
                  {' '}
                  <span className='font-semibold'>Descripcion:</span>{' '}
                  {prod.description}{' '}
                </p>
              </div>
              <div className='p-4 flex items-center justify-end gap-3'>
                <button
                  className='text-sm cursor-pointer'
                  onClick={() => handleEdit(prod)}
                >
                  Editar ✎
                </button>
                <button
                  className='text-sm cursor-pointer'
                  onClick={() => handleDelete(prod.id)}
                >
                  Eliminar ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='mt-12'>No hay productos disponibles, crea uno!</p>
      )}

      {showModal && (
        <ModalCreate
          showModal={showModal}
          closeModal={closeModal}
          refresh={getProducts}
          origin={origin}
          productData={productData}
        />
      )}
    </>
  )
}

export default Home
