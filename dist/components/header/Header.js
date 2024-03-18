export const divApp = document.querySelector("#app");
export const header = document.createElement("header");

import showGallery, { section } from "../Card/Card";
import "./Header.css";

// Creacion de elementos del Header
header.innerHTML += `
    <div class="header-links">
        <img class="logo" src="./public/LogoPinterest.svg" alt="Logo Pinterest">
        <p id='inicio'>Inicio</p>
        <p>Explorar</p>
        <p>Crear</p>
    </div>
    <input type="search" name="search" id="buscar" placeholder="Buscar">
    <div class="header-icons">
        <img src="./public/alert-icon.svg" alt="Alerts">
        <img src="./public/messages-icon.svg" alt="Messages">
        <img class="profile" src="https://alexandracriollo.com/wp-content/uploads/2020/12/10-cosas-que-revela-tu-foto-de-perfil-2-1.jpg" alt="Profile">
        <img src="./public/arrow-icon.svg" alt="Arrow">
    </div>
`;
// Exporto func = de refrescar la galeria con click en Boton Inicio
export const refreshGallery = () => {
    const refreshButton = document.getElementById("inicio");
    console.log(refreshButton);
    refreshButton.addEventListener("click", () => {
        section.innerHTML = "";
        showGallery(section);
    });
};