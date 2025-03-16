import { prisma } from "../utils/dbConfig.js"
import { uploadImage } from "../utils/uploadImg.js"


//POST NEW EVENT
export const postEvent = async (req, res) =>{
    try {
        const { body, file } = req
        const { name, time, location } = body
    
        // Upload image to Cloudinary
        const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;

        const { secure_url } = await uploadImage(dataUri)
        const event = await prisma.events.create({
            data: {
                name,
                time,
                location,
                image: secure_url
            }
        })
        return res.status(201).json({ message: "Event created successfully", event })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



//GET ALL EVENTS
export const getAllEvents = async (req, res) =>{
    try {
        const events = await prisma.events.findMany()
        if(events.length === 0){
            return res.status(404).json({ message: "No events found" })
        }
        return res.status(200).json({ message: "All events fetched successfully", events })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



//GET SINGLE EVENT
export const getSingleEvent = async (req, res) =>{
    try {
        const { id } = req.params
        const event = await prisma.events.findUnique({
            where: {
                id: parseInt(id),
            }
        })
        if(!event){
            return res.status(404).json({ message: "Event not found" })
        }
        return res.status(200).json({ message: "Event fetched successfully", event })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



//UPDATE EVENT
export const editEvent = async (req, res) =>{
    try {
        const { id } = req.params
        const newId = parseInt(id)
        
        const { body, file } = req
    
        const { name, time, location } = body
    
        // Upload image to Cloudinary
        const dataUri = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;

        const { secure_url } = await uploadImage(dataUri)

        const event = await prisma.events.update({
            where: {
                id: newId
            },
            data: {
                name,
                time,
                location,
                image: secure_url
            },
        })
        if(!event){
            return res.status(404).json({ message: "Event not found" })
        }
        return res.status(200).json({ message: "Event updated successfully", event })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



//DELETE EVENT
export const deleteEvent = async (req, res) =>{
    try {
        const { id } = req.params
        const newId = parseInt(id)
        const event = await prisma.events.delete({
            where: {
                id: newId
            }
        })
        if(!event){
            return res.status(404).json({ message: "Event not found" })
        }
        return res.status(201).json({ message: "Event deleted" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}