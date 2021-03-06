const { Schema, model } = require("mongoose");

const storyCardSchema = new Schema(
  {
    project_id : {
        type: Schema.Types.ObjectId, 
        ref: "Project"
    },
    external_id: String, 
    epic: String, 
    summary : {
        type: String, 
        required: true
    }, 
    description: String,
    status: String, 
    priority: {
        type: String,
        enum: ['Highest', 'High', 'Medium', 'Low', 'Lowest'], 
        default: "Medium"
    }, 
    estimation: Number, 
    sprint_label: {
        type: String, 
        default: "Backlog"
    }
  },
  {
    // extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const StoryCard = model("StoryCard", storyCardSchema);

module.exports = StoryCard;
