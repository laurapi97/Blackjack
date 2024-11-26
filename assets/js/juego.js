


// patron módulo

(() => {
    'use strict'


    let deck = []; // arreglo de cartas

    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador=0,
    //     puntosComputadora=0;
    let puntosJugadores = [];



    // REFERENCIAS DE HTML

    const btnPedir = document.querySelector('#btnPedir'),
         btnDetener = document.querySelector('#btnDetener'),
         btnNuevo = document.querySelector('#btnNuevo');



    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('.divCartas');



    // esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => { // crea un arreglo con el numero de jugadores [0,0], el primero es el jugador y el segundo la computadora
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

    };

    // Crea un nuevo deck 
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) { // para las cartas que van del 2 al 9
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) { // para las cartas especiales como la A, J,Q y <K
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        console.log({deck}); 
        // shufle
        return _.shuffle(deck);

    };


   
    // PEDIR CARTA //
    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw new Error('No hay más cartas en el deck');
        }
        return deck.pop();
    };

    // JUGADOR

    const valorCarta = (carta) => {


        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    };




    // turno: 0 es primer jugador y el ultimo será la computadora
    const acumularPuntos = (carta, turno) => {

        // incrementar los puntos de la computadora
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        //muestra el puntaje en el html de los puntos del jugador
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }


    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; // se usa backticks para insertar una función dentro, en donde se llama el valor de la carta
        imgCarta.classList.add('carta'); // añade el estilo de la clase carta
        divCartasJugadores[turno].append(imgCarta);
        // insertarla en el html dependiento el turno
    }


    // COMPUTADORA //

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            // se hace esto para el turno de la computadora usando la función acumular puntos
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);

            //mostrar las cartas y crearlas en el html
            // <img class="carta" src="assets/cartas/2C.png"></img>cons
            // const imgCarta = document.createElement('img');
            // imgCarta.src=`assets/cartas/${carta}.png`; // se usa backticks para insertar una función dentro, en donde se llama el valor de la carta
            // imgCarta.classList.add('carta'); // añade el estilo de la clase carta

            // // insertarla en el html
            // divCartasComputador.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => { // funcion o callback que se manda como argumento en una x cantidad de tiempo

            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :( ');

            } else if (puntosMinimos > 21) {
                alert('Computadora gana');

            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100);

    };




    // Eventos
    // referencia para el boton pedir y evento que escucha 

    btnPedir.addEventListener('click', () => {   // CALLBACK
        const carta = pedirCarta();
        //para llamar la función en el turno del jugador 1
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);
        //mostrar las cartas y crearlas en el html


        //Controlar los puntos
        if (puntosJugador > 21) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            alert('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        }


    });


    // boton detener

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);

    });

    // boton nuevo juego
    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();
        // deck =[];
        // deck = crearDeck();



        // puntosJugador =0;
        // puntosComputadora=0;

        // puntosHtml[0].innerText=0;
        // puntosHtml [1].innerText=0;


        // divCartasComputador.innerHTML='';
        // divCartasJugador.innerHTML= '';
        // btnPedir.disabled=false;
        // btnDetener.disabled=false;


    });





})(); // esto indica que la función puede ser auto invocada






// 2C = 2 de tréboles o two of clubs
// 2D= 2 de tréboles o two of diamonds
// 2H = 2 de tréboles o two of hearts
// 2S = 2 de tréboles o two of espadas

