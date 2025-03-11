import prisma from "../utils/dbConfig.js"

//POST NEW NEWS
export const postNews = async (req, res) =>{
    try {
        const { body } = req
        const { title, description, image } = body
        const news = await prisma.news.create({
            data: {
                title,
                description,
                image,
            }
        })
        return res.status(201).json({ message: "News created successfully", news })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
//GET ALL NEWS
export const getAllNews = async (req, res) =>{
    try {
        const news = await prisma.news.findMany()
        if(news.length === 0){
            return res.status(404).json({ message: "No news found" })
        }
        return res.status(200).json({ message: "All news fetched successfully", news })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
//GET SINGLE NEWS
export const getSingleNews = async (req, res) =>{
    try {
        const { id } = req.params
        const news = await prisma.news.findUnique({
            where: {
                id: parseInt(id),
            }
        })
        if(!news){
            return res.status(404).json({ message: "news not found" })
        }
        return res.status(200).json({ message: "news fetched successfully", news })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
//UPDATE NEWS
export const editNews = async (req, res) =>{
    try {
        const { id } = req.params
        const newId = parseInt(id)
        const { title, description, image } = req.body
        const news = await prisma.news.update({
            where: {
                id: newId
            },
            data: {
                title,
                description,
                image,
            },
        })
        if(!news){
            return res.status(404).json({ message: "News not found" })
        }
        return res.status(200).json({ message: "News updated successfully", news })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
//DELETE NEWS
export const deleteNews = async (req, res) =>{
    try {
        const { id } = req.params
        const newId = parseInt(id)
        const news = await prisma.news.delete({
            where: {
                id: newId
            }
        })
        if(!news){
            return res.status(404).json({ message: "news not found" })
        }
        return res.status(201).json({ message: "news deleted" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}