function crearClave() {
    const largo = parseInt(document.getElementById("tam").value);
    const incluirMayus = document.getElementById("mayus").checked;
    const incluirNum = document.getElementById("num").checked;
    const incluirSimbolos = document.getElementById("simbolos").checked;
    let base = "abcdefghijklmnopqrstuvwxyz";
    if (incluirMayus) base += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incluirNum) base += "0123456789";
    if (incluirSimbolos) base += "!@#$%^&*()_+";
    let resultado = "";
    for (let i = 0; i < largo; i++) {
        resultado += base.charAt(Math.floor(Math.random() * base.length));
    }
    document.getElementById("claveGenerada").value = resultado;
}
document.getElementById("generar").addEventListener("click", crearClave);
document.getElementById("copiar").addEventListener("click", () => {
    const campo = document.getElementById("claveGenerada");
    campo.select();
    document.execCommand("copy");
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
});
document.getElementById("tam").addEventListener("input", (e) => {
    document.getElementById("tamValor").textContent = e.target.value;
});