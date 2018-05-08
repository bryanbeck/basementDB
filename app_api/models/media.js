var mongoose = require( 'mongoose' );

var mediaSchema = new mongoose.Schema({
	    image: {type:String, required:false},
        author: {type:String, required:false},
        publishdate: {type:String, required:false},
        title: {type:String, required:false},
        description: {type:String, required:false},
        textSnippet: {type:String, required:false},
        accessInfo: {type:String, required:false} 
},{
	strict: false
})

mongoose.model('Media', mediaSchema, 'medias');
