// Catálogo base a partir del PDF del caso
(function(global){
  const categories = [
    {id:'juegos', name:'Juegos de Mesa'},
    {id:'accesorios', name:'Accesorios'},
    {id:'consolas', name:'Consolas'},
    {id:'computadores', name:'Computadores Gamers'},
    {id:'sillas', name:'Sillas Gamers'},
    {id:'mouse', name:'Mouse'},
    {id:'mousepad', name:'Mousepad'},
    {id:'poleras', name:'Poleras Personalizadas'},
    {id:'polerones', name:'Polerones Gamers Personalizados'}
  ];

  const products = [
    {code:'JM001', cat:'juegos', name:'Catan', price:29990, desc:'Clásico de estrategia para 3-4 jugadores.', img:'assets/images/catan.jpg'},
    {code:'JM002', cat:'juegos', name:'Carcassonne', price:24990, desc:'Colocación de losetas. 2-5 jugadores.', img:'assets/images/carcassonne.jpg'},
    {code:'AC001', cat:'accesorios', name:'Control Xbox Series X', price:59990, desc:'Ergonomía y botones mapeables.', img:'assets/images/controlxbox.jpg'},
    {code:'AC002', cat:'accesorios', name:'HyperX Cloud II', price:79990, desc:'Sonido envolvente con micrófono desmontable.', img:'assets/images/hyperx cloud 2.jpg'},
    {code:'CO001', cat:'consolas', name:'PlayStation 5', price:549990, desc:'Nueva generación de Sony.', img:'assets/images/playstation 5.png'},
    {code:'CG001', cat:'computadores', name:'PC Gamer ASUS ROG Strix', price:1299990, desc:'Rendimiento alto para juegos exigentes.', img:'assets/images/pc gamer asus.jpg'},
    {code:'SG001', cat:'sillas', name:'Secretlab Titan', price:349990, desc:'Soporte ergonómico y ajustes finos.', img:'assets/images/secretlab titan.jpg'},
    {code:'MS001', cat:'mouse', name:'Logitech G502 HERO', price:49990, desc:'Sensor de alta precisión y botones programables.', img:'assets/images/logitech g502 hero.jpg'},
    {code:'MP001', cat:'mousepad', name:'Razer Goliathus Extended Chroma', price:29990, desc:'Superficie amplia con RGB.', img:'assets/images/mousepad razer goliathus.jpg'},
    {code:'PP001', cat:'poleras', name:'Polera Level-Up Personalizada', price:14990, desc:'Personaliza con tu gamer tag.', img:'assets/images/polera.png'}
  ];

  function list(){ return products.slice(); }
  function categoriesList(){ return categories.slice(); }

  global.GZProducts = { list, categories: categoriesList };
})(window);
