// Index page functionality - productos destacados, blog y eventos
document.addEventListener('DOMContentLoaded', () => {
  // Header dinámico
  const authDiv = document.getElementById('auth-buttons');
  const user = window.GZAuth?.currentUser?.();
  if (user) {
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='pages/carrito.html'">🛒 Carrito</button>
      <button class="btn-secondary" onclick="location.href='pages/perfil.html'">👤 Perfil</button>
      <button class="btn-secondary" id="logout">Salir</button>`;
    document.getElementById('logout').onclick = () => {
      GZAuth.logout();
      location.reload();
    };
  } else {
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='pages/login.html'">Iniciar sesión</button>
      <button class="btn-secondary" onclick="location.href='pages/register.html'">Registrarse</button>`;
  }

  const grid = document.getElementById('products-grid');
  function priceWithDiscount(p) {
    return user && user.email?.endsWith('@duocuc.cl') ? Math.round(p * 0.8) : p;
  }

  // Productos destacados: tomar los primeros 6
  const featured = (window.GZProducts?.list?.() || []).slice(0, 6);
  grid.innerHTML = '';
  featured.forEach(p => {
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
        <div class="product-price">${new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(priceWithDiscount(p.price))}</div>
        <button class="add-to-cart">Agregar al carrito</button>
      </div>`;

    card.onclick = () => {
      location.href = `pages/producto.html?code=${p.code}`;
    };
    card.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        location.href = `pages/producto.html?code=${p.code}`;
      }
    };

    const addBtn = card.querySelector('.add-to-cart');
    addBtn.onclick = (e) => {
      e.stopPropagation();
      const cart = JSON.parse(localStorage.getItem('gz_cart') || '[]');
      const existing = cart.find(i => i.code === p.code);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ code: p.code, name: p.name, price: priceWithDiscount(p.price), qty: 1 });
      }
      localStorage.setItem('gz_cart', JSON.stringify(cart));
      alert('Añadido al carrito');
    };
    grid.appendChild(card);
  });

  // Blog preview (3 cards estáticas basadas en pages/blog.html)
  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid) {
    blogGrid.innerHTML = `
      <article class="blog-card">
        <img src="assets/images/noticia gta6.jpg" alt="GTA VI">
        <div class="blog-info">
          <h3>Rockstar confirma novedades de GTA VI</h3>
          <p>Mapa más grande, mejoras gráficas y nuevas mecánicas que prometen revolucionar la saga.</p>
          <a href="pages/blog.html" class="btn-secondary">Leer más</a>
        </div>
      </article>

      <article class="blog-card">
        <img src="assets/images/noticia ps5pro.jpg" alt="PS5 Pro">
        <div class="blog-info">
          <h3>Rumores sobre la PS5 Pro</h3>
          <p>Posible lanzamiento en 2025 con más potencia, 8K y mejor soporte VR.</p>
          <a href="pages/blog.html" class="btn-secondary">Leer más</a>
        </div>
      </article>

      <article class="blog-card">
        <img src="assets/images/noticia esports.jpg" alt="eSports">
        <div class="blog-info">
          <h3>Los eSports siguen creciendo</h3>
          <p>Récords de audiencia en LoL Worlds y Valorant Champions.</p>
          <a href="pages/blog.html" class="btn-secondary">Leer más</a>
        </div>
      </article>`;
  }

  // Eventos preview (usar mismos textos de eventos.js)
  const eventsGrid = document.getElementById('events-grid');
  if (eventsGrid) {
    const events = [
      { title: 'Torneo Valorant - 5v5', address: 'Av. Los Leones 123, Providencia', time: 'Sáb 21 Sep, 15:00', desc: 'Formato eliminación simple. Premios para Top 3.' },
      { title: 'FIFA 25 Community Cup', address: 'Mall Plaza Egaña, Ñuñoa', time: 'Dom 22 Sep, 12:00', desc: 'Partidos BO1, semifinal y final BO3.' },
      { title: 'Smash Ultimate Meetup', address: 'Casa Gamer, Santiago Centro', time: 'Vie 27 Sep, 18:30', desc: 'Bracket amateur y pro. Amistosos desde las 17:00.' },
    ];
    eventsGrid.innerHTML = '';
    events.forEach(ev => {
      const card = document.createElement('article');
      card.className = 'event-card';
      card.innerHTML = `
        <h3 class="event-title">${ev.title}</h3>
        <ul class="event-meta">
          <li>📍 ${ev.address}</li>
          <li>🕒 ${ev.time}</li>
        </ul>
        <p class="event-desc">${ev.desc}</p>
        <a class="btn-primary" href="pages/eventos.html">Ver detalles</a>
      `;
      eventsGrid.appendChild(card);
    });
  }
});
