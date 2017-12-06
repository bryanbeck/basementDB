var mongoose = require( 'mongoose' );

var mediaSchema = new mongoose.Schema({
	mediaType: String,
	artist: String,
	title: String,
	publisher: String,
	dateAdded: String,
	genre: String,
	year: Number,
	notes: String
});

mongoose.model('Media', mediaSchema, 'medias');