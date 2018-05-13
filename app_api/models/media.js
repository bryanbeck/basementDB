var mongoose = require( 'mongoose' );

var mediaSchema = new mongoose.Schema({
        isbn: String
});

mongoose.model('Media', mediaSchema, 'medias');
