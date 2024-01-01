


let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
const small      = document.querySelectorAll('small');

let puntosJugador = 0, puntosComputadora = 0;

// Crear Deck
const crearDeck = () => {

    for ( let i = 2; i <= 10; i++ ) {
        
            for ( let tipo of tipos ) {
                deck.push( i + tipo );
            }

        }

        for ( let tipo of tipos ) {
            for ( let esp of especiales ) {
                deck.push( esp + tipo );
            }
        }

    deck = _.shuffle( deck );

    // console.log( deck );
    
    return deck;

}

crearDeck();


// Tomar carta

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.shift();
    console.log( carta )
    //console.log( deck )
    return carta;

}

// pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring( 0, carta.length - 1 );
    return  ( isNaN( valor ) ) // if
            ? ( valor === 'A' )  // if anidado
            ? 11 // true
            : 10 // false
            : valor * 1; // else
}

const divCartasComputadora = document.querySelector('#jugador-computadora');

const turnoComputadora = ( puntosMinimos ) => {

    do {

        const carta = pedirCarta();
        puntosComputadora += valorCarta( carta );
        small[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/cartas/${ carta }.png`;

        // Crear imagen

        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }

    } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );

    setTimeout(() => {

        if ( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana');
        } else if ( puntosComputadora > 21 ) {
            alert('Jugador gana');
        } else {
            alert('Computadora gana');
        }

    }, 50 );

}

// Referencias HTML

const btnNewGame = document.querySelector('#btnNewGame');
const btnPedir   = document.querySelector('#btnHit');
const btnDetener = document.querySelector('#btnStay');
const divCartasJugador = document.querySelector('#jugador-cartas');


// Eventos

btnNewGame.addEventListener( 'click', () => {
    
    console.clear();

    deck = [];
    deck = crearDeck();

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML     = '';

    puntosComputadora = 0;
    puntosJugador     = 0;

    small[0].innerText = 0;
    small[1].innerText = 0;

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
    
    }
);

btnPedir.addEventListener( 'click', () => {

    const carta = pedirCarta();
    valorCarta( carta );
    
    puntosJugador += valorCarta( carta );
    small[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${ carta }.png`;

    // Crear imagen

    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        turnoComputadora( puntosJugador );
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
    } else if ( puntosJugador === 21 ) {
        turnoComputadora( puntosJugador );
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
    }

});

btnDetener.addEventListener( 'click', () => {

    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );

});

