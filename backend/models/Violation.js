const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const violationsSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        maxlength: 25
    },
    middleName: {
        type: String,
        trim: true,
        maxlength: 25
    },
    familyName: {
        type: String,
        trim: true,
        maxlength: 25
    },
    EGN: {
        type: String,
        trim: true,
        maxlength: 25
    },
    LKN: {
        type: String,
        trim: true,
        maxlength: 25
    },
    permanentAddress: {
        type: String,
        required: true,
        maxlength: 50
    },
    country: {
        type: String,
        required: true,
        maxlength: 20
    },
    registrationNumber: {
        type: Number,
        required: true,
        maxlength: 15
    },
    registeredAt: {
        type: String,
        required: true,
        maxlength: 25
    },
    beingDescription: {
        type: String,
        required: true,
        maxlength: 50
    },
    model: {
        type: String,
        required: true,
        maxlength: 20
    },
    brand: {
        type: String,
        required: true,
        maxlength: 20
    },
    maximumAllowedMass: {
        type: Number,
        required: true,
        maxlength: 1000
    },
    numberVignette: {
        type: Number,
        required: true,
        maxlength: 15
    },
    typeOfVignette: {
        type: String,
        required: true,
        maxlength: 15
    },
    category: {
        type: String,
        required: true,
        maxlength: 15
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
        maxlength: 25
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'users',
        required: true
    },
    labelDescriptionA: {type: String, required: false, maxlength: 50},
    labelDescriptionB: {type: String, required: false, maxlength: 50},
    labelDescriptionC: {type: String, required: false, maxlength: 50},
    labelDescriptionD: {type: String, required: false, maxlength: 50},
    labelDescriptionE: {type: String, required: false, maxlength: 50},
    labelDescriptionF: {type: String, required: false, maxlength: 50},
    labelDescriptionG: {type: String, required: false, maxlength: 50},
    labelDescriptionH: {type: String, required: false, maxlength: 50},

},
{timestamps: true}
);

violationsSchema.index({ user: 1, name: 1 }, { unique: true })
const Violation = mongoose.model('violation', violationsSchema);
module.exports = Violation;
