
function sendAjax() {
    console.log("send ajax fired");
    $.ajax({
        type: 'POST',
        url: 'http://campuswriteruo.appspot.com/campuswriteruo',
        data: { "action" : "saveNote", "note" : encodeURIComponent(cache.note) },
        dataType: "json",
        crossDomain: true,
        cache: false,
        success: function(data) {
            console.log("result of savenote: " + data.note);
        }
    });
	$.ajax({
		type: 'POST',
		url: 'http://campuswriteruo.appspot.com/campuswriteruo',
		data: { "action" : "saveEssay", "value" : encodeURIComponent(cache.essay) },
		dataType: "json",
		crossDomain: true,
		cache: false,
		success: function (data) {
			console.log("result of saveessay: " + data.essay);
		}
	});
}
