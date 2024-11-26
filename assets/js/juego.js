


// patron módulo

const miModulo = (() => {
    'use strict';

    /**
    * Representa el mazo de cartas, donde cada elemento es una carta en formato string (ej. 'A', '2', 'J').
    * @type {string[]}eec6b0
    */
    let deck = []; // arreglo de cartas

    /**
    * Representa las letras de las cartas (ej. 'C', D', 'H').
    * @type {string[]}
    */
    const tipos = ['C', 'D', 'H', 'S'];


    /**
    * Representa las letras de las cartas (ej. 'A', 'J', 'Q').
    * @type {string[]}
    */
    const especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador=0,
    //     puntosComputadora=0;
    let puntosJugadores = [];



    // REFERENCIAS DE HTML

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');



    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('small');



    // esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => { // crea un arreglo con el numero de jugadores [0,0], el primero es el jugador y el segundo la computadora
        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

     // elemento html , el elemento html sera igual a 0
        puntosHtml.forEach(elem =>elem.innerText=0);
        divCartasJugadores.forEach(elem=>elem.innerHTML='');


        btnPedir.disabled=false;
        btnDetener.disabled=false;
    }

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
        // console.log({deck}); 
        // shufle
        return _.shuffle(deck);

    }


   
    // PEDIR CARTA //
    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay más cartas en el deck';
           
        }
        return deck.pop();
    }

    // JUGADOR

    const valorCarta = (carta) => {


        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }




    /**
     * turno: 0 es primer jugador y el ultimo será la computadora
     * @param {string} carta - Representa la carta jugada (por ejemplo, 'A', '10', 'K').
     * @param {number} turno - Índice del jugador que está jugando, donde 0 es el primer jugador y el último es la computadora.
     * @returns {number} - Los puntos acumulados del jugador o computadora correspondiente.
     */
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


     /**
         * Desestructuración de arreglos, se extraen los valores de puntosMinimos y puntosComputadra de puntosJugadores
         * @param {number} puntosMinimos
         * @param {number} puntosComputadora
         */
    const determinarGanador = () =>{    
    
        const [puntosMinimos, puntosComputadora] =puntosJugadores;


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

    }
    // COMPUTADORA //

    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();

            // se hace esto para el turno de la computadora usando la función acumular puntos
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);


        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
       
    }




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

        turnoComputadora(puntosJugadores[0]);

    });

    // boton nuevo juego
    // btnNuevo.addEventListener('click', () => {
    
    //     inicializarJuego();

    // });

// Lo que se retorne en este punto dentro del return es público y lo demás privado
    return {

        nuevoJuego: inicializarJuego// nombre de la función fuera del módulo
    };


})(); // esto indica que la función puede ser auto invocada






// 2C = 2 de tréboles o two of clubs
// 2D= 2 de tréboles o two of diamonds
// 2H = 2 de tréboles o two of hearts
// 2S = 2 de tréboles o two of espadas

