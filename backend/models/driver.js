const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Mongoose Schema for Driver.
 * @class Driver
 * @property {String} driver_id - Unique identifier for the driver.
 * @property {String} driver_name - The name of the driver, must be between 3 and 20 characters.
 * @property {String} driver_department - Department of the driver, can only be 'food', 'furniture', or 'electronic'.
 * @property {String} driver_licence - Driver's licence number, exactly 5 alphanumeric characters.
 * @property {Boolean} driver_isActive - Indicates if the driver is currently active, defaults to true.
 * @property {Date} driver_createdAt - The date when the driver was created, defaults to the current date.
 * @property {Array<ObjectId>} assigned_packages - Array of package IDs assigned to the driver, references the Package model.
 */
const driverSchema = new Schema({
    /**
 * Driver Schema definition for MongoDB.
 * This schema defines the structure for storing driver-related data.
 * @global
 * @const {Schema} driverSchema
 */
    driver_id: {
        type: String,
        required: true,
        unique: true,

    },
    
    driver_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        match: /^[a-zA-Z0-9]/,
    },
    driver_department: {
        type: String,
        required: true,
        enum: ['food', 'furniture', 'electronic','Food', 'Furniture', 'Electronic'],
    },
    driver_licence: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]{5}$/,
    },
    driver_isActive: {
        type: Boolean,
        default: true
    },
    driver_createdAt: {
        type: Date,
        default: Date.now
    },
    assigned_packages: [{
        type: Schema.Types.ObjectId,
        ref: 'Package'
    }]
});

module.exports = mongoose.model('Driver', driverSchema);
