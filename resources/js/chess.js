
let chess = new Chess(document.getElementById('chess'));

chess.createTable();

let ficha = new Ficha('peon', 1);

chess.setFicha({y:4, x:5}, ficha);
