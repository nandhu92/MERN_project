const mongoose = require('mongoose');

// const violationDataSchema = new mongoose.Schema({
//     stopDate: {type: String},
//     subAgency: {type: String},
//     description: {type: String},
//     location: {type: String},
//     accident: {type: String},
//     belts: {type: String},
//     fatal: {type: String},
//     commercial_vehicle: {type: String},
//     alcohol: {type: String},
//     state: {type: String},
//     vehicleType: {type: String},
//     year: {type: String},
//     make: {type: String},
//     charge: {type: String},
//     violationType:{type: String},
//     gender: {type: String},
//     arrest_type: {type: String},
//     geolocation: {type: String}
// },{collection:'trafficviolations'});

const violationDataSchema = new mongoose.Schema({},{collection:'violations'});

violationDataSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const violationData = mongoose.model('violationData', violationDataSchema);

module.exports = violationData;