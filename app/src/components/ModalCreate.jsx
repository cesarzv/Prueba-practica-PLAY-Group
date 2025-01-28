import { useState } from 'react'
import axios from 'axios'

const ModalCreate = ({
  showModal,
  closeModal,
  refresh,
  origin,
  productData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/products', {
        name: formData.name,
        description: formData.description,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1280px-Placeholder_view_vector.svg.png',
      })

      if (response.status === 201) {
        console.log(response.data)
        refresh()
        closeModal()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    try {
      const input = {}
      if (formData.name) input.name = formData.name
      if (formData.description) input.description = formData.description

      const response = await axios.put(
        `http://localhost:4000/products/${productData.id}`,
        input
      )

      console.log(response)
      refresh()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='modal-overlayCreate' onClick={closeModal}>
      <div
        className={`modal relative bg-white rounded-[1rem] w-[90%] lg:w-[35%] py-20 px-10 ${
          showModal
            ? 'modal-container-enter-active'
            : 'modal-container-leave-active'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='modal-close bg-gray-800 w-[2.6rem] h-[2.6rem] rounded-[0.5rem] absolute top-[1rem] right-[1rem] flex items-center justify-center text-white font-funnel font-semibold text-[1.7rem] cursor-pointer'
          onClick={closeModal}
        >
          X
        </div>
        <h4 className='text-left text-2xl font-semibold'>
          {origin === 'create'
            ? 'Crear producto'
            : `Editar producto: ${productData.name}`}
        </h4>

        <form
          onSubmit={origin === 'create' ? handleSubmitCreate : handleSubmitEdit}
          className='flex flex-col gap-3 mt-6'
        >
          <div className='flex flex-col items-start gap-1'>
            <label htmlFor='name' className='font-medium'>
              Nombre
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full border rounded p-2 focus:outline-none'
              placeholder='Ingresar un nombre'
            />
          </div>

          <div className='flex flex-col items-start gap-1'>
            <label htmlFor='description' className='font-medium'>
              Descripción
            </label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full border rounded p-2 focus:outline-none'
              placeholder='Ingresar una descripción'
              rows='3'
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4'
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalCreate
