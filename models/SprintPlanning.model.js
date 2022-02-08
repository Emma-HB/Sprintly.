const { Schema, model } = require("mongoose");

const SprintPlanningSchema = new Schema(
  {
    user_id : {
        type: Schema.Types.ObjectId, 
        ref: "User"},
    title : {
        type: String, 
        required: true, 
        default: 'New Sprint',
    }, 
    velocity: {
        type: Number, 
        required: true,
    }, 
    selectedStoryCard: [{
      type: Schema.Types.ObjectId, 
      ref: "StoryCard"
    }], 
    sprintStoryCard: [{
      type: String
    }]
  },
  {
    // extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const SprintPlanning = model("SprintPlanning", SprintPlanningSchema);

module.exports = SprintPlanning;
