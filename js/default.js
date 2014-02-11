var currentPos;
var songLength;
var selected;

function cmd(args) {
	$.getJSON("/cgi-bin/mpc.cgi", {
		'comm' : args
	}, function() {

	});
}

function getCurrent() {
	$.getJSON("/cgi-bin/mpc.cgi", {
		'comm' : '-f "%title%\f%artist%\f"'
	}, function(data) {
		var songname = data.match(/^(.*)\f.*/);
		var artist = data.match(/.*\f(.*)\f.*/);
		var num = data.match(/[0-9]+/g);
		songLength = parseInt(num[4]) * 60 + parseInt(num[5]);
		currentPos = parseInt(num[2]) * 60 + parseInt(num[3]);
		$("#songpos").val(currentPos);
		$("#songpos")[0].max = songLength;

		$("#currentSong").empty();
		$("#currentSong").append(songname);
		$("#volume").val(parseInt(num[7]));
		$("#songpos").change();
		$("#volume").change();
	});

}

function getPlaylist() {
	$.getJSON("/cgi-bin/mpc.cgi", {
		'comm' : '-f "%position%\f%file%\f%artist%\f%title%" playlist'
	}, function(data) {
		txt = data;
		list = txt.split('\n');
		$("#playlist").empty();
		$.each(list, function(val) {
			var data = val.split('\f');
			$li = $('<li>', {
				'data-icon' : "arror-r",
				'onclick' : "selected = " + data[0]
			});
			$a = $('<a>', {
				'href' : '#dialog',
				'data-rel' : "dialog"
			});
			$a.append(data[2] + " - " + data[3]);
			$li.append($a)
			$("#playlist").append($li);

		});
		$("#playlist").listview("refresh");
	});
}

function play(args) {
	cmd("play " + args);
	getCurrent();
}

function getInfo() {
	$("#songpos").value += 1;
	if ($("#songpos").value == songLength || str == -1) {
		setTimeout("getCurrent()", 1500);
		setTimeout("getPlaylist()", 1500);
	}
	$("#songpos").change();
	$("#volume").change();
}

$(document).ready(function() {

	$('.navbar').stickUp();

	var int = setInterval("getInfo()", 1000);
	var int = setInterval("getCurrent()", 10000);
	$("#playlistpanel").panel("open");
});