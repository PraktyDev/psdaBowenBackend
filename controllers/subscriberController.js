import { prisma } from "../utils/dbConfig.js"


//ADD SUBSCRIBER
export const emailSubscribers = async (req, res) =>{
    try {
        const { email } = req.body
        const subscriber = await prisma.subscribers.create({
            data: {
                email: email
            }
        })
        return res.status(201).json({ message: "Subscribed to newsletter successfully", subscriber })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET ALL SUBSCRIBERS
export const allSubscribers = async (req, res) =>{
    try {
        const subscribers = await prisma.subscribers.findMany()
        if(subscribers.length === 0){
            return res.status(404).json({ message: "No subscribers found" })
        }
        return res.status(201).json({ message: "Successfully fetched newsletter subscribers", subscribers })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//DELETE SUBSCRIBER
export const deleteSubscribers = async (req, res) =>{
    try {
        const { id } = req.params
        const newId = parseInt(id)
        const subscriber = await prisma.subscribers.delete({
            where: {
                id: newId
            }
        })
        if(!subscriber){
            return res.status(404).json({ message: "Subscriber not found" })
        }
        return res.status(201).json({ message: "Subscriber deleted" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}