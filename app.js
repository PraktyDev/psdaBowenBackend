import express from "express"
import dotenv from "dotenv"
import router from "./routes/index.js"

const app = express()
dotenv.config()


app.use(express.json())
app.use('/api/v1', router)



const port = process.env.PORT || 5000



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})