// Obtener referencias a elementos HTML
const form = document.getElementById("registro-notas-form");
const tablaRegistros = document.getElementById("tabla-registros");

// Array para almacenar los registros de estudiantes
const registros = [];

// Variable para realizar un seguimiento de la fila seleccionada para editar
let filaEditada = -1;

// Función para agregar un registro
function agregarRegistro(nombre, materia, nota) {
    registros.push({ nombre, materia, nota });
}

// Función para mostrar la tabla de registros
function mostrarTabla() {
    let tablaHTML = "<table>";
    tablaHTML += "<tr><th>Nombre</th><th>Materia</th><th>Nota</th><th>Acciones</th></tr>";

    registros.forEach((registro, index) => {
        tablaHTML += `<tr><td>${registro.nombre}</td><td>${registro.materia}</td><td>${registro.nota}</td><td><button onclick="editarRegistro(${index})">Editar</button> <button onclick="eliminarRegistro(${index})">Eliminar</button></td></tr>`;
    });

    tablaHTML += "</table>";
    tablaRegistros.innerHTML = tablaHTML;
}

// Función para eliminar un registro
function eliminarRegistro(index) {
    registros.splice(index, 1);
    mostrarTabla();
    filaEditada = -1; // Restablecer la fila editada
}

// Función para editar un registro
function editarRegistro(index) {
    filaEditada = index;
    form.nombre.value = registros[index].nombre;
    form.materia.value = registros[index].materia;
    form.nota.value = registros[index].nota;
}

// Manejar el envío del formulario
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = form.nombre.value;
    const materia = form.materia.value;
    const nota = parseFloat(form.nota.value);

    if (nombre && materia && !isNaN(nota)) {
        if (filaEditada === -1) {
            // Agregar un nuevo registro
            agregarRegistro(nombre, materia, nota);
        } else {
            // Actualizar un registro existente
            registros[filaEditada] = { nombre, materia, nota };
            filaEditada = -1; // Restablecer la fila editada
        }

        mostrarTabla();
        form.reset();
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
});

// Mostrar la tabla inicialmente
mostrarTabla();