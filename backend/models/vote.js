import mongoose from "mongoose"

const voteSchema = new mongoose.Schema({
  picks: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model("Vote", voteSchema)