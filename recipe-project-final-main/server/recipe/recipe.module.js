const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    product: {
        type: [],
        required: true
    },
    directions: {
        type: [],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [],
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,// מונע שינוי של התאריך בעקבות עכדון למשל
        default: () => Date.now()
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

const recipeModule = mongoose.model('recipe', recipeSchema);

module.exports = recipeModule;