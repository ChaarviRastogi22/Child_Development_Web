const mongoose = require("mongoose");

const childDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // STEP 1
  age: String,
  gender: String,

  // STEP 2
  relation: String,
  relation_other: String,
  mothers_employment: String,
  mothers_employment_other: String,
  fathers_employment: String,
  fathers_employment_other: String,
  income: String,
  primary_caregiver: String,
  primary_caregiver_other: String,
  absent_parent_caretaker: [String],
  absent_parent_caretaker_other: String,

  // STEP 3
  quality_time: String,
  daily_activities: [String],
  daily_activities_other: String,

  // STEP 4
  screen_devices: [String],
  screen_devices_other: String,
  daily_screen_time: String,
  screen_time_period: [String],
  content_type: [String],
  content_type_other: String,
  screen_time_limit: String,
  prefer_screen: String,

  // STEP 5
  behavioral_change: String,
  behavioral_changes: [String],
  behavioral_changes_other: String,
  limiting_screen_time: String,
  difficulties_faced: String,
  allowing_screen_time: String,

  // STEP 6
  screen_habits: String,
  support_type: [String],
  screen_habits_concerns: String,
  screen_time_rules: [String],
  calm: String,
  stress: String,

  // STEP 7
  non_screen_activities: [String],
  screen_time_reason: [String],
  screen_time_reason_other: String,
  support_app: String,
  confidence_app: String,
  app_guided_activities: String,
  useful: String,
  comfort_app: String,
  final_concerns: String,
  likely_usage: String

}, { timestamps: true });

module.exports = mongoose.model("ChildDetails", childDetailsSchema);