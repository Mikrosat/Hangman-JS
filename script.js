console.log('Please dont use console to hack, you are ruining your own fun!');
var slogan = "Bez pracy nie ma kołaczy";
slogan = slogan.toUpperCase();

var sloganLength = slogan.length;
var missed = 0;
var hashedSlogan = "";
var hittedSound = new Audio("/sounds/yes.wav");
var missedSound = new Audio("/sounds/no.wav");

for(i=0; i<sloganLength; i++){
    if(slogan.charAt(i)==" ") hashedSlogan += " ";
    else hashedSlogan += "-";
}
var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";
function writeSlogan(){
    document.getElementById('gameBoard').innerHTML = hashedSlogan;
}
function start(){
    var divContent = "";
    for (i=0; i<35; i++)
    {
        var element = "let"+i;
        divContent = divContent + '<div class="letter" id="'+element+'" onclick="checkNo('+i+')">'+letters[i]+'</div>';
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
        if(slogan.charAt(i) == letters[no])
        {
            hashedSlogan = hashedSlogan.setChar(i,letters[no]);
            hitted = true;
        }
    }

    var buttonID = "let" + no;
    if(hitted == true){
        hittedSound.play();
        document.getElementById(buttonID).style.background = "#005500";
        document.getElementById(buttonID).style.color = "#00CC00";
        document.getElementById(buttonID).style.border = "3px solid #00CC00";
        document.getElementById(buttonID).style.cursor = "default";
        document.getElementById(buttonID).setAttribute("onclick",";");
        writeSlogan();
    }
    else{
        missedSound.play();
        document.getElementById(buttonID).style.background = "#550000";
        document.getElementById(buttonID).style.color = "#CC0000";
        document.getElementById(buttonID).style.border = "3px solid #CC0000";
        document.getElementById(buttonID).style.cursor = "default";
        document.getElementById(buttonID).setAttribute("onclick",";"); //destroying onclick
        missed++;
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