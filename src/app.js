var fb = new Firebase("https://gochat-ac889.firebaseio.com/");
var messages = fb.child("messages");
var btn = $('button');
var wrap = $('.wrapper');
var input = $('input.message');
var usernameInput = $('input.username');

var user = [];

(function($) {
	$.sanitize = function(input) {
		var output = input.replace(/<script[^>]*?>.*?<\/script>/gi, '').
					 replace(/<[\/\!]*?[^<>]*?>/gi, '').
					 replace(/<style[^>]*?>.*?<\/style>/gi, '').
					 replace(/[img].*?[\/img]/gi, '<img src="*?">').
					 replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
	    return output;
	};
})(jQuery);


usernameInput.on('keyup', function(e) {
	if (e.keyCode === 13 && usernameInput.val().length > 0) {
		var getTxt = usernameInput.val();
		user.push(getTxt);
		usernameInput.val('');
		$('.initModal').css('display', 'none');
		console.log(user);
	}
});



var submit = document.getElementById('send');
submit.onclick = function () {
    var curUsername = user.join();
    if (input.val().length > 0) {
        var getTxt = input.val();
        messages.push({
            user: curUsername,
            message: getTxt
        });
    input.val('');
    }
}

messages.limitToLast(100).on("child_added", function(snap) {
	wrap.append('<li><span>' + $.sanitize(snap.val().user) + ', </span> ' + $.sanitize(snap.val().message) + '</li>');
	window.scrollTo(0,document.body.scrollHeight);
});
