// Blog page functionality
document.addEventListener("DOMContentLoaded", () => {
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
});
