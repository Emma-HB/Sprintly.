const { Schema, model } = require("mongoose");

const PrioSessionSchema = new Schema(
  {
    user_id : {
      type: Schema.Types.ObjectId, 
      ref: "User"
    },
    selectedStoryCard: [{
      type: Schema.Types.ObjectId, 
      ref: "StoryCard"
    }],
    prioStoryCard: [{
      participant_email: {
        type: String, 
        lowercase: true,
        trim: true,
        required: true,
      },
      participant_name: {
        type: String
      }, 
      participant_prio : [String]
    }],
  },
  {
    // extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const PrioSession = model("PrioSession", PrioSessionSchema);

module.exports = PrioSession;