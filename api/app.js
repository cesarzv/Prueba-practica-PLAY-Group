import express, { json } from 'express'
import cors from 'cors'
import { productsRouter } from './routes/productsRouter.js'

const PORT = 4000

const app = express()
app.use(json())
app.use(cors())

app.disable('x-powered-by')

app.use('/products', productsRouter)

app.use((req, res) => {
  res.status(404).send('404 Not found')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
