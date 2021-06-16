/*
    2C = Two of Clubs
    2D = Two of Diamonds
    2H = Two of Hearts
    2S = Two of Spades
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["J", "Q", "K", "A"];

let puntosJugador = 0;
let puntosPC = 0;

// Referencias del HTML
// seleccionando a un elemento del DOM con el "id" igual a "btnPedir"
const btnPedir = document.querySelector('#btnPedir');
// seleccionando a todos los elementos del DOM con la etiqueta "small"
const allSmalls = document.querySelectorAll('small');

// Crear un nunevo Deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  // TODO como vemos una vez que inicialicemos el deck
  // TODO con todos los valores de las cartas posibles
  // TODO nos muestra de manera correcta los valores pero de forma ordenada
  // TODO debemos de combinar esas cartas siempre de manera aleatoria
  // TODO incluso por cada inicializacion
  // TODO para esto haremos uso de la libreria uderscre
  // console.log(deck);

  deck = _.shuffle(deck);

  // TODO mostramos el deck de maneja aleatoria gracias a la funcion shuffle de
  console.log(deck);

  return deck;
};

crearDeck();

// funcion para tomar una carta

const pedirCarta = () => {
    if (deck.length === 0) {
    // el codigo que continue a "throw" no podra ejecutarse, en este caso a mens de que no cumpla
    // con el if condicionl
    throw 'Error, no hay carts en el deck';
  }
  // el metodo pop() prestablecido de JS nos permite extraer el ultimo elemento de un arreglo
  // dicho elemento se puede igualar a una variable en este caso a la variable "carta"
  // ademas el arreglo "deck" ya no tiene dicho valor en ninguno de sus elementos, puesto que el .pop()
  // tambien realiza esa accion
  let carta = deck.pop();
  console.log(deck);
  // console.log(carta);
  // retnr la carta
  return carta;
};

// pedirCarta();

// funcion para obtener el valor de la carta
const valorCarta1 = (carta) => {
  // como sabemos debemos de manejar la variable "carta" recibida en el metodo
  // como un String, es por eso que podemos usar funciones predeterminadas en JS
  // como ".substring(posicionInicial, posicionFnl)"
  // si enviamos el valor de la carta "2D" nos devolera 2
  // si enviamos 10S nos devolera 10, dicho esto devemos de tener en cuenta
  // que dicho valor seguira siendo un string
  const valor = carta.substring(0, carta.length - 1);
  let puntos = 0;

  // para poder determinar si un string puede ser un no number podemos
  // usar la funcion prederterminada de JS "isNaN"
  if (isNaN(valor)) {
    console.log("no es un number");

    // como sabemos solo cartas del tipo JD, AS, entre otras
    // cumplen con la condicion de la funcion predeterminada de JS
    // "isNaN" es por eso que debemos de añadir una nueva condicion
    // recordemos que en este game las letras J,Q,K tienen el valor de 10
    // y el valor para la letra A es 11, es por eso que debemos de usar
    // la siguiente condicion
    puntos = valor === "A" ? 11 : 10;
  } else {
    console.log("si es un number");
    // como mencionamos previamente el valor de "valor"
    // seguira siendo del tipo String para solucionar este problema
    // luego de determinar que si puede contener un number con la condicional
    // y la funcion "isNaN", la forma mas simpliciada seria ser multplicar "valor"
    // por 1
    puntos = valor * 1;
  }

  console.log(puntos);
};

// forma simplificada de la funcion que se encuentra en la parte superior
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// const valor = valorCarta( pedirCarta() );
// console.log({ valor });

// EVENTOS
// la funcion que se envia como argumento a nuestro metodo predeterminado del JS ".addEventListener"
// es tambien conocido como callbck
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  console.log(carta);

  puntosJugador = puntosJugador + valorCarta(carta);

  console.log(puntosJugador);

  // acumulando los puntos dentro del primer elemento del array "allSmalls"
  // que en este caso corresponden a los puntajes del primer jugador
  allSmalls[0].innerText = puntosJugador;
});
