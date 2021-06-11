/*
    2C = Two of Clubs
    2D = Two of Diamonds
    2H = Two of Hearts
    2S = Two of Spades
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["J", "Q", "K", "A"];

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

  if(deck.length===0){
    throw 'Error, no hay carts en el deck';
  }
  // el metodo pop() prestablecido de JS nos permite extraer el ultimo elemento de un arreglo
  // dicho elemento se puede igualar a una variable en este caso a la variable "carta"
  // ademas el arreglo "deck" ya no tiene dicho valor en ninguno de sus elementos, puesto que el .pop()
  // tambien realiza esa accion
  let carta = deck.pop();
  console.log(deck);
  console.log(carta);
};
pedirCarta();

