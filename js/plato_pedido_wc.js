document.addEventListener
(
  "DOMContentLoaded",
  function()
  {
    class PlatoPedidoElement extends HTMLElement
    {
      constructor()
      {
        super();
        
        // Creamos el shadow DOM
        let shadow = this.attachShadow({ mode: 'open' });
        
        // Recuperamos los atributos
        let idPlato=this.getAttribute("data-id-plato")||"Id del plato desconocido.";
        let nombrePlato=this.getAttribute("data-nombre-plato")||"Nombre del plato desconocido.";
        let precioPlatoTotal=this.getAttribute("data-precio-plato-total")||'Precio del plato total desconocido.';
        let cantidad=this.getAttribute("data-cantidad-plato")||'Cantidad del plato desconocida.';

    
        // Definimos la template (HTML + CSS)
        let template = document.createElement('template');
        template.innerHTML=
        `
          <style>
            @import url('./bootstrap/css/bootstrap.css');
          </style>

          <li class="list-group-item mb-2">
            <div class="d-flex justify-content-between">
              <span>${nombrePlato}</span>
              <button type="button" class="btn btn-sm btn-danger botonQuitar">
                -
              </button>
              <span>${cantidad}</span>
              <button type="button" class="btn btn-sm btn-success botonAniadir">
                +
              </button>
              <span>${precioPlatoTotal} €</span>
            </div>
          </li>
        `;
        
        // Añadimos el contenido de la template (clonándola) al shadow DOM
        shadow.appendChild(template.content.cloneNode(true));

        // Añadir el event listener para el botón
        shadow.querySelector('.botonAniadir').addEventListener
        (
          'click',()=>
          {
            this.dispatchEvent
            (
              new CustomEvent
              (
                'add-plato-del-mismo-tipo',
                {
                  detail:
                  {
                    idPlato:idPlato,
                    cantidadPlato:Number(cantidad)+1
                  },
                  bubbles: true,
                  composed: true
                }
              )
            );
          }
        );

        shadow.querySelector('.botonQuitar').addEventListener
        (
          'click',()=>
          {
            this.dispatchEvent
            (
              new CustomEvent
              (
                'restar-plato-del-mismo-tipo',
                {
                  detail:
                  {
                    idPlato:idPlato,
                    cantidadPlato:Number(cantidad)-1
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
    customElements.define('plato-pedido-element', PlatoPedidoElement);
  }
);