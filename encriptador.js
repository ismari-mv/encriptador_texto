const d = document;
const textArea = d.querySelector(".formulario__texto"); 
const btnEncriptar = d.querySelector(".boton__encriptar"); 
const btnDesencriptar = d.querySelector(".boton__desencriptar"); 
const resultado = d.querySelector(".contenedor__mensaje"); 
const btnCopiar = d.querySelector(".boton__copiar"); 
const robotImg = d.querySelector(".robot"); 

const llaves = [
    ['e', 'enter'],
    ['i', 'imes'],
    ['a', 'ai'],
    ['o', 'ober'],
    ['u', 'ufat'],
];

console.log("El script se está ejecutando");

function encriptarMensaje(mensaje) {
    let mensajeEncriptado = '';
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let palabraEncriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                palabraEncriptada = llaves[j][1]; // Reemplaza la letra por el equivalente encriptado
                break; // Termina el bucle for
            }
        }
        mensajeEncriptado += palabraEncriptada; // Concatenar la palabra encriptada
    }
    return mensajeEncriptado;
}

function desencriptarMensaje(mensajeEncriptado) {
    let mensajeDesencriptado = mensajeEncriptado;
    for (let j = 0; j < llaves.length; j++) {
        const [letra, palabraEncriptada] = llaves[j];
        mensajeDesencriptado = mensajeDesencriptado.split(palabraEncriptada).join(letra);
    }
    return mensajeDesencriptado;
}

// Actualiza el contenido del contenedor de mensaje
function actualizarMensaje(mensaje, titulo) {
    resultado.querySelector('.titulo_mensaje').textContent = titulo;
    resultado.querySelector('.parrafo_mensaje').textContent = mensaje;
}

// Cambia la imagen del robot
function cambiarImagenRobot(estado) {
    if (estado === 'nuevoMensaje') {
        robotImg.src = "assets/robot2.png"; // Cambia a la imagen cuando hay un mensaje
    } else {
        robotImg.src = "assets/robot1.png"; // Imagen original cuando no hay mensaje
    }
}

// Detecta cambios en el textarea
textArea.addEventListener("input", () => {
    if (textArea.value.trim() !== "") {
        cambiarImagenRobot('nuevoMensaje');
    } else {
        cambiarImagenRobot('sinMensaje');
        actualizarMensaje("Ingresa el texto que desees encriptar o desencriptar", "Ningún mensaje fue encontrado");
    }
});

// Evento para encriptar
btnEncriptar.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    const mensaje = textArea.value;
    const mensajeEncriptado = encriptarMensaje(mensaje);
    textArea.value = mensajeEncriptado; // Muestra el mensaje encriptado en el textarea
    actualizarMensaje(mensajeEncriptado, "Mensaje encriptado:");
});

// Evento para desencriptar
btnDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    const mensaje = textArea.value;
    const mensajeDesencriptado = desencriptarMensaje(mensaje);
    textArea.value = mensajeDesencriptado; // Muestra el mensaje desencriptado en el textarea
    actualizarMensaje(mensajeDesencriptado, "Mensaje desencriptado:");
});

// Evento para copiar el texto
btnCopiar.addEventListener("click", () => {
    const textoACopiar = textArea.value;
    navigator.clipboard.writeText(textoACopiar).then(() => {
        alert("Texto copiado al portapapeles");
    });
});
