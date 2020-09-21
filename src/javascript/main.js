console.log('Mainjs file');

var form = document.getElementById("form")
form.addEventListener("submit", wipeForm);

function wipeForm() {
    form.style.display = "none";
    var kontakt = document.getElementById("kontakt");
    var element = document.createElement("p");
    var tack = document.createTextNode("Tack för ditt meddelande!");
    element.appendChild(tack);
    kontakt.appendChild(element);
}