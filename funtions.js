// PROGRAMAR CITAS
const terms = document.getElementById("terms");
const showTerms = document.getElementById("showTerms");
const bterms = document.getElementById("bterms"); 
const formCitas = document.getElementById('form');
const btnCitas = document.getElementById('button');

const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const closeErrorModal = document.getElementById('closeErrorModal');

function limpiarCamposCitas() {
  ['name', 'date', 'time', 'email', 'message'].forEach(id => {
    const field = document.getElementById(id);
    if (field) field.value = '';
  });
}

function abrirModal(modal) {
  if (modal) modal.classList.add('active');
}
function cerrarModal(modal) {
  if (modal) modal.classList.remove('active');
}

if (formCitas && btnCitas) {
  formCitas.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const date = document.getElementById('date')?.value.trim();
    const time = document.getElementById('time')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !date || !time || !email || !message) {
      alert('Debes completar toda tu información ⚠');
      return;
    }

    btnCitas.value = 'Enviando...';

      const serviceID = 'default_service';
      const templateID = 'template_33jcool';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btnCitas.value = 'Agendar cita';
        abrirModal(successModal);
        limpiarCamposCitas();
      })
      .catch((err) => {
        btnCitas.value = 'Agendar cita';
        abrirModal(errorModal);
        console.error(err);
      });
  });
}

if (closeSuccessModal) {
  closeSuccessModal.addEventListener('click', () => cerrarModal(successModal));
}
if (closeErrorModal) {
  closeErrorModal.addEventListener('click', () => cerrarModal(errorModal));
}

terms.addEventListener("change", () => {
  showTerms.classList.toggle("active");
});

const in_btn = document.querySelector(".in_btn");

btnCitas.disabled = true;
btnCitas.style.opacity = "55%";

bterms.addEventListener("click", () => {
  btnCitas.style.opacity = "1";
  showTerms.style.display = "none";
  btnCitas.disabled = false;
});