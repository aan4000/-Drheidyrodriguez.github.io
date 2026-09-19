// FORMULARIO DE CONTACTO
const terms = document.getElementById("terms");
const bterms = document.getElementById("bterms");
const showTerms = document.getElementById("showTerms");
const btnContacto = document.getElementById('button');
const formContacto = document.getElementById('form');
const campos = document.querySelectorAll('.inp, .area, .consultorios');

const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');

function mostrarModal(modal) {
  if (modal) modal.classList.add('active');
}

function cerrarModal(modal) {
  if (modal) modal.classList.remove('active');
}

if (formContacto && btnContacto) {
  formContacto.addEventListener('submit', function(event) {
    event.preventDefault();

    // Convertimos la NodeList a Array para usar el método .some()
    // Comprobamos si al menos UN campo está vacío después de quitar espacios
    const hayCampoVacio = Array.from(campos).some(campo => !campo.value.trim());

    if (hayCampoVacio) {
      alert("Debes completar toda tu información ⚠");
      return; // Detenemos la ejecución si hay campos vacíos
    }

    btnContacto.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_dfvdezt';

    // EmailJS lee la información del formulario (this)
    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btnContacto.value = 'Enviar mensaje';

        // Limpiamos los campos SOLAMENTE después de enviar con éxito
        campos.forEach((campo) => {
          campo.value = "";
        });

        // Mostramos la confirmación con el checkmark
        mostrarModal(successModal);
      })
      .catch((error) => {
        btnContacto.value = 'Enviar mensaje';
        console.error('Error al enviar:', error);
        alert('Hubo un error al enviar el mensaje. Intenta de nuevo.');
      });
  });
}

if (closeSuccessModal && successModal) {
  closeSuccessModal.addEventListener('click', () => {
    cerrarModal(successModal);
  });
}

// ============ CITAS ============
const btnCitas = document.getElementById('buttonCitas');
const formCitas = document.getElementById('formCitas');
const camposCitas = document.querySelectorAll('.inp-citas, .area-citas, .consultorios-citas');
const successModalCitas = document.getElementById('successModalCitas');
const closeSuccessModalCitas = document.getElementById('closeSuccessModalCitas');
const errorModalCitas = document.getElementById('errorModalCitas');
const closeErrorModalCitas = document.getElementById('closeErrorModalCitas');

if (formCitas && btnCitas) {
  formCitas.addEventListener('submit', function(event) {
    event.preventDefault();

    const hayCampoVacio = Array.from(camposCitas).some(campo => !campo.value.trim());

    if (hayCampoVacio) {
      alert("Debes completar toda tu información ⚠");
      return;
    }

    btnCitas.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_dfvdezt';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btnCitas.value = 'Agendar Cita';
        camposCitas.forEach((campo) => {
          campo.value = "";
        });
        mostrarModal(successModalCitas);
      })
      .catch((error) => {
        btnCitas.value = 'Agendar Cita';
        console.error('Error al enviar:', error);
        mostrarModal(errorModalCitas);
      });
  });
}

if (closeSuccessModalCitas && successModalCitas) {
  closeSuccessModalCitas.addEventListener('click', () => {
    cerrarModal(successModalCitas);
  });
}

if (closeErrorModalCitas && errorModalCitas) {
  closeErrorModalCitas.addEventListener('click', () => {
    cerrarModal(errorModalCitas);
  });
}

const in_btn = document.getElementById('button');
if (in_btn) {
  in_btn.disabled = true;
  in_btn.style.opacity = "55%";
}

// Términos y condiciones: al marcar la casilla se abre el modal;
// el botón "Aceptar" cierra el modal y habilita el envío.
if (terms && bterms && in_btn && showTerms) {
  terms.addEventListener("change", () => {
    if (terms.checked) {
      showTerms.classList.add("active");
    } else {
      showTerms.classList.remove("active");
      in_btn.disabled = true;
      in_btn.style.opacity = "55%";
    }
  });

  // Si la casilla ya está marcada, volver a hacer clic reabre el modal.
  terms.addEventListener("click", () => {
    if (terms.checked) {
      showTerms.classList.add("active");
    }
  });

  bterms.addEventListener("click", () => {
    showTerms.classList.remove("active");
    in_btn.style.opacity = "1";
    in_btn.disabled = false;
  });

  // Cerrar al pulsar fuera del panel (sin habilitar el envío)
  showTerms.addEventListener("click", (event) => {
    if (event.target === showTerms) {
      showTerms.classList.remove("active");
    }
  });
}