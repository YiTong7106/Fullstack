const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Mongoose Schema for Package.
 * @class Package
 * @property {String} package_id - Unique identifier for the package.
 * @property {String} package_title - The title of the package, must be between 3 and 15 alphanumeric characters.
 * @property {Number} package_weight - The weight of the package, must be a positive number.
 * @property {String} package_destination - The destination of the package, must be between 5 and 15 alphanumeric characters.
 * @property {String} description - A brief description of the package, with a maximum length of 30 characters.
 * @property {Date} createdAt - The date the package was created, defaults to the current date.
 * @property {Boolean} isAllocated - Whether the package has been allocated, defaults to false.
 * @property {ObjectId} driver_id - Reference to the driver assigned to the package.
 */
const packageSchema = new Schema({
    /**
 * Package Schema definition for MongoDB.
 * This schema defines the structure for storing package-related data.
 * @global
 * @const {Schema} packageSchema
 */
    package_id: {
        type: String,
        required: true,
        unique: true,
    },
    package_title: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]{3,15}$/,
    },
    package_weight: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Weight must be a positive non-zero number.'
        }
    },
    package_destination: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]{5,15}$/
    },
    package_description: {
        type: String,
        maxlength: 30
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAllocated: {
        type: Boolean,
        default: false
    },
    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Driver',
        required: true,
    }
});



module.exports = mongoose.model('Package', packageSchema);
