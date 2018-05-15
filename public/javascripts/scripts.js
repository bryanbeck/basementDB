function storeJSON(isbn) {
    jQuery(document).ready(function($){
    var isbn, url, jsonFile;
    isbn = document.getElementById('ISBN').value; // "9781451648546", 9781617292033; // Steve Jobs book 
    url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
    $.getJSON(url, writedatatoJSON);
        function writedatatoJSON(data){
            $.each(data.items, function (i, item) {
                jsonFile ={
                    image: item.volumeInfo.imageLinks.thumbnail,
                    author: item.volumeInfo.authors,
                    publishdate: item.volumeInfo.publishedDate,
                    title: item.volumeInfo.title,
                    description: item.volumeInfo.description,
                    textSnippet: item.searchInfo.textSnippet,
                    accessInfo: item.accessInfo.webReaderLink
                    }
                    
                    jsonFile.image = item.volumeInfo.imageLinks.thumbnail;
                    jsonFile.author = item.volumeInfo.authors;
                    jsonFile.publishdate = item.volumeInfo.publishedDate;
                    jsonFile.description = item.volumeInfo.description;
                    jsonFile.textSnippet = item.searchInfo.textSnippet;
                    
                    window.alert(jsonFile.description);
                console.log(jsonFile.accessInfo, jsonFile.image, jsonFile.author, jsonFile.publishdate, jsonFile.title, jsonFile.description, jsonFile.textSnippet);
                return jsonFile;
                })
            };
        })
}

function getInput

function getBookDetails(isbn) {
$(document).ready(function () {
  var isbn = document.getElementById('ISBN').value; // "9781451648546", 9781617292033; // Steve Jobs book 
  var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
  $.getJSON(url, displayBooks);
    // We've got the JSON data. Now let's do something with it
    function displayBooks(data) {
        // Start off by defining a variable called htmlString
        var htmlString = "<div>";
        // For each of the JSON API results... 
        $.each(data.items, function (i, item) {
            // Add some HTML with CSS
            htmlString += '<div class="col-xs-3">';
            // Build up the HTML using the data from the API
            htmlString += '<img id = img src="' + item.volumeInfo.imageLinks.thumbnail + '" alt="' + item.id + '" title="' + item.id + '", class ="img-thumbnail img-responsive"/><br/>';
            htmlString += '<strong class="small" id = pubDate>Pub: ' + item.volumeInfo.publishedDate + '</strong></div>';
            htmlString += '<div class="col-xs-9"><h1 id=bookname>' + item.volumeInfo.title + '</h1>';
            $.each(item.volumeInfo.authors, function (i, author) {
                htmlString += '<p  class="bg-info"><i id=author>' + author + '</i></p>';
            });
            htmlString += '<p id=desc class="small">' + item.volumeInfo.description + '</p>';
            htmlString += '<p id=p3 class="well small">Extract: "' + item.searchInfo.textSnippet + '"<a href="' + item.accessInfo.webReaderLink + '" target="_blank"> Read more</a></p>';
            htmlString += '</div>';
            
        });
        // And then wherever there's a div with an ID of 'book' in the HTML, replace it with our htmlString. See over on the right for the results!     
        $('#book').html(htmlString + "</div>");
    }

});

}