// load-nav.js - Navbar 100% local (funciona al abrir index.html directo desde el disco)

const NAV_HTML = `<!-- El botón móvil  -->
<button id="resMenu" type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
</button>

<nav id="respNav">
    <img class="logo" src="logo_Doctora.jpg" alt="Logo Dra. Heydy Rodriguez">

    <ul class="menu-principal">
        <li><a href="index.html">Página Principal</a></li>

        <li class="tiene-submenu">
            <a href="#">Servicios <span class="chevron">&#9662;</span></a>
            <ul class="submenu detalles">
                <div class="submenu-icos" aria-hidden="true">
                    <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="m538-120 36-348q-45-11-83.5-33T420-555l-13-13-109 108 89 89v251h-60v-224l-65-57 11 94-139 180-48-37 125-161-50-128q-9-23-7-43t13-31l134-132q11-11 23-16t26-5q14 0 27.5 5.5T400-660l65 64q33 32 74 53t88 23h92q15 0 25 10t12 25l30 286q15 5 25 18.5t10 30.5q0 21-15 35.5T770-100q-21 0-36-14.5T719-150q0-15 7-26.5t19-18.5l-7-75H595l-15 150h-42Zm-28-560q-29 0-49.5-20.5T440-750q0-29 20.5-49.5T510-820q29 0 49.5 20.5T580-750q0 29-20.5 49.5T510-680Zm89 370h135l-17-170H616l-17 170Z"/></svg>
                    <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M430.5-755.5Q409-777 409-807t21.5-51.5Q452-880 482-880t51.5 21.5Q555-837 555-807t-21.5 51.5Q512-734 482-734t-51.5-21.5ZM696-80v-209H482q-30 0-51-21t-21-51v-247q0-30 21-51t51-21q23 0 39 9t38 35q42 49 92 82t109 35v60q-51 0-105-25t-104-67v183h133q30 0 51 21t21 51v216h-60Zm-300 0q-83 0-139.5-56.5T200-276q0-68 49.5-125.5T380-468v61q-54 5-86.5 44.5T261-276q0 58 38.5 97t96.5 39q47 0 87-32.5t44-86.5h61q-8 80-66 129.5T396-80Z"/></svg>
                    <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="m490-80-20-398-149-52H40v-60h243l275-197 39 46-149 107 97 34 340-200 35 42-346 251-24 427h-60ZM240.08-647q-30.08 0-51.58-21.42t-21.5-51.5q0-30.08 21.42-51.58t51.5-21.5q30.08 0 51.58 21.42t21.5 51.5q0 30.08-21.42 51.58t-51.5 21.5Z"/></svg>
                    <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M493-490v-400q0-13 8.68-21.5 8.67-8.5 21.5-8.5 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v400h-60Zm-167 0v-360q0-13 8.68-21.5 8.67-8.5 21.5-8.5 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v360h-60ZM495.06-40q-139.94 0-237.5-97T160-374v-396q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v396q0 114.87 79.8 194.43Q379.59-100 494.8-100 610-100 691-180.5 772-261 780-376v-154h-10q-21.25 0-35.62 14.37Q720-501.25 720-480v150H610q-38 0-64 26t-26 64v30h-60v-30q0-63 43.5-106.5T610-390h50v-420q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v232q11-6 24-9t26-3h70v214q-8 141-106.5 238.5T495.06-40ZM530-345Z"/></svg>
                </div>
                <li>Consulta especializada en Ortopedia y Traumatología.</li>
                <li>Evaluación y tratamiento de fracturas y lesiones traumáticas.</li>
                <li>Atención de lesiones deportivas.</li>
                <li>Diagnóstico y manejo del dolor musculoesquelético.</li>
                <li>Tratamiento de tendinitis, bursitis y lesiones de tendones y ligamentos.</li>
                <li>Manejo de artrosis y enfermedades degenerativas.</li>
                <li>Evaluación de lesiones de hombro, codo, muñeca y mano.</li>
                <li>Evaluación de lesiones de cadera, rodilla, tobillo y pie.</li>
                <li>Infiltraciones articulares y de tejidos blandos.</li>
                <li>Valoración preoperatoria y seguimiento postoperatorio.</li>
            </ul>
        </li>

        <li><a href="yo.html">Acerca de mí</a></li>
        <li><a href="about.html">Políticas</a></li>
        <li><a href="contactanos.html">Contáctame</a></li>
    </ul>

    <button id="close" aria-label="Cerrar menú">X</button>

    <button id="themeToggle" type="button" aria-label="Cambiar modo claro/oscuro">
        <svg class="theme-icon icon-dark" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
        <svg class="theme-icon icon-light" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
    </button>

    <!-- MENU RESPONSIVE -->
    <div class="responsive_wrapper">
        <ul class="resp_mobile">
            <li>
                <a href="index.html">
                    <ion-icon class="icn" name="home"></ion-icon>
                    <span class="menu-text">Página principal</span>
                </a>
            </li>

            <li>
                    
                    <a href="yo.html">
                        <ion-icon class="icn" name="briefcase"></ion-icon>
                        <span class="menu-text">Acerca de mí</span>
                    </a>              
                               
                
                    </li>


                
                <li>
                    <a href="about.html">
                        <ion-icon  class="icn"  name="medkit"></ion-icon>
                        <span class="menu-text">Politicas</span>
                    </a>
                </li>
                  
               

                
                <li>
                    <a href="contactanos.html">
                        <ion-icon  class="icn"     name="mail-open"></ion-icon>
                        <span class="menu-text">Contáctame</span>
                    </a>
                </li>



                <li class="tiene-submenu ">
                <a href="#">
                    <ion-icon name="medical"></ion-icon>                
                    <span class="menu-text">Servicios <span class="chevron">&#9662;</span></span>
                
                </a>
                <ul class="submenu  detalles">
                    
                    <div class="submenu-icos" aria-hidden="true">
                        <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="m538-120 36-348q-45-11-83.5-33T420-555l-13-13-109 108 89 89v251h-60v-224l-65-57 11 94-139 180-48-37 125-161-50-128q-9-23-7-43t13-31l134-132q11-11 23-16t26-5q14 0 27.5 5.5T400-660l65 64q33 32 74 53t88 23h92q15 0 25 10t12 25l30 286q15 5 25 18.5t10 30.5q0 21-15 35.5T770-100q-21 0-36-14.5T719-150q0-15 7-26.5t19-18.5l-7-75H595l-15 150h-42Zm-28-560q-29 0-49.5-20.5T440-750q0-29 20.5-49.5T510-820q29 0 49.5 20.5T580-750q0 29-20.5 49.5T510-680Zm89 370h135l-17-170H616l-17 170Z"/></svg>
                        <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M430.5-755.5Q409-777 409-807t21.5-51.5Q452-880 482-880t51.5 21.5Q555-837 555-807t-21.5 51.5Q512-734 482-734t-51.5-21.5ZM696-80v-209H482q-30 0-51-21t-21-51v-247q0-30 21-51t51-21q23 0 39 9t38 35q42 49 92 82t109 35v60q-51 0-105-25t-104-67v183h133q30 0 51 21t21 51v216h-60Zm-300 0q-83 0-139.5-56.5T200-276q0-68 49.5-125.5T380-468v61q-54 5-86.5 44.5T261-276q0 58 38.5 97t96.5 39q47 0 87-32.5t44-86.5h61q-8 80-66 129.5T396-80Z"/></svg>
                        <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="m490-80-20-398-149-52H40v-60h243l275-197 39 46-149 107 97 34 340-200 35 42-346 251-24 427h-60ZM240.08-647q-30.08 0-51.58-21.42t-21.5-51.5q0-30.08 21.42-51.58t51.5-21.5q30.08 0 51.58 21.42t21.5 51.5q0 30.08-21.42 51.58t-51.5 21.5Z"/></svg>
                        <svg viewBox="0 -960 960 960" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M493-490v-400q0-13 8.68-21.5 8.67-8.5 21.5-8.5 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v400h-60Zm-167 0v-360q0-13 8.68-21.5 8.67-8.5 21.5-8.5 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v360h-60ZM495.06-40q-139.94 0-237.5-97T160-374v-396q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v396q0 114.87 79.8 194.43Q379.59-100 494.8-100 610-100 691-180.5 772-261 780-376v-154h-10q-21.25 0-35.62 14.37Q720-501.25 720-480v150H610q-38 0-64 26t-26 64v30h-60v-30q0-63 43.5-106.5T610-390h50v-420q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v232q11-6 24-9t26-3h70v214q-8 141-106.5 238.5T495.06-40ZM530-345Z"/></svg>
                    </div>
            <p>
                <li>Consulta especializada en Ortopedia y Traumatología.</li>
                <li>Evaluación y tratamiento de fracturas y lesiones traumáticas.</li>
                <li>Atención de lesiones deportivas.</li>
                <li>Diagnóstico y manejo del dolor musculoesquelético.</li>
                <li>Tratamiento de tendinitis, bursitis y lesiones de tendones y ligamentos.</li>
                <li>Manejo de artrosis y enfermedades degenerativas.</li>
                <li>Evaluación de lesiones de hombro, codo, muñeca y mano.</li>
                <li>Evaluación de lesiones de cadera, rodilla, tobillo y pie.</li>
                <li>Infiltraciones articulares y de tejidos blandos.</li>
                <li>Valoración preoperatoria y seguimiento postoperatorio.</li>
            </p>
                </ul>
            </li>

            
                    

        </ul>
    </div>
</nav>`;

document.addEventListener("DOMContentLoaded", () => {
    const navContainer = document.getElementById("nav-container");
    if (!navContainer) return;

    // Se inyecta directamente desde JS sin fetch ni XHR,
    // así funciona abriendo el archivo localmente (file://).
    navContainer.innerHTML = NAV_HTML;

    const btnMenu = document.getElementById("resMenu");
    const nav = document.getElementById("respNav");
    const close = document.getElementById("close");

    if (btnMenu && nav) {
        btnMenu.addEventListener("click", () => nav.classList.toggle("showMe"));
    }
    if (close && nav) {
        close.addEventListener("click", () => nav.classList.toggle("showMe"));
    }

    // Toggle del submenú "Servicios": un clic despliega el menú y rota la
    // flecha hacia arriba; otro clic lo oculta y la flecha vuelve abajo.
    document.querySelectorAll(".tiene-submenu > a").forEach(function (link) {
        const li = link.parentElement;
        link.addEventListener("click", function (e) {
            e.preventDefault();
            li.classList.toggle("open");
        });
    });
});

// Transición al cambiar entre modos PC / Tablet / Móvil (1.5s)
(function () {
    function getMode() {
        var w = window.innerWidth;
        if (w < 1100) return "mobile";
        if (w <= 1260) return "tablet";
        return "pc";
    }

    var currentMode = getMode();
    var timer;

    function onResize() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            var mode = getMode();
            if (mode !== currentMode) {
                currentMode = mode;
                document.body.classList.remove("bp-transition");
                void document.body.offsetWidth;
                document.body.classList.add("bp-transition");
                setTimeout(function () {
                    document.body.classList.remove("bp-transition");
                }, 1500);
            }
        }, 300);
    }

    window.addEventListener("resize", onResize);
})();