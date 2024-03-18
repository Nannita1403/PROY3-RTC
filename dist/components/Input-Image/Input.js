import { showGallery } from "../Card/Card";
import "./Input.css";

// Func = buscar fotos en el input "Buscar" 
export const inputWord = async (section) => {
  // Selecciono el input
  const inputHTML = document.querySelector("#buscar");

  // Variables para Masonry y busqueda (word)
  let masonry;
  let word = "";

  // Escuchar el evento 'keyup' en el input
  inputHTML.addEventListener("keyup", async (e) => {
      try {
          // Verificar si presiono 'Enter'
          if (e.key === "Enter") {
              word = e.target.value;

              // OPCION = Cuando no hay palabra (está vacía)= mostrar la galería predeterminada y salir
              if (word === "") {
                  await showGallery(section);
                  return;
              }

              // Array para almacenar resultados de la búsqueda
              let allResults = [];

              // Peticion a la API para resultados en varias páginas
              for (let page = 1; page <= 3; page++) {
                  const newImages = await fetch(
                      `https://api.unsplash.com/search/photos?query=${word}&client_id=Apv4rswnoZ0Lp7xGFFJbnS520XpHA1J1dCSILs53y64&per_page=10&page=${page}`
                  );
                  const element = await newImages.json();
                  allResults = allResults.concat(element.results);
              }

              // OPCION = Verificar que section //gallery esté definido 
              if (!section) {
                  console.error("La sección no está definida.");
                  return;
              }

              // Limpiar la sección
              section.innerHTML = "";

              // OPCION = Verificar si hay resultados
              if (allResults.length === 0) {
                  const noResultsMessage = document.createElement("h2");
                  noResultsMessage.textContent = "No se encontraron imágenes. Prueba con otra palabra.";
                  section.appendChild(noResultsMessage);
              } else {
                  // Si hay resultado = Creo elementos de img y contenedor para los rts
                  await Promise.all(
                      allResults.map(async (c) => {
                          const imgCon = document.createElement("div");
                          imgCon.classList.add("imgCon");

                          const img = new Image();
                          img.classList.add("photo");
                          img.src = c.urls.small;
                        
                          await new Promise((resolve) => (img.onload = resolve));  // Carga de Img antes de agregarla

                          imgCon.appendChild(img);   // Agrego la img
                          section.appendChild(imgCon);
                      })
                  );

                  // ULT PASO=  Masonry con Img ya cargadas
                  masonry = new Masonry(".gallery", {
                      itemSelector: ".imgCon",
                      ifFitWidth: true,
                      gutter: 0,
                  });
              }
          }
      } catch (error) {
          console.error(error);
      }
  });
};