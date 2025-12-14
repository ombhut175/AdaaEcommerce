const mongoose = require('mongoose');

const userBehaviorSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rejected_cod_count: {
            type: Number,
            default: 0,
        },
        cod_returns_count: {
            type: Number,
            default: 0,
        },
        successful_prepaid_count: {
            type: Number,
            default: 0,
        },
        cod_restricted: {
            type: Boolean,
            default: false,
        },
        restriction_reason: {
            type: String,
            default: '',
            trim: true,
        },
        last_updated: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('UserBehavior', userBehaviorSchema);
