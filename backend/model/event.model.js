import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "",
    },
    capacity: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
