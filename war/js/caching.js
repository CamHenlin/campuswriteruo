/* Depends on jQuery
*/
var date = Date;

function KeyStroke(key) {
    this.time = date.now();
    this.key = key;
}

function KeyLog() {
    this.log = [],

    this.addKey = function (key) {
        this.log.push(new KeyStroke(key))
    }
}

function KeyListener(target) {
    var self = this;
    this.target = target;
    this.log = new KeyLog();

    this.clear = function() {
        self.log = new KeyLog();
    }
    this.get = function() {
        return self.log.log;
    }

    this.send = function() {
        // ajax code here
        // this is already firing when it should
    	$.ajax({
    		type: 'POST',
    		url: 'http://campuswriteruo.appspot.com/campuswriteruo',
    		data: { "action" : "saveKeyLogger", "value" : " { \"essay\" : { " + encodeURIComponent(JSON.stringify(log.essayCache.log.log)) + " }, \"note\" : { " + encodeURIComponent(JSON.stringify(log.noteCache.log.log)) + " } } " },
    		dataType: "json",
    		cache: false,
    		success: function (data) {
    			console.log("result of save key logger: " + data.keylogger + " " + JSON.stringify(log.essayCache.log.log) + " " + JSON.stringify(log.noteCache.log.log));
    		}
    	});
    	
        self.clear(); // empty the local copy of the log
    }

    this.autoSendTimer = window.setTimeout(self.send, 5000);
    $(target).on("keypress", function (e) {
        self.log.addKey(String.fromCharCode(e.which));
        window.clearTimeout(self.autoSendTimer);
        self.autoSendTimer = window.setTimeout(self.send, 5000);
    });
}

function setupKeyloggers() {
    this.essayCache = new KeyListener("#essay");
    this.noteCache = new KeyListener("#note");
}
