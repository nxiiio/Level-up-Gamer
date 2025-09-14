// Simple auth utilizando localStorage
(function(global){
  const USERS_KEY = 'gz_users';
  const SESSION_KEY = 'gz_session';

  function readUsers(){
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
  }
  function writeUsers(arr){
    localStorage.setItem(USERS_KEY, JSON.stringify(arr));
  }

  function register({nombre, apellido, email, password, edad, referido}){
    const users = readUsers();
    if(users.some(u=>u.email===email)){
      return {success:false, message:'Ya existe una cuenta con ese correo.'};
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
      return {success:false, message:'Correo inválido.'};
    }
    if(!password || password.length<6){
      return {success:false, message:'La contraseña debe tener al menos 6 caracteres.'};
    }
    if(typeof edad!=='number' || edad<18){
      return {success:false, message:'Debes ser mayor de 18.'};
    }
    const user = {
      id: 'u_'+Date.now(),
      nombre, apellido, email, edad,
      duoc: email.endsWith('@duocuc.cl'),
      referido: referido || null,
      puntos: 0
    };
    users.push(user);
    writeUsers(users);
    return {success:true, user};
  }

  function login(email, password){
    const users = readUsers();
    // Password no persistida por simplicidad. Solo se valida presencia.
    const user = users.find(u=>u.email===email);
    if(!user){
      return {success:false, message:'Usuario no encontrado.'};
    }
    if(!password){ 
      return {success:false, message:'Contraseña requerida.'};
    }
    localStorage.setItem(SESSION_KEY, user.id);
    return {success:true, user};
  }

  function logout(){
    localStorage.removeItem(SESSION_KEY);
  }

  function currentUser(){
    const id = localStorage.getItem(SESSION_KEY);
    if(!id) return null;
    return readUsers().find(u=>u.id===id) || null;
  }

  global.GZAuth = { register, login, logout, currentUser };
})(window);
