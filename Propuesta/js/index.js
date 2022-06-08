const form = document.getElementById("form");

const listInputs = document.querySelectorAll(".input_form");
console.log(listInputs);

// definir con atributos name de form
const expresiones = {
  nombre_usuario: /^[a-zA-ZÀ-ÿ\s]{3,65}$/,
  apellido_usuario: /^[a-zA-ZÀ-ÿ\s]{3,65}$/,
  tipoDocumento_usuario: /^.{23,25}$/,
  documento_usuario: /^\d{10}$/,
  telefono_usuario: /^\d{7,14}$/,
  email_usuario: /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/,
  contraseña_usuario: /^.{8,30}$/,
};

const campos = {
  div_nombre: false,
  div_apellido: false,
  div_tipoDocumento: false,
  div_documento: false,
  div_telefono: false,
  div_email: false,
  div_contraseña: false,
};


// El método querySelector() recibe entre paréntesis y comillas los selectores de la misma forma que se indican en CSS, devuelve el primer elemento que coincida con los selectores dados

const validacionCampo = (expresion, input, campo) => {
  // acceder a valor de input
  if (expresion.test(input.value)) {
    document.getElementById(`${campo}`).classList.remove("grupo_incorrecto");
    document.getElementById(`${campo}`).classList.add("grupo_correcto");
    document.querySelector(`#${campo} i`).classList.add("fa-check-circle");
    document.querySelector(`#${campo} i`).classList.remove("fa-times-circle");
    document
      .querySelector(`#${campo} .mensajeError`)
      .classList.remove("mensajeError_activo");
    campos[campo] = true;
  } else {
    document.getElementById(`${campo}`).classList.add("grupo_incorrecto");
    document.getElementById(`${campo}`).classList.remove("grupo_correcto");
    document.querySelector(`#${campo} i`).classList.add("fa-times-circle");
    document.querySelector(`#${campo} i`).classList.remove("fa-check-circle");
    document
      .querySelector(`#${campo} .mensajeError`)
      .classList.add("mensajeError_activo");
    campos[campo] = false;
  }
};

const validarContraseña2 = () => {
  const inputContraseña1 = document.getElementById("input_contraseña_usuario");
  const inputContraseña2 = document.getElementById("input_contraseña2_usuario");

  if (inputContraseña1.value !== inputContraseña2.value) {
    document
      .getElementById("div_contraseña2")
      .classList.add("grupo_incorrecto");
    document
      .getElementById("div_contraseña2")
      .classList.remove("grupo_correcto");
    document
      .querySelector("#div_contraseña2 i")
      .classList.add("fa-times-circle");
    document
      .querySelector("#div_contraseña2 i")
      .classList.remove("fa-check-circle");
    document
      .querySelector("#div_contraseña2 .mensajeError")
      .classList.add("mensajeError_activo");
    campos["div_contraseña"] = false;
  } else {
    document
      .getElementById("div_contraseña2")
      .classList.remove("grupo_incorrecto");
    document.getElementById("div_contraseña2").classList.add("grupo_correcto");
    document
      .querySelector("#div_contraseña2 i")
      .classList.remove("fa-times-circle");
    document
      .querySelector("#div_contraseña2 i")
      .classList.add("fa-check-circle");
    document
      .querySelector("#div_contraseña2 .mensajeError")
      .classList.remove("mensajeError_activo");
    campos["div_contraseña"] = true;
  }
};

const ValidacionForm = (e) => {
  // Obtener el nombre (atributo - name) de etiqueta, del elemento desencadenante del evento, podemos probar dicha funcion en consola
  switch (e.target.name) {
    case "nombre_usuario":
      validacionCampo(expresiones.nombre_usuario, e.target, "div_nombre");
      break;

    case "apellido_usuario":
      validacionCampo(expresiones.apellido_usuario, e.target, "div_apellido");
      break;

    case "tipoDocumento_usuario":
      validacionCampo(
        expresiones.tipoDocumento_usuario,
        e.target,
        "div_tipoDocumento"
      );
      break;

    case "documento_usuario":
      validacionCampo(expresiones.documento_usuario, e.target, "div_documento");
      break;

    case "telefono_usuario":
      validacionCampo(expresiones.telefono_usuario, e.target, "div_telefono");
      break;

    case "email_usuario":
      validacionCampo(expresiones.email_usuario, e.target, "div_email");
      break;

    case "contraseña_usuario":
      validacionCampo(
        expresiones.contraseña_usuario,
        e.target,
        "div_contraseña"
      );
      validarContraseña2();
      break;

    case "contraseña2_usuario":
      validarContraseña2();
      break;
  }
};

listInputs.forEach((input) => {

  input.addEventListener("keyup", () => {
    document.querySelectorAll(".input_form i").forEach((icono) => {
      icono.classList.add("input_icon_init");
    });
  });


  // evento predefinido keyup = Al terminar de escribir (al soltar una tecla) se ejecuta el codigo, podemos probar dicha funcion en consola
  input.addEventListener("keyup", ValidacionForm);

  // evento predefnido blur = es disparado cuando un  elemento ha perdido su foco, podemos probar dicha funcion en consola
  input.addEventListener("blur", ValidacionForm);
});


form.addEventListener("reset", () => {
  document.querySelectorAll(".input_form i").forEach((icono) => {
    icono.classList.remove("fa-times-circle");
    icono.classList.remove("fa-check-circle");
  });

  document.querySelectorAll(".input_form p").forEach((parrafo) => {
    parrafo.classList.remove("mensajeError_activo");
  });

  // document.querySelectorAll(".input_form input").forEach((input) => {
  //   input.classList.remove("grupo_incorrecto", "clase_input");
  // });
});


// Se tiene en cuenta la const campos anteriormente definida
form.addEventListener("submit", (e) => {
  // Solo para testing
  e.preventDefault();

  const nombre = campos.div_nombre;
  const apellido = campos.div_apellido;
  const tipoDocumento = campos.div_tipoDocumento;
  const documento = campos.div_documento;
  const telefono = campos.div_telefono;
  const email = campos.div_email;
  const contraseña = campos.div_contraseña;
  const terminosCondiciones = document.getElementById("terminosCondiciones");

  if (
    nombre &&
    apellido &&
    tipoDocumento &&
    documento &&
    telefono &&
    email &&
    contraseña &&
    terminosCondiciones.checked
  ) {
    form.reset();

    form.lastElementChild.innerHTML =
      "¡ Bienbenido... a nuestra comunidad !";

    document.querySelectorAll(".input_form i").forEach((icono) => {
      icono.classList.remove("fa-check-circle");
    });

    setTimeout(() => {
      form.lastElementChild.innerHTML = "Enlace Manual de usuario";
    }, 5000);
  }

  nuevoRegistro = () => {
    form.lastElementChild.innerHTML = "";
  };

  listInputs.forEach((input) => {
    input.addEventListener("keyup", nuevoRegistro);
  });
});