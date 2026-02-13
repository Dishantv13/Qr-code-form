import dotenv from 'dotenv'
import connectToDB from './config/db.js'
import express from 'express'
import cors from 'cors'

dotenv.config({
    path: '.env'
})

const app = express()
app.use(cors())


connectToDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server started at http://localhost:${process.env.PORT || 8000}`);
    })
})
.catch((error) => console.log("MONGODB connection failed!!!: ", error))

import userRoutes from './routes/register.route.js'
import qrRoutes from './routes/event.routes.js'
import adminRoutes from './routes/admin.route.js'

app.use(express.json())
app.use('/api/register', userRoutes)
app.use('/api/event', qrRoutes)
app.use('/api/admin', adminRoutes)