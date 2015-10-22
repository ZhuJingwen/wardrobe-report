var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var wardrobeSchema = new Schema({
	name: {type: String, required: false},
	// name: {type: String, required: true}, // this version requires this field to exist
	// name: {type: String, unique: true}, // this version requires this field to be unique in the db
	category: String,
	brand: String,
	pattern: String,
	color: [String],
	material: [String],
	style: [String],
	purchaseTime: {
		season: String,
		year: Number
	},
	location: String,
	url: {type: String, required: false},
	dateAdded : { type: Date, default: Date.now },
})

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Wardrobe',wardrobeSchema);