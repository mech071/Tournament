import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import Vote from "./models/vote.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../.env") })

const app = express()
const port = 3000
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!")
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err))

app.post("/vote", async (req, res) => {
  try {
    const picks = req.body

    const vote = new Vote({ picks })

    await vote.save()

    res.json({ message: "Vote saved", vote })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

app.get("/results", async (req, res) => {
  const votes = await Vote.find()

  const results = {}

  votes.forEach(vote => {
    const picks = vote.picks

    Object.entries(picks).forEach(([group, artists]) => {

      if (!results[group]) {
        results[group] = {}
      }

      artists.forEach(artist => {
        results[group][artist] = (results[group][artist] || 0) + 1
      })

    })
  })

  res.json(results)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})