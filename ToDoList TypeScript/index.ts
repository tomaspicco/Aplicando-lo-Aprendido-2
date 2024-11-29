import promptSync from "prompt-sync";

const scanf = promptSync();

function menuPrincipal() {
  limpiarPantalla();
  console.log("¡Hola Olivia!\t\n¿Qué deseas hacer?");
  console.log(
    "[1] Ver mis tareas.\n[2] Buscar una tarea.\n[3] Agregar una tarea.\n[0] Salir."
  );
  let opcion = parseInt(scanf("Ingrese una opción: "));
  while (opcion < 0 || opcion > 3) {
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: ")
    );
  }
  return opcion;
}

function limpiarPantalla() {
  console.clear();
}

function menuVerTareas() {
  limpiarPantalla();
  console.log(
    "¿Qué tareas deseas ver?\n[1] Todas\n[2] Pendientes\n[3] Curso\n[4] Terminadas\n[0] Volver"
  );

  let opcion = parseInt(scanf("Ingrese una opción: "));
  while (opcion < 0 || opcion > 4) {
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: ")
    );
  }
  return opcion;
}
interface Tarea {
  titulo: string;
  descripcion: string;
  estado: string;
  fechaDeCreacion: string;
  ultimoCambio: string;
  vencimiento: Date | string;
  dificultad: string;
}

function CreaTarea(
  titulo: string = "Sin título",
  descripcion: string = "Sin descripcion",
  estado: string = "P",
  vencimiento: string = "Ninguna" || Date(),
  dificultad: string = "⭐"
): Tarea {
  return {
    titulo,
    descripcion,
    estado,
    fechaDeCreacion: new Date().toLocaleDateString("es-ES"),
    ultimoCambio: new Date().toLocaleDateString("es-ES"),
    vencimiento,
    dificultad,
  };
}

function menuAgregarTarea(tarea: Tarea) {
  console.log("Ingresó a crear una tarea\n");
  console.log(
    "Para ingresar los datos, seleccione una opción:\n[1] Ingresar título\n[2] Ingresar descripcion)\n[3] Ingresar estado\n[4] Ingresar dificultad\n[5] Ingresar vencimiento"
  );
  console.log("Presione 0 para guardar los datos ingresados\n");
  let opcion: number = parseInt(scanf("Ingresa una opcion: "));
  while (opcion < 0 || opcion > 5) {
    opcion = parseInt(
      scanf("La opción ingresada no es válida.\nIngrese otra: ")
    );
  }
  return opcion;
}
function ingresarTitulo() {
  let titulo: string = scanf("1- Ingrese el título (es obligatorio): ");
  while (titulo === "") {
    titulo = scanf("El título no puede ser nulo, ingrese uno: ");
  }
  return titulo;
}

function ingresarDescripcion() {
  let descripcion: string = scanf("2- Ingrese una descripcion: ");
  return descripcion;
}
function ingresarEstado() {
  let estado = scanf(
    "3- Ingrese el estado que por defecto esta pendiente: [P]pendiente/ [EC]en curso/ [T]terminada/ [C] cancelada:"
  );
  estado = estado.toUpperCase();
  while (estado != "P" && estado != "EC" && estado != "T" && estado != "C") {
    console.log("Ingresó un estado no válido.Ingrese otro: ");
    estado = scanf("");
    estado = estado.toUpperCase();
  }
  return estado;
}
function ingresarDificultad() {
  let dificultad: string = scanf(
    "4- Ingrese la dificultad, por defecto fácil: [F]fácil(⭐)/[M]medio(⭐⭐)/[D]difícil(⭐⭐⭐): "
  );
  dificultad = dificultad.toUpperCase();
  while (dificultad != "F" && dificultad != "M" && dificultad != "D") {
    dificultad = scanf(
      "La dificultad ingresada es inválida, ingrese nuevamente: "
    );
    dificultad = dificultad.toUpperCase();
  }
  if (dificultad === "F") {
    dificultad = "⭐";
  } else if (dificultad === "M") {
    dificultad = "⭐⭐";
  } else if (dificultad === "D") {
    dificultad = "⭐⭐⭐";
  }
  return dificultad;
}
function ingresarFechadeVencimiento() {
  let fechaVencimiento = PedirFechadeVencimiento();
  while (fechaVencimiento <= FechaActual) {
    console.log("Fecha no válida. Ingrese nuevamente: ");
    fechaVencimiento = PedirFechadeVencimiento();
  }
  return fechaVencimiento;
}
function AnnoBisiesto(anno: number) {
  return anno % 4 === 0 && anno % 100 !== 0; //un año es
  //bisiesto si es divisible entre 4 pero no entre 100
}



function PedirFechadeVencimiento() {
  let anno: number,
    mes: number,
    dia: number = 0,
    band: number = -1,
    hora: number,
    fechaVencimiento: Date;

  anno = parseInt(scanf("Ingrese el año de vencimiento: "));

  while (isNaN(anno) || anno < 1000 || anno > 9999) {
    anno = parseInt(scanf(
      "El año de vencimiento ingresado no es válido. Ingrese otro: "
    ));
  }

  mes = parseInt(scanf("Ingrese el mes de vencimiento entre el 1 y 12: "));

  while (isNaN(mes) || mes < 1 || mes > 12) {
    mes = parseInt(scanf("Mes de vencimiento no válido, reingrese uno correcto del 1 al 12: "));
  }

  do {
    if (band >= 0) {
      console.log("Ingresó un día no válido.");
    }
    switch (mes) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dia = parseInt(scanf("Ingrese el día de vencimiento entre el 1 y 31: "));
        if (dia < 1 || dia > 31) dia = NaN;
        break;
      case 2:
        if (AnnoBisiesto(anno)) {
          dia = parseInt(scanf("Ingrese el día de vencimiento del 1 al 29: "));
          if (dia < 1 || dia > 29) dia = NaN;
        } else {
          dia = parseInt(scanf("Ingrese el día de vencimiento del 1 al 28: "));
          if (dia < 1 || dia > 28) dia = NaN;
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        dia = parseInt(scanf("Ingrese el día de vencimiento entre el 1 y 30: "));
        if (dia < 1 || dia > 30) dia = NaN;
        break;
    }
    band++;
  } while (isNaN(dia) || dia < 1 || dia > 31);

  hora = parseInt(scanf("Ingrese la hora de vencimiento entre las 0 y las 23: "));
  while (isNaN(hora) || hora < 0 || hora > 23) {
    hora = parseInt(scanf("Hora de vencimiento no válida, ingrese una correcta entre 0 y 23: "));
  }

  fechaVencimiento = new Date(anno, mes - 1, dia, hora);
  fechaVencimiento.toLocaleDateString("es-ES");

  return fechaVencimiento;
}






function ordenarTareas() {
  let tareaTemp = CreaTarea();

  for (let i = 0; i < ListadeTareas.length; i++) {
    for (let j = 0; j < ListadeTareas.length - 1; j++) {
      if (ListadeTareas[j].titulo > ListadeTareas[j + 1].titulo) {
        tareaTemp = ListadeTareas[j];
        ListadeTareas[j] = ListadeTareas[j + 1];
        ListadeTareas[j + 1] = tareaTemp;
      }
    }
  }
}
function mostrarTodasTareas() {
  for (let i = 0; i < ListadeTareas.length; i++) {
    console.log(`[${i + 1}]: ${ListadeTareas[i].titulo}`);
  }
  verdetallesTodas();
}

function verdetallesTodas() {
  console.log("¿Deseas ver los detalles de alguna?");
  let ver: number = parseInt(
    scanf("Introduce el número para verla o 0 para volver")
  );
  if (ver === 0) {
    console.log("Volviendo al Menú anterior...");
    menuPrincipal();
  } else {
    console.log(`Título: ${ListadeTareas[ver - 1].titulo}`);
    console.log(`descripcion: ${ListadeTareas[ver - 1].descripcion}`);
    console.log(`Estado: ${ListadeTareas[ver - 1].estado}`);
    console.log(`Fecha de Creación: ${ListadeTareas[ver - 1].fechaDeCreacion}`);
    console.log(`Vencimiento: ${ListadeTareas[ver - 1].vencimiento}`);
    console.log(`Dificultad: ${ListadeTareas[ver - 1].dificultad}`);
    console.log("------------------------");
    editarTarea(ver);
  }
}

function verdetalles(estado: string) {
  console.log("¿Deseas ver los detalles de alguna?");
  //  console.log("Introduce el número para verla o 0 para volver");
  let ver: number = parseInt(
    scanf("Introduce el número para verla o 0 para volver")
  );
  if (ver === 0) {
    console.log("Volviendo al Menú anterior...");
    menuPrincipal();
  } else if (ListadeTareas[ver - 1].estado === estado) {
    console.log(`Título: ${ListadeTareas[ver - 1].titulo}`);
    console.log(`descripcion: ${ListadeTareas[ver - 1].descripcion}`);
    console.log(`Estado: ${ListadeTareas[ver - 1].estado}`);
    console.log(`Fecha de Creación: ${ListadeTareas[ver - 1].fechaDeCreacion}`);
    console.log(`Vencimiento: ${ListadeTareas[ver - 1].vencimiento}`);
    console.log(`Dificultad: ${ListadeTareas[ver - 1].dificultad}`);
    console.log("------------------------");
    editarTarea(ver);
  }
}

function editarTarea(ver: number) {
  let editar = scanf(
    "Si deseas editarla presiona E, o presiona 0 para volver."
  );
  editar = editar.toUpperCase();
  if (editar === "E") {
    console.log("¿Qué atributo desea editar?");
    let editar = parseInt(
      scanf(
        "[1]Titulo\n[2]Descripcion\n[3]Estado\n[4]Dificultad\n[5]Fecha de vencimiento\n"
      )
    );
    while (editar < 1 || editar > 5) {
        editar = parseInt(
        scanf("La opción ingresada no es válida.\nIngrese otra: ")
      );
    }
    switch (editar) {
      case 1:
        {
          ListadeTareas[ver - 1].titulo = ingresarTitulo();
        }
        break;

      case 2:
        {
          ListadeTareas[ver - 1].descripcion = ingresarDescripcion();
        }
        break;

      case 3:
        ListadeTareas[ver - 1].estado = ingresarEstado();
        break;

      case 4:
        ListadeTareas[ver - 1].dificultad = ingresarDificultad();
        break;

      case 5:
        ListadeTareas[ver - 1].vencimiento = ingresarFechadeVencimiento();
        break;
    }
  }
}

function verTareasPorEstado(estado: string) {
  let x = 0;
  for (let i = 0; i < ListadeTareas.length; i++) {
    if (ListadeTareas[i].estado === estado) {
      x = x + 1;
      console.log(`[${i + 1}]: ${ListadeTareas[i].titulo}`);
    }
  }
  if (x > 0) {
    verdetalles(estado);
  } else {
    console.log("No hay tareas para mostrar");
  }
}

function opcion1() {
  limpiarPantalla();
  let opcion = menuVerTareas();
  switch (opcion) {
    case 1:
      console.log("Estas son todas tus tareas:");
      mostrarTodasTareas();
      break;
    case 2:
      verTareasPorEstado("P");
      break;
    case 3:
      verTareasPorEstado("EC");
      break;

    case 4:
      console.log("Estas son tus tareas terminadas:");
      verTareasPorEstado("T");
      break;

    default:
      console.log("Opción no válida.");
  }
}
function opcion3(): void {
  let menuAgregar = -1;
  let tareaNueva = CreaTarea();
  do {
    limpiarPantalla();
    menuAgregar = menuAgregarTarea(tareaNueva);

    limpiarPantalla();
    switch (menuAgregar) {
      case 1:
        tareaNueva.titulo = ingresarTitulo();
        break;
      case 2:
        tareaNueva.descripcion = ingresarDescripcion();

        break;
      case 3:
        tareaNueva.estado = ingresarEstado();
        break;
      case 4:
        tareaNueva.dificultad = ingresarDificultad();
        break;
      case 5:
        tareaNueva.vencimiento = ingresarFechadeVencimiento();
        break;
      case 0:
        if (tareaNueva.titulo === "Sin título") {
          menuAgregar = -1;
          console.log("No se puede agregar la tarea sin título.");
          Esperarscanf();
        } else {
          ListadeTareas.push(tareaNueva);
          ordenarTareas();
          console.log("¡Tarea creada con éxito!");
          Esperarscanf();
        }
        break;
      default:
        console.log("Opción inválida.");
        Esperarscanf();
        break;
    }
  } while (menuAgregar != 0);
}

function Esperarscanf() {
  scanf("Presione una tecla para seguir...");
}

function opcion2() {
  let cadenaBusqueda = scanf(
    "Introduzca una palabra o frase para buscar tareas: "
  );

  if (cadenaBusqueda.trim() === "") {
    console.log("La búsqueda no puede estar vacía. Inténtelo nuevamente.");
    return;
  }

  buscarTarea(cadenaBusqueda);
}

function buscarTarea(cadena: string) {
  let resultados = ListadeTareas.filter((tarea) =>
    tarea.titulo.toLowerCase().includes(cadena.toLowerCase())
  );

  if (resultados.length === 0) {
    console.log("No hay tareas relacionadas con la búsqueda.");
    Esperarscanf();
  } else {
    mostrarCoincidencias(resultados);
  }
}

function mostrarCoincidencias(resultados: Tarea[]) {
  limpiarPantalla();
  console.log("Tareas encontradas:");
  resultados.forEach((tarea, index) => {
    console.log(`[${index + 1}] ${tarea.titulo}`);
  });

  gestionarResultados(resultados);
}

function gestionarResultados(resultados: Tarea[]) {
  console.log("\n¿Qué deseas hacer?");
  console.log("[1] Ver detalles de la tarea");
  console.log("[0] Volver al menú principal");

  let opcion = parseInt(
    scanf("[1] Ver detalles de la tarea\n[0] Volver al menú principal")
  );
  switch (opcion) {
    case 1:
      let indice =
        parseInt(
          scanf("Ingrese el número de la tarea para ver los detalles: ")
        ) - 1;

      if (indice >= 0 && indice < resultados.length) {
        mostrarDetallesTarea(resultados[indice]);
      } else {
        console.log("Número inválido. Inténtelo nuevamente.");
        gestionarResultados(resultados);
      }
      break;
    case 0:
      console.log("Volviendo al menú principal...");
      break;
    default:
      console.log("Opción no válida.");
      gestionarResultados(resultados);
  }
}

function mostrarDetallesTarea(tarea: Tarea) {
  limpiarPantalla();
  console.log(`\nDetalles de la tarea seleccionada:`);
  console.log(`Título: ${tarea.titulo}`);
  console.log(`Descripcion: ${tarea.descripcion}`);
  console.log(`Estado: ${tarea.estado}`);
  console.log(`Fecha de Creación: ${tarea.fechaDeCreacion}`);
  console.log(`Vencimiento: ${tarea.vencimiento}`);
  console.log(`Dificultad: ${tarea.dificultad}`);
  console.log("------------------------");
  Esperarscanf();
}

//----------------------------------------------------------------------------------------------------------------------------------

let ListadeTareas: Tarea[] = [];

let FechaActual = new Date();
let opcionMenu;

do {
  opcionMenu = menuPrincipal();
  switch (opcionMenu) {
    case 1:
      opcion1();
      break;
    case 2:
      opcion2();
      break;

    case 3:
      opcion3();
      break;

    case 0:
      console.log("Saliendo del programa.");
      break;
    default:
      console.log("Opción no válida.");
  }
} while (opcionMenu !== 0);
