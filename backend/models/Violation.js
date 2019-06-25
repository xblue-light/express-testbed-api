const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const violationsSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 15
    },
    country: {
        type: String,
        required: true,
        maxlength: 15
    },
    registrationNumber: {
        type: Number,
        required: true,
        maxlength: 15
    },
    category: {
        type: String,
        required: true,
        maxlength: 10
    },
    violationOwner: {
        type: String,
        required: true,
        maxlength: 20
    },
    typeOfDocument: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    issuedBy:{
        type: String,
        required: true,
        maxlength: 15
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    }
},
{timestamps: true}
);

violationsSchema.index({ user: 1, name: 1 }, { unique: true })
const Violation = mongoose.model('violation', violationsSchema);
module.exports = Violation;