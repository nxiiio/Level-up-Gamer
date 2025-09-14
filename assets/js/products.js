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
    {code:'JM001',
      cat:'juegos', 
      name:'Catan', 
      price:29990, 
      desc:'Clásico de estrategia para 3-4 jugadores.', 
      longDescription:`Un clásico juego de estrategia donde los jugadores compiten por colonizar y
                      expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en
                      familia o con amigos.`,
      img:'assets/images/catan.jpg'
    },

    {code:'JM002', 
      cat:'juegos', 
      name:'Carcassonne', 
      price:24990, 
      desc:'Colocación de losetas. 2-5 jugadores.', 
      longDescription:`Un juego de colocación de fichas donde los jugadores construyen el paisaje
                      alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de
                      aprender.`,
      img:'assets/images/carcassonne.jpg'
    },

    {code:'AC001', 
      cat:'accesorios', 
      name:'Control Xbox Series X', 
      price:59990, 
      desc:'Ergonomía y botones mapeables.', 
      longDescription:`Ofrece una experiencia de juego cómoda con
                      botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.`,
      img:'assets/images/controlxbox.jpg'
    },

    {code:'AC002', 
      cat:'accesorios', 
      name:'HyperX Cloud II', 
      price:79990, 
      desc:'Sonido envolvente con micrófono desmontable.', 
      longDescription:`Proporcionan un sonido envolvente de calidad con un
                      micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad
                      durante largas sesiones de juego.`,
      img:'assets/images/hyperx cloud 2.jpg'
    },

    {code:'CO001', 
      cat:'consolas', 
      name:'PlayStation 5', 
      price:549990, 
      desc:'Nueva generación de Sony.',
      longDescription:`La consola de última generación de Sony, que ofrece gráficos
                      impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.`, 
      img:'assets/images/playstation 5.png'
    },

    {code:'CG001', 
      cat:'computadores', 
      name:'PC Gamer ASUS ROG Strix', 
      price:1299990, 
      desc:'Rendimiento alto para juegos exigentes.', 
      longDescription:`Un potente equipo diseñado para los gamers más exigentes,
                      equipado con los últimos componentes para ofrecer un rendimiento excepcional en
                      cualquier juego.`,
      img:'assets/images/pc gamer asus.jpg'
    },

    {code:'SG001', 
      cat:'sillas', 
      name:'Secretlab Titan', 
      price:349990, 
      desc:'Soporte ergonómico y ajustes finos.', 
      longDescription:`Diseñada para el máximo confort, esta silla ofrece un soporte
                      ergonómico y personalización ajustable para sesiones de juego prolongadas.`,
      img:'assets/images/secretlab titan.jpg'
    },

    {code:'MS001', 
      cat:'mouse', 
      name:'Logitech G502 HERO', 
      price:49990, desc:'Sensor de alta precisión y botones programables.', 
      longDescription:`Con sensor de alta precisión y botones
                      personalizables, este mouse es ideal para gamers que buscan un control preciso y
                      personalización.`,
      img:'assets/images/logitech g502 hero.jpg'
    },

    {code:'MP001', 
      cat:'mousepad', 
      name:'Razer Goliathus Extended Chroma', 
      price:29990, desc:'Superficie amplia con RGB.', 
      longDescription:`Ofrece un área de juego amplia con
                      iluminación RGB personalizable, asegurando una superficie suave y uniforme para el
                      movimiento del mouse.`,
      img:'assets/images/mousepad razer goliathus.jpg'
    },

    {code:'PP001', 
      cat:'poleras', 
      name:'Polera Level-Up Personalizada', 
      price:14990, desc:'Personaliza con tu gamer tag.', 
      longDescription:`Una camiseta cómoda y estilizada, con la
                      posibilidad de personalizarla con tu gamer tag o diseño favorito.`,
      img:'assets/images/polera.png'
    }
  ];

  function list(){ return products.slice(); }
  function categoriesList(){ return categories.slice(); }

  global.GZProducts = { list, categories: categoriesList };
})(window);
