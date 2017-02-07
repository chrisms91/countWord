function matching(user){
	chrome.tabs.executeScript({
		code:'document.querySelector("body").innerText'
	}, function(result){
		// call this function after the js code is executed and store it in result

		// save all the contents into bodyText variable
		var bodyText = result[0];

		// extract all the words in bodyText, count the number and store it in bodyNum
		var bodyNum = bodyText.split(' ').length;

		// check how many of the words that I know are appeared in web page and store it in myNum
		var myNum = bodyText.match(new RegExp('\\b('+user+')\\b', 'gi')).length;

		// display third decimal point
		var percent = myNum / bodyNum * 100;
		percent = percent.toFixed(3);

		// find the tag with id="result" and add result on it
		document.querySelector('#result').innerText = myNum + '/' + bodyNum + '(' + (percent) + '%)';
	});
}


// get the data from chrome storage
chrome.storage.sync.get(function(data){
	// put #user value 
	document.querySelector('#user').value = data.userWords;

	// calculate the result
	matching(data.userWords);

});


// when #user value is changed, re-calculate the number of words
document.querySelector('#user').addEventListener('change', function(){
	var user = document.querySelector('#user').value;

	// store input value in chrome storage
	chrome.storage.sync.set({
		userWords:user
	});

	// Read all text from contents page
	// javascript needs to be executed for the contents page(web page)
	matching(user);
});


