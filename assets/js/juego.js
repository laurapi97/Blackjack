

// 2C = 2 de tréboles o two of clubs
// 2D= 2 de tréboles o two of diamonds
// 2H = 2 de tréboles o two of hearts
// 2S = 2 de tréboles o two of espadas


let deck = []; // arreglo de cartas
const tipos =['C','D','H','S'];
const especiales =['A', 'J','Q','K'];

let puntosJugador=0;
    puntosComputadora=0;



// REFERENCIAS DE HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const puntosHtml =document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputador = document.querySelector('#computadora-cartas')

// Crea un nuevo deck 
const crearDeck =() => {

    for(let i = 2 ; i <= 10; i++){ // para las cartas que van del 2 al 9
        
        for (let tipo of tipos){
            deck.push( i + tipo );
        }
    }

    for (let tipo of tipos){ // para las cartas especiales como la A, J,Q y <K
        for (let esp of especiales){
            deck.push( esp + tipo );
        }
    }
    // console.log( deck );


    // shufle
    deck = _.shuffle(deck);
    console.log( deck );
    return deck;

    
}


crearDeck();


//Esta funcion me permite tomar una carta
const pedirCarta =() =>{

    if(deck.length ===0){
        throw ' No hay mas carta en el deck';
    }
    const carta = deck.pop();// elimina la ultima carta del deck y lo regresa
    return carta;

}

                             // JUGADOR

const valorCarta = (carta) =>{

    const valor = carta.substring (0, carta.length - 1); 
  
    return (isNaN (valor) ) ?
            (valor ==='A') ? 11 : 10 
            : valor * 1; 
  }



                            // COMPUTADORA //

const turnoComputadora = (puntosMinimos) =>{
    do {
        const carta = pedirCarta();
    

        // incrementar los puntos de la computadora
        puntosComputadora  = puntosComputadora + valorCarta(carta);
    
        //muestra el puntaje en el html de los puntos del jugador
        puntosHtml [1].innerText = puntosComputadora;
    
    
        //mostrar las cartas y crearlas en el html
        // <img class="carta" src="assets/cartas/2C.png"></img>cons
        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`; // se usa backticks para insertar una función dentro, en donde se llama el valor de la carta
        imgCarta.classList.add('carta'); // añade el estilo de la clase carta
    
        // insertarla en el html
        divCartasComputador.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

   } while( ( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

   setTimeout(()=>{ // funcion o callback que se manda como argumento en una x cantidad de tiempo
 
   if(puntosComputadora === puntosMinimos){
    alert('Nadie gana :( ');

   } else if (puntosMinimos>21){
    alert('Computadora gana');

   }else if (puntosComputadora>21) {
   alert('Jugador gana');
   } else {
    alert('Computadora gana');
   }
}, 10);

}




// Eventos
// referencia para el boton pedir y evento que escucha 

btnPedir.addEventListener('click', () => {   // CALLBACK
    const carta = pedirCarta();
    

    // incrementar los puntos del jugador
    puntosJugador = puntosJugador + valorCarta(carta);

    //muestra el puntaje en el html de los puntos del jugador
    puntosHtml [0].innerText = puntosJugador;


    //mostrar las cartas y crearlas en el html
    // <img class="carta" src="assets/cartas/2C.png"></img>cons
    const imgCarta = document.createElement('img');
    imgCarta.src=`assets/cartas/${carta}.png`; // se usa backticks para insertar una función dentro, en donde se llama el valor de la carta
    imgCarta.classList.add('carta'); // añade el estilo de la clase carta

    // insertarla en el html
    divCartasJugador.append(imgCarta);





    //Controlar los puntos
    if (puntosJugador > 21){
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled=true; 

        turnoComputadora(puntosJugador);
      
    } else if(puntosJugador === 21){
        alert('21, genial!');
        btnPedir.disabled=true;
        btnDetener.disabled=true; 
        turnoComputadora(puntosJugador);

    }

    
});


// boton detener

btnDetener.addEventListener('click', ( )=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true; 

    turnoComputadora(puntosJugador);
    
});

// boton nuevo juego
btnNuevo. addEventListener('click', ( )=>{


    console.clear();
    deck =[];
    deck = crearDeck();


    puntosJugador =0;
    puntosComputadora=0;
    puntosHtml[0].innerText=0;
    puntosHtml [1].innerText=0;

    divCartasComputador.innerHtml ='';
    divCartasJugador.innerHtml ='';
    btnPedir.enabled=true;
    btnDetener.enabled=true;

    


});




