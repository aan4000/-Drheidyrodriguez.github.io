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
      .catch((err) => {
        btnContacto.value = 'Enviar mensaje';
        alert('Ocurrió un error al enviar el mensaje. Intente nuevamente.');
        console.error(err);
      });
  });
}

if (closeSuccessModal) {
  closeSuccessModal.addEventListener("click", () => {
    cerrarModal(successModal);
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) cerrarModal(successModal);
  });
}

// !!!!!!!!!TERMS AND CONDITIONS *///

if (terms && showTerms) {
  terms.addEventListener("change", () => {
    showTerms.classList.toggle("active");
  });
}

const in_btn = document.querySelector(".in_btn");

if (in_btn) {
  in_btn.disabled = true;
  in_btn.style.opacity = "55%";
}

if (bterms && in_btn && showTerms) {
  bterms.addEventListener("click", () => {
    in_btn.style.opacity = "1";
    showTerms.style.display = "none";
    in_btn.disabled = false;
  });
}