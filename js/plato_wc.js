document.addEventListener
(
  "DOMContentLoaded",
  function()
  {
    class PlatoElement extends HTMLElement
    {
      constructor()
      {
        super();
        
        // Creamos el shadow DOM
        let shadow = this.attachShadow({ mode: 'open' });
        
        // Recuperamos los atributos
        let idPlato=this.getAttribute("data-id-plato")||"ID del plato desconocido.";
        let nombrePlato=this.getAttribute("data-nombre-plato")||"Nombre del plato desconocido.";
        let imagenPlatoSrc=this.getAttribute("data-imagen-plato-src")||"imagen_no_encontrada.png";
        let precioPlato=this.getAttribute("data-precio-plato")||'Precio del plato desconocido.';
        let alergenosPlato=this.getAttribute("data-alergenos-plato")||"Alergenos del plato desconocidos.";
    
        // Definimos la template (HTML + CSS)
        let template = document.createElement('template');
        template.innerHTML=
        `
          <style>
            @import url('./bootstrap/css/bootstrap.css');
          </style>

          <div class="card text-white bg-dark h-100">
            <div class="card-header text-center">
              <h4 class="card-title">
                ${nombrePlato}
              </h4>
            </div>
            <div class="card-body">
              <img class="w-100" src="./media/imagenes/${imagenPlatoSrc}" alt="Imagen ${nombrePlato}" draggable="false">
              <p class="card-text text-end">
                ${precioPlato} €
              </p>
              <p class="card-text">
                ${alergenosPlato}
              </p>
            </div>
            <div class="card-footer text-end">
              <button type="button" class="btn btn-success">
                Añadir
              </button>
            </div>
          </div>
        `;
        
        // Añadimos el contenido de la template (clonándola) al shadow DOM
        shadow.appendChild(template.content.cloneNode(true));

        // Añadir el event listener para el botón
        shadow.querySelector('button').addEventListener
        (
          'click',()=>
          {
            this.dispatchEvent
            (
              new CustomEvent
              (
                'add-plato',
                {
                  detail:
                  {
                    idPlato:idPlato,
                    nombrePlato:nombrePlato,
                    precioPlato:precioPlato
                  },
                  bubbles: true,
                  composed: true
                }
              )
            );
          }
        );
      }
    }

    // Definir el elemento personalizado
    customElements.define('plato-element', PlatoElement);
  }
);