const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, `Please add a text value`]
    }
}, {
    timestamps: true, // This line will add to the schema the createdAt and updatedAt fields automatically
})

module.exports = mongoose.model("Goal", goalSchema)