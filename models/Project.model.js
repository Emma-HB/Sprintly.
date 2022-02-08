const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    user_id : {
        type: Schema.Types.ObjectId, 
        ref: "User"},
    title : {
        type: String, 
        required: true, 
        default : 'My new project'
    },
    description: String
  },
  {
    // extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;
