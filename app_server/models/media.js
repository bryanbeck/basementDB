var mongoose = require( 'mongoose' );

// var pageDescriptionSchema = new mongoose.Schema({
// 	hyperlink: String,
// 	title: String, 
// 	description: String,
// 	types: [String],
// 	subheading: String
// });

var mediaSchema = new mongoose.Schema({
	mediaType: String,
	artist: String,
	title: String,
	publisher: String,
	dateAdded: String,
	notes: String
});

// mongoose.model('media', pageDescriptionSchema);
mongoose.model('media', mediaSchema);