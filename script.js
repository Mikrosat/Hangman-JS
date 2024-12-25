console.log('Please dont use console to hack, you are ruining your own fun!');

var slogansBase = [
    {
        title: "Powiedzenia",
        items: 
        [
            "Bez pracy nie ma kołaczy",
            "Po burzy wychodzi słońce",
            "Co dwie głowy to nie jedna"
        ]
    },
    {
        title: "Gry komputerowe",
        items:
        [
            "Grand Theft Auto V",
            "Minecraft",
            "Roblox"
        ]
    }
];

var chosenCategory = slogansBase[random(0, slogansBase.length - 1)];
var slogan = chosenCategory.items[random(0, chosenCategory.items.length - 1)];
var sloganCategory = chosenCategory.title;
slogan = slogan.toUpperCase();

var muted = false;
var sloganLength = slogan.length;
var missed = 0;
var hashedSlogan = "";
var hittedSound = new Audio("/sounds/yes.wav");
var missedSound = new Audio("/sounds/no.wav");

for(i=0; i<sloganLength; i++){
    if(slogan.charAt(i)==" ") hashedSlogan += " ";
    else hashedSlogan += "-";
}
var letters = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";

function muteBtnClicked(){
    if(muted){
        document.getElementById("muteBtn").innerHTML = '<img src="img/unmuteIcon.png" class="muteIcon" onclick="muteBtnClicked()"/>'
        muted = false;
    }
    else{
        document.getElementById("muteBtn").innerHTML = '<img src="img/muteIcon.png" class="muteIcon" onclick="muteBtnClicked()"/>'
        muted = true;
    }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function writeSlogan(){
    document.getElementById('sloganCategory').innerHTML = '<h5>Kategoria: '+sloganCategory+'</h5>';
    document.getElementById('gameBoard').innerHTML = hashedSlogan;
}
function start(){
    var divContent = "";
    for (i=0; i<35; i++)
    {
        var element = "let"+i;
        divContent = divContent + '<div class="letter" id="'+element+'" onclick="checkNo('+i+')">'+letters.charAt(i)+'</div>';
        if((i+1) % 7 == 0) divContent += '<div style="clear: both"></div>';
    }

    document.getElementById('alphabet').innerHTML = divContent;
    writeSlogan();
}
String.prototype.setChar = function(position, char){
    if(position > this.length - 1) return this.toString();
    else return this.slice(0,position) + char + this.slice(position+1);
}
function checkNo(no){
    var hitted = false;
    for(i=0; i<sloganLength; i++)
    {
        if(slogan.charAt(i) == letters.charAt(no))
        {
            hashedSlogan = hashedSlogan.setChar(i,letters.charAt(no));
            hitted = true;
        }
    }

    var buttonID = "let" + no;
    if(hitted == true){
        if(!muted) hittedSound.play();
        document.getElementById(buttonID).style.background = "#005500";
        document.getElementById(buttonID).style.color = "#00CC00";
        document.getElementById(buttonID).style.border = "3px solid #00CC00";
        document.getElementById(buttonID).style.cursor = "default";
        document.getElementById(buttonID).setAttribute("onclick",";");
        writeSlogan();
    }
    else{
        if(!muted) missedSound.play();
        document.getElementById(buttonID).style.background = "#550000";
        document.getElementById(buttonID).style.color = "#CC0000";
        document.getElementById(buttonID).style.border = "3px solid #CC0000";
        document.getElementById(buttonID).style.cursor = "default";
        document.getElementById(buttonID).setAttribute("onclick",";"); //destroying onclick
        missed++;
        if(missed>9)
            missed = 9;
        document.getElementById("gallow").innerHTML = '<img src="/img/s'+missed+'.jpg" />';
    }
    //win
    if(slogan == hashedSlogan){
        document.getElementById('alphabet').innerHTML = 'Brawo! Podales prawidlowe haslo! <br /> <br /> <span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }
    //lose
    if(missed >= 9){
        document.getElementById('alphabet').innerHTML = 'Przegrana! Prawidlowe haslo: <br />'+slogan+' <br /> <br /> <span class="loseReset" onclick="location.reload()">JESZCZE RAZ?</span>';
    }
}
window.onload = start;