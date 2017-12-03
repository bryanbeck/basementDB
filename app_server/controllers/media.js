/*GET 'Home' page*/
module.exports.home = function(req,res){
	res.render('media-home', {
		title: 'BasementDB - Store & Catalog your collection',
		pageHeader: {
			title: 'BasementDB',
			strapline: 'Store & catalog your collection. View it easily with online access!'
		},
		sidebar:"Are you tired of forgetting what you have in your collection?  Would you like a reliable & easy to use web-app to keep track of all the items in your collection?  Look no further, basementDB is the solution to your needs.  Track your whole collection & easily view it here!",
		navigations: [{
			hyperlink: '/media',
			title: 'Click to view media collection by type',
			description:'View all media by type',
			types:['Music(CD/DVD/Vinyl)','Books','Video Games'],
			subheading: 'View Collection'
		},
		{
			hyperlink: '/media/show',
			title: 'Click to display all items in collection',
			description:'A list view of all items',
			types:'',
			subheading: 'View All!'
		},
		{
			hyperlink: '/media/add',
			title: 'Click to add new media',
			description:'Add new media to the collection',
			types:'+',
			subheading: 'Add new!'
		},
		{
			hyperlink: '/media/search',
			title: 'Search the database',
			description:'Search for media within collection',
			types:['Seach By:','Type','Year'],
			subheading: 'Criteria Based Search'
		}]
	});
};

/*GET 'Collections' page*/
module.exports.collections = function(req,res){
	res.render('media-collection', {
		title: 'Collections',
		pageHeader: {title: 'Collection'},
		sidebar: {
			context: 'Select collection to the left and view output below',
			callToAction: 'Displays information on the types of media stored'
		},
		textadd: "Various Media types listed below",
		collections: {
			type: 'Media Type',
			mediaTypes: {
				publication: 'Publications (Books/Comics)',
				music: 'Music (CD/Vinyl)',
				interactive: 'Interactive Media (Video Games/Interactive PC titles'
			},
			item: 'Popular Items',
			popularItems: {
				comics: 'Marvel Comics',
				music: 'Jazz Music',
				superhero: 'Superman'
			},
			add: 'Last Added',
			lastAdded: "https://assets.materialup.com/uploads/6c76e13b-48ed-4296-b458-e47c5f40760f/preview",
			newAdd: 'add media',
			recent: 'Most Recently Added',
			mostRecents: [{
				author: 'Stan Lee & Jack Kirby',
				issue: 'Avengers 1',
				added: '12/2/2017',
				notes: 'First appearance of Black Widow'
			},{
				author: 'Bob Kane & Bill Finger',
				issue: 'Detective 27',
				added: '12/2/2017',
				notes: 'First appearance of Batman'
		}]
		}

		});
};

/*GET 'addMedia' page*/
module.exports.addMedia = function(req,res){
	res.render('media-add',{
	 title: 'Add Media',
	 pageHeader: {title: 'Add new Media'}
	 });
};

/*GET 'showMedia' page*/
module.exports.showMedia = function(req,res){
	res.render('media-show', {
		title: 'Show Media',
		pageHeader:{
			title: 'BasementDB',
			strapline: 'Display all media of any type in database'
		},
		sidebar:'items currently in all collections',
		items: [{
			title: 'Back to the future trilogy',
			artist: "Christopher Lloyd & Michael J Fox",
			dataBlurbs: ['Universal','Adventure/Sci-Fi','1985-1990']
		},
		{
			title: 'Cosmic Trane',
			artist: "Johnny Coltrane",
			dataBlurbs:[ 'Blue Note','Jazz','1970']

		}] 
	});
};

/*GET 'searchMedia' page*/
module.exports.searchMedia = function(req,res){
	res.render('media-search', {
		title: 'Search Media',
		pageHeader: {title: 'Search All Media'}
	});
};