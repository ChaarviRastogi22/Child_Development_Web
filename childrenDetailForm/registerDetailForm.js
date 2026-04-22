const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  // STEP 1
  age: { type: String, required: true },
  gender: { type: String, required: true },

  // STEP 2
  relation: { type: String, required: true },
  relation_other: String,

  mothers_employment: { type: String, required: true },
  mothers_employment_other: String,

  fathers_employment: { type: String, required: true },
  fathers_employment_other: String,

  income: { type: String, required: true },

  primary_caregiver: { type: String, required: true },
  primary_caregiver_other: String,

  absent_parent_caretaker: {
    type: [String],
    required: true
  },
  absent_parent_caretaker_other: String,

  // STEP 3
  quality_time: { type: String, required: true },

  daily_activities: {
    type: [String],
    required: true
  },
  daily_activities_other: String,

  // STEP 4
  screen_devices: {
    type: [String],
    required: true
  },
  screen_devices_other: String,

  daily_screen_time: { type: String, required: true },

  screen_time_period: {
    type: [String],
    required: true
  },

  content_type: {
    type: [String],
    required: true
  },
  content_type_other: String,

  screen_time_limit: { type: String, required: true },
  prefer_screen: { type: String, required: true },

  // STEP 5
  behavioral_change: { type: String, required: true },

  behavioral_changes: {
    type: [String],
    required: true
  },
  behavioral_changes_other: String,

  limiting_screen_time: { type: String, required: true },
  difficulties_faced: String,

  allowing_screen_time: { type: String, required: true },

  // STEP 6
  screen_habits: { type: String, required: true },

  support_type: {
    type: [String],
    required: true
  },

  screen_habits_concerns: { type: String, required: true },

  screen_time_rules: [String],

  calm: { type: String, required: true },
  stress: { type: String, required: true },

  // STEP 7
  non_screen_activities: {
    type: [String],
    required: true
  },

  screen_time_reason: {
    type: [String],
    required: true
  },
  screen_time_reason_other: String,

  support_app: { type: String, required: true },
  confidence_app: { type: String, required: true },
  app_guided_activities: { type: String, required: true },
  useful: { type: String, required: true },
  comfort_app: { type: String, required: true },

  final_concerns: { type: String, required: true },

  likely_usage: { type: String, required: true },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ChildData", childSchema);