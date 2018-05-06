var mongoose = require( 'mongoose' );

var mediaSchema = new mongoose.Schema({
	ISBN: String
},
{
	strict: false
});

mongoose.model('Media', mediaSchema, 'medias');
