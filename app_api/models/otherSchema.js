var otherSchema = new mongoose.Schema({
	any: {}
})

mongoose.model('database', dbschema, 'db');