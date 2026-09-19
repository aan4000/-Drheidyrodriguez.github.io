@echo off
title Ortopeda - Sitio Web Local
cd /d "%~dp0"

echo ============================================================
echo   Dra. Heydy Rodriguez - Sitio web local
echo   Se abrira el navegador y luego el servidor (no lo cierres)
echo   Cierra esta ventana cuando termines de ver la pagina.
echo ============================================================
echo.

rem --- 1) py launcher (recomendado) ---
where py >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:3000
  py -m http.server 3000
  goto fin
)

rem --- 2) python normal ---
where python >nul 2>nul
if %errorlevel%==0 (
  start "" http://localhost:3000
  python -m http.server 3000
  goto fin
)

echo.
echo Python NO esta instalado en este equipo.
echo.
echo Para ver el sitio necesitas instalar Python (gratis):
echo   1. Abre:  https://www.python.org/downloads/
echo   2. Descarga e instala.
echo   3. IMPORTANTE: marca la casilla "Add Python to PATH".
echo   4. Vuelve a abrir este archivo (doble clic).
echo.
pause
:fin