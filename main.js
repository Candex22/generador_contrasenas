// Función para generar una contraseña con palabras clave
function crearClaveConPalabrasClave(palabrasClave, largo, incluirMayus, incluirNum, incluirSimbolos) {
    // Si no hay palabras clave o están vacías, usamos el método estándar
    if (!palabrasClave || palabrasClave.length === 0 || palabrasClave[0].trim() === '') {
        return crearClaveEstandar(largo, incluirMayus, incluirNum, incluirSimbolos);
    }

    // Seleccionar aleatoriamente una o dos palabras clave
    const numPalabras = Math.min(palabrasClave.length, Math.random() > 0.5 ? 2 : 1);
    const palabrasSeleccionadas = [];
    
    // Seleccionar palabras al azar
    while (palabrasSeleccionadas.length < numPalabras) {
        const indice = Math.floor(Math.random() * palabrasClave.length);
        const palabra = palabrasClave[indice].trim();
        if (palabra !== '' && !palabrasSeleccionadas.includes(palabra)) {
            palabrasSeleccionadas.push(palabra);
        }
    }

    // Mezclar letras mayúsculas en las palabras si se requiere
    let palabrasMezcladas = palabrasSeleccionadas.map(palabra => {
        if (incluirMayus) {
            return palabra.split('').map(letra => {
                return Math.random() > 0.7 ? letra.toUpperCase() : letra;
            }).join('');
        }
        return palabra;
    });

    // Unir palabras con posible modificación
    let resultado = palabrasMezcladas.join(Math.random() > 0.5 ? '' : '_');

    // Determinar cuántos caracteres adicionales necesitamos
    const caracteresRestantes = largo - resultado.length;
    
    if (caracteresRestantes > 0) {
        // Crear base de caracteres adicionales
        let caracteresBase = "";
        if (incluirMayus) caracteresBase += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (incluirNum) caracteresBase += "0123456789";
        if (incluirSimbolos) caracteresBase += "!@#$%^&*()_+";
        if (caracteresBase === "") caracteresBase = "abcdefghijklmnopqrstuvwxyz";
        
        // Agregar caracteres aleatorios
        for (let i = 0; i < caracteresRestantes; i++) {
            // Posición aleatoria para insertar (puede ser al principio, en medio o al final)
            const posicion = Math.floor(Math.random() * (resultado.length + 1));
            const caracter = caracteresBase.charAt(Math.floor(Math.random() * caracteresBase.length));
            resultado = resultado.slice(0, posicion) + caracter + resultado.slice(posicion);
        }
    } else if (caracteresRestantes < 0) {
        // Si las palabras exceden el largo máximo, cortamos
        resultado = resultado.slice(0, largo);
    }

    return resultado;
}

// Función estándar para generar una contraseña aleatoria
function crearClaveEstandar(largo, incluirMayus, incluirNum, incluirSimbolos) {
    let base = "abcdefghijklmnopqrstuvwxyz";
    if (incluirMayus) base += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (incluirNum) base += "0123456789";
    if (incluirSimbolos) base += "!@#$%^&*()_+";
    let resultado = "";
    for (let i = 0; i < largo; i++) {
        resultado += base.charAt(Math.floor(Math.random() * base.length));
    }
    return resultado;
}

// Función principal para crear contraseña
function crearClave() {
    const largo = parseInt(document.getElementById("tam").value);
    const incluirMayus = document.getElementById("mayus").checked;
    const incluirNum = document.getElementById("num").checked;
    const incluirSimbolos = document.getElementById("simbolos").checked;
    const usarPalabrasClave = document.getElementById("usarPalabrasClave").checked;
    
    let resultado = "";
    
    if (usarPalabrasClave) {
        const palabrasClaveInput = document.getElementById("palabrasClave").value;
        const palabrasClave = palabrasClaveInput.split(',');
        resultado = crearClaveConPalabrasClave(palabrasClave, largo, incluirMayus, incluirNum, incluirSimbolos);
    } else {
        resultado = crearClaveEstandar(largo, incluirMayus, incluirNum, incluirSimbolos);
    }
    
    document.getElementById("claveGenerada").value = resultado;
}

// Mostrar/ocultar campo de palabras clave
document.getElementById("usarPalabrasClave").addEventListener("change", function() {
    const campoPC = document.getElementById("palabrasClaveCampo");
    if (this.checked) {
        campoPC.style.display = "block";
    } else {
        campoPC.style.display = "none";
    }
});

// Cambiar tema claro/oscuro
document.getElementById("toggleTheme").addEventListener("click", function() {
    const html = document.documentElement;
    const themeButton = document.getElementById("toggleTheme");
    
    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        themeButton.textContent = "💜"; // Luna para cambiar a modo oscuro
    } else {
        html.setAttribute("data-theme", "dark");
        themeButton.textContent = "🧡"; // Sol para cambiar a modo claro
    }
});

// Eventos existentes
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

// Inicializar el tema
document.documentElement.setAttribute("data-theme", "light");