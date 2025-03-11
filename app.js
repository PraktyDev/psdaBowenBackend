import express from "express"
import dotenv from "dotenv"
import router from "./routes/index.js"

const app = express()
dotenv.config()


app.use(express.json())
app.use('/api/v1', router)



const port = process.env.PORT || 5000

async function connectToDB() {
    try {
        await prisma.$disconnect()
    } catch (error) {
        console.error(error.message)
        await prisma.$disconnect()
        process.exit(1)
    }
}


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

connectToDB()