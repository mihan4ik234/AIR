import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    moneyGoal: {
      type: String,
      required: true,
    },
    timeGoal: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    imageUrl: String,
    videoUrl: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Project', ProjectSchema);
