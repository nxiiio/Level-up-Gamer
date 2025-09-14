// Login page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Header dinámico
  const authDiv = document.getElementById('auth-buttons');
  const u = window.GZAuth.currentUser();
  if(u){
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='carrito.html'">🛒 Carrito</button>
      <button class="btn-secondary" onclick="location.href='perfil.html'">👤 Perfil</button>
      <button class="btn-secondary" id="logout">Salir</button>`;
    document.getElementById('logout').onclick = () => { 
      GZAuth.logout(); 
      location.reload(); 
    };
  }else{
    authDiv.innerHTML = `
      <button class="cart-btn" onclick="location.href='login.html'">Iniciar sesión</button>
      <button class="btn-secondary" onclick="location.href='register.html'">Registrarse</button>`;
  }

  // Form login
  document.getElementById('login-form').addEventListener('submit', function(e){
    e.preventDefault();
    const form = new FormData(e.target);
    const res = window.GZAuth.login(form.get('email').trim().toLowerCase(), form.get('password'));
    const msg = document.getElementById('msg');
    if(!res.success){
      msg.style.color = '#ff6b6b';
      msg.textContent = res.message;
    } else {
      msg.style.color = '#39FF14';
      msg.textContent = 'Sesión iniciada. Redirigiendo al inicio…';
      setTimeout(() => location.href = '../index.html', 700);
    }
  });
});
