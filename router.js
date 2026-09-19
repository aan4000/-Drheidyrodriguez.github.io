// router.js — Navegación suave (SPA-lite)
// Al hacer clic en un enlace interno del sitio se obtiene la página destino
// con fetch y se intercambia SOLO el contenido del <body> (y las hojas de
// estilo locales) manteniendo la barra de navegación que ya está inyectada
// por load-nav.js. Así la barra nunca se vuelve a cargar ni parpadea al
// navegar entre pestañas. Si la página se abre desde el disco (file://)
// o el fetch falla, se mantiene la navegación normal recargando la página.

(function () {
  "use strict";

  // Scripts "núcleo" que ya están activos y no deben volver a ejecutarse:
  // la propia barra (load-nav.js) y el tema oscuro (darkmode.js).
  var CORE_SCRIPTS = ["load-nav.js", "darkmode.js"];

  function isLocalUrl(href) {
    if (!href) return false;
    // URLs absolutas (http, https, //) o especiales NO son locales.
    return !/^(https?:)?\/\//.test(href) && !/^(javascript:|mailto:|tel:|data:|#)/.test(href);
  }

  function fileName(href) {
    var a = href.split("/");
    return a[a.length - 1].split("?")[0];
  }

  // Solo funciona servido por HTTP (local o público). En file:// el fetch
  // está bloqueado: dejamos la navegación normal.
  if (location.protocol === "file:") return;

  // ------------------------------------------------------------------ NAVEGAR
  function navigate(url, options) {
    options = options || {};
    var push = options.push !== false;
    var doc;

    return fetch(url, { cache: "no-cache", credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (html) {
        doc = new DOMParser().parseFromString(html, "text/html");
        applyHead(doc);
        swapBody(doc);
        return ensureEmailJS(doc);
      })
      .then(function () {
        return runPageScripts(doc);
      })
      .then(function () {
        if (push) history.pushState({}, "", url);
        if (window.setActiveNav) window.setActiveNav();
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      })
      .catch(function (err) {
        // Ante cualquier error (offline, fallo de red) recarga normal.
        console.warn("[router] navegación suave no disponible: ", err);
        location.href = url;
      });
  }

  // --------------------------------------------------------------------- HEAD
  function applyHead(doc) {
    document.title = doc.title || document.title;

    if (doc.documentElement.getAttribute("lang")) {
      document.documentElement.setAttribute("lang", doc.documentElement.getAttribute("lang"));
    }

    // Meta description
    var metaDesc = doc.querySelector('meta[name="description"]');
    var curDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && metaDesc.getAttribute("content")) {
      if (!curDesc) {
        curDesc = document.createElement("meta");
        curDesc.setAttribute("name", "description");
        document.head.appendChild(curDesc);
      }
      curDesc.setAttribute("content", metaDesc.getAttribute("content"));
    }

    // Hojas de estilo: intercambiar las locales y deduplicar las remotas.
    var fetched = Array.prototype.slice.call(
      doc.querySelectorAll('link[rel="stylesheet"]')
    ).map(function (l) { return l.getAttribute("href"); });

    var linkHrefs = Array.prototype.slice.call(
      document.querySelectorAll('link[rel="stylesheet"]')
    ).map(function (l) { return l.getAttribute("href"); });

    // Quitar hojas locales que la página destino ya no usa.
    linkHrefs.forEach(function (href) {
      if (!isLocalUrl(href)) return;
      if (fetched.indexOf(href) === -1) {
        document.querySelectorAll('link[rel="stylesheet"]').forEach(function (l) {
          if (l.getAttribute("href") === href) l.remove();
        });
      }
    });

    // Añadir las que faltan (locales de la página destino y remotas nuevas).
    var ready = Array.prototype.slice.call(
      document.querySelectorAll('link[rel="stylesheet"]')
    ).map(function (l) { return l.getAttribute("href"); });

    fetched.forEach(function (href) {
      if (!href) return;
      if (ready.indexOf(href) !== -1) return;
      var link = doc.querySelector('link[rel="stylesheet"][href="' + href + '"]');
      var clone = link ? link.cloneNode(true) : null;
      if (clone) document.head.appendChild(clone);
    });
  }

  // ------------------------------------------------------------------- BODY
  function swapBody(doc) {
    var nav = document.getElementById("nav-container");

    // La barra fija se conserva; se guarda su referencia antes de limpiar.
    if (nav) nav.remove();

    Array.prototype.slice.call(document.body.childNodes).forEach(function (n) {
      document.body.removeChild(n);
    });

    document.body.className = doc.body.className || "";

    // Contenido nuevo: todo el cuerpo de la página destino EXCEPTO la barra
    // (ya inyectada) y los <script> (se ejecutan después, ver runPageScripts).
    var fragment = document.createDocumentFragment();
    Array.prototype.slice.call(doc.body.childNodes).forEach(function (node) {
      if (!node) return;
      if (node.nodeType !== 1) return; // solo elementos (se descartan textos/vaclos)
      if (node.id === "nav-container") return;
      if (node.tagName === "SCRIPT" || node.tagName === "STYLE") return;
      fragment.appendChild(node);
    });

    // Algunas páginas llevan <script> anidados dentro de su contenido
    // (p. ej. citas.html); se quitan para que el núcleo no se duplique.
    Array.prototype.slice.call(fragment.querySelectorAll("script")).forEach(function (s) {
      s.remove();
    });

    document.body.insertBefore(nav, document.body.firstChild); // barra arriba
    document.body.appendChild(fragment);
  }

  // ---------------------------------------------------------------- SCRIPTS
  // Los scripts de página (script.js, funtions.js, carousel.js, reveal.js)
  // se vuelven a ejecutar tras el intercambio, pero aislados en una función
  // propia para no duplicar variables globales (const/let del mismo nombre).
  function runPageScripts(doc) {
    var toRun = [];
    var seen = {};

    Array.prototype.slice.call(doc.querySelectorAll("body script[src]")).forEach(function (s) {
      var src = s.getAttribute("src");
      if (!isLocalUrl(src)) return;
      var base = fileName(src);
      if (CORE_SCRIPTS.indexOf(base) !== -1) return;
      if (seen[base]) return;
      seen[base] = true;
      toRun.push(src);
    });

    // reveal.js vive en el <head> de index.html.
    Array.prototype.slice.call(doc.querySelectorAll("head script[src]")).forEach(function (s) {
      var src = s.getAttribute("src");
      if (!isLocalUrl(src)) return;
      var base = fileName(src);
      if (base === "reveal.js" && !seen[base]) {
        seen[base] = true;
        toRun.push(src);
      }
    });

    return toRun.reduce(function (chain, src) {
      return chain.then(function () { return loadAndRun(src); });
    }, Promise.resolve());
  }

  function loadAndRun(src) {
    return fetch(src, { cache: "no-cache", credentials: "same-origin" })
      .then(function (res) { return res.text(); })
      .then(function (code) {
        var script = document.createElement("script");
        // IIFE aislada: evita choques de const/let entre ejecuciones.
        script.textContent = ";(function () {\n" + code + "\n})();";
        document.body.appendChild(script);
      });
  }

  // -------------------------------------------------- EMAILJS (contacto/citas)
  // Las páginas de formulario necesitan emailjs: si aún no está cargado,
  // se añade su CDN y se inicializa con la misma clave pública del head.
  function ensureEmailJS(doc) {
    var needsEmail =
      !!doc.querySelector('script[src*="emailjs"]') ||
      /emailjs\.init\(/.test(doc.documentElement.outerHTML);

    if (!needsEmail || window.emailjs) return Promise.resolve();

    var keyMatch = /emailjs\.init\(\s*['"]([^'"]+)['"]\s*\)/.exec(
      doc.documentElement.outerHTML
    );
    var key = keyMatch ? keyMatch[1] : null;

    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.onload = function () {
        try {
          if (key && window.emailjs) window.emailjs.init(key);
        } catch (e) { console.warn(e); }
        resolve();
      };
      s.onerror = function () { resolve(); };
      document.head.appendChild(s);
    });
  }

  // -------------------------------------------------------- ENLAZADO (clics)
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (e.button !== 0) return;

    var anchor = e.target.closest ? e.target.closest("a[href]") : null;
    if (!anchor) return;

    var href = anchor.getAttribute("href");
    if (!href) return;
    if (!isLocalUrl(href)) return;
    if (/^(#|javascript:)/
        .test(href)) return;

    var target = anchor.target;
    if (target && target !== "_self") return;

    var url;
    try {
      url = new URL(href, location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== location.origin) return;

    // Ya estamos en esa página: no hacer nada.
    if (url.pathname + url.search === location.pathname + location.search) return;

    e.preventDefault();
    navigate(href, { push: true });
  });

  // Avance/retroceso del navegador (history).
  window.addEventListener("popstate", function () {
    // Evita quedarse en la misma URL al volver atrás tras un push fallido.
    navigate(location.pathname + location.search, { push: false });
  });
})();