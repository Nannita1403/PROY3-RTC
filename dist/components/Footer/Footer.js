import "./Footer.css";

export const footer = document.createElement("footer");

// Creacion de elementos del Footer
footer.innerHTML = `
    <ul>
        <li>
            <a href="#">Términos del servicio</a>
        </li>
        <li>
            <a href="#">App para iPhone</a>
        </li>
        <li>
            <a href="#">App para Android</a>
        </li>
        <li>
           <a href="#">Política de privacidad</a>
        </li>
        <li>
          <a href="#">Ayuda</a>
     </li>
    </ul>
`;