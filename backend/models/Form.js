const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({

    // STEP 1: CHILD
    child: {
        age: String,
        gender: String
    },

    // STEP 2: FAMILY
    family: {
        relation: String,
        relation_other: String,

        mother_employment: String,
        mother_other: String,

        father_employment: String,
        father_other: String,

        income: String,
        primary_caregiver: String,
        caregiver_other: String,

        absence_caregiver: [String],
        absence_other: String
    },

    // STEP 3: INTERACTION
    interaction: {
        quality_time: String,
        activities: [String]
    },

    // STEP 4: SCREEN HABITS
    screen: {
        devices: [String],
        devices_other: String,

        daily_time: String,
        time_period: [String],
        content_type: [String],

        upset_on_limit: String,
        prefers_screen: String
    },

    // STEP 5: BEHAVIOR
    behavior: {
        noticed_changes: String,
        issues: [String],

        limited_screen: String,
        limiting_difficulty: String,

        allowed_when_busy: String
    },

    // STEP 6: SUPPORT
    support: {
        wants_guidance: String,
        support_type: [String],

        concerns: String,

        strategies_used: [String],
        calm_usage: String,
        stress_level: Number
    },

    // STEP 7: FINAL
    final: {
        non_screen_activities: [String],
        reason_for_screen: [String],

        will_use_app: String,
        confidence: String,
        time_for_activities: String,

        usefulness: String,
        comfort: String,
        concerns_repeat: String,

        likelihood: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Form", FormSchema);