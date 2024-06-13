document.addEventListener
(
  "DOMContentLoaded",
  function()
  {
    class PedidoElement extends HTMLElement {
      constructor()
      {
        super();
        
        // Creamos el shadow DOM
        let shadow = this.attachShadow({ mode: 'open' });
        // Crea un arreglo para almacenar los detalles del plato
        this.platos=[];
        
        // Definimos la template (HTML + CSS)
        let template = document.createElement('template');
        template.innerHTML=
        `
          <style>
            @import url('./bootstrap/css/bootstrap.css');
          </style>

          <p class="text-success fw-bold">
            "No se han agregado platos al pedido."
          </p>
        `;
        
        // Añadimos el contenido de la template (clonándola) al shadow DOM
        shadow.appendChild(template.content.cloneNode(true));
      }
    
      connectedCallback()
      {
        window.addEventListener
        (
          'add-plato',
          (event) =>
          {
            let {idPlato,nombrePlato,precioPlato } = event.detail;

            if(this.platos.find(Plate=>Plate.getAttribute("data-id-plato")===idPlato)===undefined)
            {
              //Crar una instancia del web component plato_reducido_wc.js
              let platoPedido=document.createElement('plato-pedido-element');
              platoPedido.setAttribute("data-id-plato",idPlato);
              platoPedido.setAttribute("data-nombre-plato",nombrePlato);
              platoPedido.setAttribute("data-precio-plato-unidad",precioPlato);
              platoPedido.setAttribute("data-precio-plato-total",precioPlato);
              platoPedido.setAttribute("data-cantidad-plato",1);
              //platoPedido.setAttribute("hidden","false");
              platoPedido.setAttribute("class","platoDePedido");

              //Empuja los detalles del nuevo plato al arreglo
              this.platos.push(platoPedido);
    
              //Actualiza la plantilla dinámicamente
              this.updateTemplate();
            }
            else
            {
              let plato;
              
              plato=this.platos.find(Plate=>Plate.getAttribute("data-id-plato")===idPlato);

              plato.setAttribute("data-cantidad-plato",parseInt(plato.getAttribute("data-cantidad-plato"))+1);
              plato.setAttribute("data-precio-plato-total",parseFloat(plato.getAttribute("data-precio-plato-unidad"))*parseInt(plato.getAttribute("data-cantidad-plato")));

              this.updateTemplate();
            }
          }
        );

        window.addEventListener
        (
          'add-plato-del-mismo-tipo',
          (event) =>
          {
            let {idPlato,cantidadPlato} = event.detail;

            let plato;
            plato=this.platos.find(Plate=>Plate.getAttribute("data-id-plato")===idPlato);

            plato.setAttribute("data-cantidad-plato",cantidadPlato);
            plato.setAttribute("data-precio-plato-total",parseFloat(plato.getAttribute("data-precio-plato-unidad"))*parseInt(plato.getAttribute("data-cantidad-plato")));

            this.updateTemplate();
          }
        );

        window.addEventListener
        (
          'restar-plato-del-mismo-tipo',
          (event) =>
          {
            let {idPlato,cantidadPlato} = event.detail;
            let platoAEliminar;
            let plato;

            plato=this.platos.find(Plate=>Plate.getAttribute("data-id-plato")===idPlato);

            plato.setAttribute("data-cantidad-plato",cantidadPlato);
            plato.setAttribute("data-precio-plato-total",parseFloat(plato.getAttribute("data-precio-plato-unidad"))*parseInt(plato.getAttribute("data-cantidad-plato")));

            platoAEliminar=this.platos.find(Plate=>Number(Plate.getAttribute("data-cantidad-plato"))===0);
            if(platoAEliminar!==undefined)
            {
              this.platos.splice(this.platos.indexOf(platoAEliminar),1);
            }
            
            this.updateTemplate();
          }
        );

      }
    
      updateTemplate()
      {
        // Limpia el contenido existente
        this.shadowRoot.innerHTML = '';
        let template = document.createElement('template');

        if(this.platos.length===0)
        {
          template.innerHTML=
          `
            <style>
              @import url('./bootstrap/css/bootstrap.css');
            </style>

            <p class="text-success fw-bold">
              "No se han agregado platos al pedido."
            </p>
          `;
        }
        else
        {
          // Crea la estructura de la plantilla
          template.innerHTML=
          `
            <style>
              @import url('./bootstrap/css/bootstrap.css');
            </style>
      
            <div class="container">
              <ul class="list-group"></ul>
            </div>

            <div class="container">
              <ul class="list-group">
                <li class="list-group-item mb-2">
                  <div class="d-flex justify-content-end">
                    <span id="total" class="text-light"></span>
                  </div>
                </li>
              </ul>
            </div>
          `;
    
          // Obtiene el elemento de la lista de la plantilla
          let list = template.content.querySelector('ul');
          let spantotal = template.content.querySelector('#total');
          let total=0;

          // Llena la lista con platos del arreglo
          for (let i = 0; i<this.platos.length; i++)
          {
            list.appendChild(this.platos[i]);
            //console.log(this.platos[i].getAttribute("data-precio-plato-total"));
            total=Number(total)+Number(this.platos[i].getAttribute("data-precio-plato-total"));
            spantotal.innerHTML="Total: "+total+" €";
          }
        }

        // Agrega la plantilla actualizada al shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
    }

    // Definir el elemento personalizado
    customElements.define('pedido-element', PedidoElement);
  }
);