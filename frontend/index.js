var txt = "Cyber-Squad"
var txt2 = "CPEN 442 Final Project"
var i = 0;

function typeHeaderText(){
    if(i < txt.length){
        var currHeaderText = document.getElementById("header-text").innerHTML
        document.getElementById("header-text").innerHTML = currHeaderText.substring(0, currHeaderText.length-1) + txt.charAt(i) + "_"
        i++
        setTimeout(typeHeaderText, 200)
    }else{
        i = 0
        setTimeout(typeHeaderText2, 200)
    }
}

function typeHeaderText2(){
    if(i < txt2.length){
        var currHeaderText = document.getElementById("header-text2").innerHTML
        document.getElementById("header-text2").innerHTML = currHeaderText.substring(0, currHeaderText.length-1) + txt2.charAt(i) + "_"
        i++
        setTimeout(typeHeaderText2, 150)
    }
}

