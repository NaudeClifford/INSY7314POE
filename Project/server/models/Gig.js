const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
    {
        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        deliveryDays: {
            type: Number,
            required: true,
            min: 1
        },

        location: {
            address: {
                type: String,
                required: true,
                trim: true
            },

            placeId: {
                type: String,
                required: true,
                trim: true
            },

            latitude: {
                type: Number,
                required: true
            },

            longitude: {
                type: Number,
                required: true
            }
        },

        isActive: {
            type: Boolean,
            default: true
        },

        status: {
            type: String,
            enum: ["active", "paused", "deleted"],
            default: "active"
        },

        views: {
            type: Number,
            default: 0
        },

        averageRating: {
            type: Number,
            default: 0
        },

        reviewCount: {
            type: Number,
            default: 0
        },

        imageUrl: {
            type: String,
            default: ""
        },
        weather: {
            temperature: Number,
            description: String,
            icon: String
        },
        
        createdAt: {
            type: Date,
            default: Date.now
        },

        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

gigSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model("Gig", gigSchema);