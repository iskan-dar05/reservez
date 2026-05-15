const mongoose = require("mongoose")




const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

tokenSchema.index({createdAt: 1}, {expireAfterSeconds: 86400})

module.exports = mongoose.model("Token", tokenSchema)










