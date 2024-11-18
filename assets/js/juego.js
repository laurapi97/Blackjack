

// 2C = 2 de tréboles o two of clubs
// 2D= 2 de tréboles o two of diamonds
// 2H = 2 de tréboles o two of hearts
// 2S = 2 de tréboles o two of espadas


let deck = []; // arreglo de cartas
const tipos =['C','D','H','S'];
const especiales =['A', 'J','Q','K'];


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
    console.log( deck );


    // shufle
    deck = _.shuffle(deck);
    console.log( deck );

    
}


crearDeck();



