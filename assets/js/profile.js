// Profile page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Verificar autenticación
  const user = window.GZAuth.currentUser();
  if (!user) {
    alert('Debes iniciar sesión para acceder al perfil');
    window.location.href = 'login.html';
    return;
  }

  // Configurar header dinámico
  const authDiv = document.getElementById('auth-buttons');
  authDiv.innerHTML = `
    <button class="cart-btn" onclick="location.href='carrito.html'">🛒 Carrito</button>
    <button class="btn-secondary" onclick="location.href='perfil.html'">👤 Perfil</button>
    <button class="btn-secondary" id="logout">Salir</button>`;
  document.getElementById('logout').onclick = () => { 
    GZAuth.logout(); 
    window.location.href = '../index.html'; 
  };

  // Cargar información del usuario
  loadUserInfo(user);
  
  // Configurar navegación del sidebar
  setupSidebarNavigation();
});

function loadUserInfo(user) {
  // Generar iniciales para el avatar
  const initials = `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
  document.getElementById('user-initials').textContent = initials;
  
  // Actualizar campos de información
  document.getElementById('full-name').value = `${user.nombre} ${user.apellido}`;
  document.getElementById('user-email').value = user.email;
}

function setupSidebarNavigation() {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const contentSections = document.querySelectorAll('.content-section');

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetSection = item.getAttribute('data-section');
      
      // Remover clase active de todos los items
      sidebarItems.forEach(si => si.classList.remove('active'));
      contentSections.forEach(cs => cs.classList.remove('active'));
      
      // Agregar clase active al item clickeado
      item.classList.add('active');
      
      // Mostrar la sección correspondiente
      const targetElement = document.getElementById(`${targetSection}-section`);
      if (targetElement) {
        targetElement.classList.add('active');
      }
    });
  });
}

function toggleEditMode() {
  const inputs = document.querySelectorAll('#personal-section .info-input');
  const editBtn = document.querySelector('.edit-btn');
  
  inputs.forEach(input => {
    if (input.id !== 'registration-date' && input.type !== 'password') { // No permitir editar fecha de registro ni contraseñas
      input.readOnly = !input.readOnly;
    }
  });
  
  if (editBtn.textContent.includes('Editar')) {
    editBtn.innerHTML = '<span class="edit-icon">💾</span> Guardar';
    editBtn.onclick = saveProfile;
  } else {
    editBtn.innerHTML = '<span class="edit-icon">✏️</span> Editar';
    editBtn.onclick = toggleEditMode;
  }
}

function saveProfile() {
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('user-email').value;
  
  // Validaciones básicas
  if (!fullName || !email) {
    alert('Nombre y correo son obligatorios');
    return;
  }
  
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert('Por favor ingresa un correo válido');
    return;
  }
  
  // Simular guardado
  alert('Perfil actualizado correctamente');
  toggleEditMode();
}

function changePassword() {
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-new-password').value;
  
  // Validaciones
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert('Todos los campos son obligatorios');
    return;
  }
  
  if (newPassword.length < 8) {
    alert('La nueva contraseña debe tener al menos 8 caracteres');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }
  
  // Simular cambio de contraseña
  alert('Contraseña cambiada correctamente');
  
  // Limpiar campos
  document.getElementById('current-password').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-new-password').value = '';
}

function toggleSetting(setting) {
  // Simulación de configuración
  const settings = {
    notifications: 'Configuración de notificaciones abierta',
    privacy: 'Configuración de privacidad abierta',
    security: 'Configuración de seguridad abierta',
    preferences: 'Configuración de preferencias abierta'
  };
  
  alert(settings[setting] || 'Configuración no disponible');
}
