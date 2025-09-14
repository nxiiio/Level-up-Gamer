// Index page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Header dinámico
  const authDiv = document.getElementById('auth-buttons');
  const user = window.GZAuth.currentUser();
  if(user){
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='pages/carrito.html'">🛒 Carrito</button>
      <button class="btn-secondary" onclick="location.href='pages/perfil.html'">👤 Perfil</button>
      <button class="btn-secondary" id="logout">Salir</button>`;
    document.getElementById('logout').onclick = () => { 
      GZAuth.logout(); 
      location.reload(); 
    };
  }else{
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='pages/login.html'">Iniciar sesión</button>
      <button class="btn-secondary" onclick="location.href='pages/register.html'">Registrarse</button>`;
  }

  // Filtros y productos
  const filtersDiv = document.getElementById('filters');
  const grid = document.getElementById('products-grid');
  let active = 'all';

  function drawFilters(){
    filtersDiv.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn' + (active==='all'?' active':'');
    allBtn.textContent = 'Todos';
    allBtn.onclick = () => {active='all'; drawFilters(); drawGrid();};
    filtersDiv.appendChild(allBtn);
    GZProducts.categories().forEach(c => {
      const b = document.createElement('button');
      b.className = 'filter-btn' + (active===c.id?' active':'');
      b.textContent = c.name;
      b.onclick = () => {active=c.id; drawFilters(); drawGrid();};
      filtersDiv.appendChild(b);
    });
  }

  function priceWithDiscount(p){
    return user && user.email.endsWith('@duocuc.cl') ? Math.round(p*0.8) : p;
  }

  function drawGrid(){
    const data = GZProducts.list().filter(p => active==='all' || p.cat===active);
    grid.innerHTML = '';
    data.forEach(p => {
      const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.innerHTML = `
        <div class="product-image">
          <a href="pages/producto.html?code=${p.code}" aria-label="${p.name}" style="display:block;width:100%;height:100%;border-radius:10px;overflow:hidden">
            <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px">
          </a>
        </div>
        <div class="product-info">
          <div class="product-title">
            <a href="pages/producto.html?code=${p.code}" style="color:#fff;text-decoration:none">${p.name}</a>
          </div>
          <div class="product-description">${p.desc}</div>
          <div class="product-price">${new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP'}).format(priceWithDiscount(p.price))}</div>
          <button class="add-to-cart">Agregar al carrito</button>
        </div>`;
      card.onclick = () => {
        location.href = `pages/producto.html?code=${p.code}`;
      };
      card.onkeydown = (e) => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          location.href = `pages/producto.html?code=${p.code}`;
        }
      };

      const addBtn = card.querySelector('.add-to-cart');
      addBtn.onclick = (e) => {
        e.stopPropagation();
        const cart = JSON.parse(localStorage.getItem('gz_cart')||'[]');
        const existing = cart.find(i => i.code===p.code);
        if(existing){ 
          existing.qty += 1; 
        } else { 
          cart.push({code:p.code, name:p.name, price:priceWithDiscount(p.price), qty:1}); 
        }
        localStorage.setItem('gz_cart', JSON.stringify(cart));
        alert('Añadido al carrito');
      };
      grid.appendChild(card);
    });
  }

  drawFilters();
  drawGrid();
});
