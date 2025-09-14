// Eventos page functionality (no interactivity on click for now)

document.addEventListener('DOMContentLoaded', () => {
  // Header dinámico
  const authDiv = document.getElementById('auth-buttons');
  const u = window.GZAuth?.currentUser?.();
  if(u){
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='carrito.html'">🛒 Carrito</button>
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

  // Datos estáticos de eventos
  const events = [
    { title: 'Torneo Valorant - 5v5', address: 'Av. Los Leones 123, Providencia', time: 'Sáb 21 Sep, 15:00', desc: 'Formato eliminación simple. Premios para Top 3.' },
    { title: 'FIFA 25 Community Cup', address: 'Mall Plaza Egaña, Ñuñoa', time: 'Dom 22 Sep, 12:00', desc: 'Partidos BO1, semifinal y final BO3.' },
    { title: 'Smash Ultimate Meetup', address: 'Casa Gamer, Santiago Centro', time: 'Vie 27 Sep, 18:30', desc: 'Bracket amateur y pro. Amistosos desde las 17:00.' },
    { title: 'Mario Kart Nitro Night', address: 'Gaming Pub GG EZ, Providencia', time: 'Sáb 28 Sep, 21:00', desc: 'Circuitos seleccionados al azar. Inscripción gratuita.' },
  ];

  const list = document.getElementById('events-list');
  list.innerHTML = '';
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
      <button class="btn-primary" disabled>Próximamente</button>
    `;
    list.appendChild(card);
  });
});
