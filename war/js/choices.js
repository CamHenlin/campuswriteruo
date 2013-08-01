date = new Date;

function doAssessment(){
    if($("#shade:visible").length>0){
        $("#shade").fadeOut(500);
        $("#menu").fadeOut(500);
    }
    else{
        $("#shade").fadeIn(500);
        $("#menu").fadeIn(500);
    }
}

function chooseOption(el){
	window.clearTimeout(assessmentTimer);
	//console.log(el)
	//console.log(el.value)
	cacheChoice(el.value);
	doAssessment();
	setTimeout('document.getElementById("questions").reset()',1000);
	assessmentTimer = setTimeout(doAssessment,90000);
}

function cacheChoice(value){
    //value is a + number of category (column) + s + number of answer in category (row - 1)
    // ex. a0s0 = "Thinking of big ideas to write about" | a3s2 = "Checking the Time"
    var timeStamp = date.now();
    
    $.ajax({
        type: 'POST',
        url: "http://campuswriteruo.appspot.com/campuswriteruo",
        data: { "action" : "saveAssessment", "value" : value },
        dataType: "json",
        cache: false,
        success: function (data) {
        	if (data.assessment === "success") {
        		console.log("assessment saved successfully");
        	}
        }
    });
    
    sendAjax();
    
    
    //Local caching
    for(var el in cachedChoices) {
        //console.log(val + " | " + el);
        if (value==el) {
            cachedChoices[el] = cachedChoices[el] + timeStamp +" | ";
            //console.log("cached");
            return;
        }
    }
    
    console.log("--ERROR-- | value: " + value + " does not exist in chachedChoices.");
    return;
}

var cachedChoices = {
    "a0s0" : "",
    "a0s1" : "",
    "a0s2" : "",
    "a0s3" : "",
    "a0s4" : "",

    "a1s0" : "",
    "a1s1" : "",
    "a1s2" : "",
    "a1s3" : "",
    "a1s4" : "",
    
    "a2s0" : "",
    "a2s1" : "",
    "a2s2" : "",
    "a2s3" : "",
    "a2s4" : "",
    
    "a3s0" : "",
    "a3s1" : "",
    "a3s2" : "",
    "a3s3" : "",
    "a3s4" : ""
}
                        
 function seeCachedChoices() {
    for(var el in cachedChoices){
        console.log(el + " : " + cachedChoices[el])
    }
}                
                        
                        
                        