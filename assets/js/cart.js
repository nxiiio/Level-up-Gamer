// Cart page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Header dinámico
  const authDiv = document.getElementById('auth-buttons');
  const u = window.GZAuth.currentUser();
  if(u){
    authDiv.innerHTML = `
      <button class="cart-btn">🛒 Carrito</button>
      <button class="btn-secondary" onclick="location.href='perfil.html'">👤 Perfil</button>
      <button class="btn-secondary" id="logout">Salir</button>`;
    document.getElementById('logout').onclick = () => { 
      GZAuth.logout(); 
      location.href = '../index.html'; 
    };
  }else{
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='login.html'">Iniciar sesión</button>
      <button class="btn-secondary" onclick="location.href='register.html'">Registrarse</button>`;
  }

  // Carrito
  const itemsDiv = document.getElementById('items');
  const totalEl = document.getElementById('total');
  const msg = document.getElementById('msg');

  function draw(){
    const cart = JSON.parse(localStorage.getItem('gz_cart')||'[]');
    itemsDiv.innerHTML = '';
    if(cart.length===0){
      itemsDiv.innerHTML = '<p class="product-description">No hay productos en el carrito.</p>';
    }else{
      cart.forEach((it,idx) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div class="cart-item-info">
            <h4>${it.name}</h4>
            <p>Precio: ${new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(it.price)}</p>
          </div>
          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button class="quantity-btn" data-d="-1">-</button>
              <span>${it.qty}</span>
              <button class="quantity-btn" data-d="1">+</button>
            </div>
            <button class="remove-btn">Eliminar</button>
          </div>`;
        row.querySelector('[data-d="-1"]').onclick = () => { updateQty(idx, -1); };
        row.querySelector('[data-d="1"]').onclick = () => { updateQty(idx, 1); };
        row.querySelector('.remove-btn').onclick = () => { removeIdx(idx); };
        itemsDiv.appendChild(row);
      });
    }
    totalEl.textContent = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(cart.reduce((a,i) => a+i.price*i.qty,0));
  }

  function updateQty(i, d){
    const cart = JSON.parse(localStorage.getItem('gz_cart')||'[]');
    cart[i].qty += d;
    if(cart[i].qty<=0) cart.splice(i,1);
    localStorage.setItem('gz_cart', JSON.stringify(cart));
    draw();
  }

  function removeIdx(i){
    const cart = JSON.parse(localStorage.getItem('gz_cart')||'[]');
    cart.splice(i,1);
    localStorage.setItem('gz_cart', JSON.stringify(cart));
    draw();
  }

  document.getElementById('clear').onclick = () => {
    localStorage.removeItem('gz_cart');
    draw();
  };

  document.getElementById('checkout').onclick = () => {
    if(!u){
      msg.style.color = '#ff6b6b';
      msg.textContent = 'Inicia sesión para pagar.';
      return;
    }
    msg.style.color = '#39FF14';
    msg.textContent = 'Pago simulado completado. ¡Gracias por tu compra!';
    localStorage.removeItem('gz_cart');
    draw();
  };

  draw();
});
