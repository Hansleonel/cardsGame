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
const btnPedir = document.querySelector("#btnPedir");
// seleccionando a un elemento del DOM con el "id" igual a "btnStop"
const btnStop = document.querySelector("#btnStop");
// seleccionando a un elemento del DOM con el "id" igual a "btnNew"
const btnNew = document.querySelector("#btnNew");
// seleccionando a todos los elementos del DOM con la etiqueta "small"
const allSmalls = document.querySelectorAll("small");
// referencia a la ubicacion donde crearemos un nuevo elemento en el DOM
// por hacer referencia al nombre de un ID debemos de usar el character "#"
const divCartasJugador = document.querySelector("#jugador-cartas");
// referencia a la ubicacion donde crearemos un nuevo elemento en el DOM
// en este caso para la PC
const divCartasPC = document.querySelector("#computadora-cartas");

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
    throw "Error, no hay carts en el deck";
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

  // creacion del elemento usando la ubicacion de la constante divCartasJugador
  // devemos de crear el sigueinte elemento "<img class="carta" src="assets/carta/2C.png" >"
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");

  // insersion de elemento creado "imgCarta" dentro de la ubicacion creada como
  // constante
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("error, el puntaje es mas de 21");
    btnPedir.disabled = true;
    btnStop.disabled = true;
    // si el jugador tiene mas de 21 si o si es el turno de la computadora
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, ganaste");
    btnPedir.disabled = true;
    btnStop.disabled = true;
    // si el jugador tiene 21 puntos si o si es el turno de la computadora
    turnoComputadora(puntosJugador);
  }
});

btnStop.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnStop.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNew.addEventListener("click", () => {

  console.clear();

  deck = [];
  deck = crearDeck();

  puntosJugador = 0;
  puntosPC = 0;

  allSmalls[0].innerText = 0;
  allSmalls[1].innerText = 0;

  divCartasJugador.innerHTML = '';
  divCartasPC.innerHTML = '';

  btnPedir.disabled = false;
  btnStop.disabled = false;

})

// Turno computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosPC = puntosPC + valorCarta(carta);
    // insertando el valor de carta dentro de la segunda etiqueta small
    allSmalls[1].innerText = puntosPC;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasPC.append(imgCarta);

    // si puntosMinimos es mayor a 21 solo necesitamos entrar una vez al "do"
    if (puntosMinimos > 21) {
      break;
    }
  } while ((puntosPC < puntosMinimos) && (puntosMinimos <= 21));

  setTimeout(() => {

    if (puntosJugador === puntosPC) {
      alert("empatads 1");
    } else if (puntosMinimos > 21) {
      alert("gana PC 2");
    } else if (puntosPC > 21) {
      alert("gana Jugador 3");
    } else {
      alert("gana PC 4");
    }

  }, 100);

};
