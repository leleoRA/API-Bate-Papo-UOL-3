import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dayjs from "dayjs"
import { MongoClient } from "mongodb"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/participants", async (req, res) =>{
    const participant = { name: req.body.name, lastStatus : Date.now()};
    const mongoClient = new MongoClient(process.env.MONGO_URI)
    const connection = await mongoClient.connect()

    try{ 
        const dbBatePapoUOL = connection.db("bate-papo-uol")
        const participantsCollection = dbBatePapoUOL.collection("participants")
        await participantsCollection.insertOne(participant)
        res.sendStatus(201)
        connection.close()
    }
    catch{
        res.sendStatus(500)
        connection.close()
    }

})


app.listen(4000, () => {
    console.log("Rodando em http://localhost:4000")
})