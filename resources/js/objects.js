class Coordenadas {
    constructor(y, x) {
        this.y = y;
        this.x = x;
    }
}

class Ficha {

    constructor(tipo, color) {
        this.tipo = tipo;
        this.color = color;
    }

    posiblesMovimientos(celda, tablero) {
        return MOVIMINETOS[this.tipo](celda, tablero);
    }
}

class Celda {

    constructor(element, backgroundColor, coordenadas) {
        this.coordenadas = coordenadas;
        this.tamano;
        this.backgroundColor = backgroundColor;
        this.element = element;
        this.ficha = null;
    }

    setFicha(ficha) {
        if (this.ficha) this.removeFicha();
        this.ficha = ficha;
        let img = this.element.getElementsByTagName('img')[0];
        img.src = 'resources/img/' + this.ficha.tipo + '.png';
        if (this.ficha.color === 0) img.classList.add('invert-color');
    }

    removeFicha() {
        let img = this.element.getElementsByTagName('img')[0];
        img.removeAttribute('src');
        img.removeAttribute('class');

        this.ficha = null;
    }

    posiblesMovimientos(tablero) {
        if (this.ficha) return this.ficha.posiblesMovimientos(this, tablero);
        else return [];
    }

    selectRoute() {
        let color;

        if (this.ficha) color = CONFIG.celda.selectKill;
        else color = CONFIG.celda.selectPosibles;

        this.element.style.backgroundColor = color;
    }

    clearSelect() {
        this.element.style.backgroundColor = this.backgroundColor;
    }

    pop(){
        let ficha = this.ficha;
        this.removeFicha();
        return ficha;
    }
}

class Chess {

    constructor(elemento) {
        this.elemento = elemento;
        this.tablero = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ];
        this.celdaSeleccionada;
        this.cledasRuta = [];
    }

    createTable() {
        let width = parseInt(this.elemento.style.width.split('p')[0]) / 8;

        this.elemento.style.borderWidth = width + 'px';

        let black = true;
        for (let i = 0; i < 8; i++) {
            let blackLine = black;
            for (let k = 0; k < 8; k++) {
                let cell = document.createElement('div');
                cell.appendChild(document.createElement('img'));

                let backgroundColor = blackLine ? CONFIG.celda.negro : CONFIG.celda.blanco;

                cell.id = i + '-' + k + '-cell';
                cell.classList.add('cell');
                cell.style.width = width + 'px';
                cell.style.height = width + 'px';
                cell.style.backgroundColor = backgroundColor;

                this.elemento.appendChild(cell);

                let celda = new Celda(cell, backgroundColor, {
                    y: i,
                    x: k
                })

                let coordenadas = [];
                celda.element.onclick = (e) => {

                    if (!this.celdaSeleccionada && celda.ficha) {
                        this.celdaSeleccionada = celda;
                        this.cledasRuta = coordenadas;
                    } else if (this.cledasRuta.some((c) => JSON.stringify(c) === JSON.stringify(celda))) {
                        this.moverFicha(this.celdaSeleccionada, celda);
                        this.clearRutaSeleccionada();
                        this.cledasRuta = [];
                        this.celdaSeleccionada = null;
                    } else if(JSON.stringify(this.celdaSeleccionada) === JSON.stringify(celda)){
                        this.celdaSeleccionada = null;
                    }

                }

                celda.element.onmouseover = (e) => {
                    if (!this.celdaSeleccionada) {
                        coordenadas = celda.posiblesMovimientos(this.tablero);
                        console.log(coordenadas);

                        coordenadas.forEach((celda) => {
                            celda.selectRoute();
                        });
                    }
                }

                celda.element.onmouseout = (e) => {
                    if (!this.celdaSeleccionada) {
                        coordenadas.forEach((celda) => {
                            celda.clearSelect();
                        });
                    }
                }


                this.tablero[i].push(celda);

                blackLine = !blackLine;
            }
            black = !black;
            blackLine = black;
        }
    }

    setFicha(coordenadas, ficha) {
        this.tablero[coordenadas.y][coordenadas.x].setFicha(ficha);
    }

    clearTablero() {
        this.tablero.forEach((t) => {
            t.forEach((celda) => {
                celda.removeFicha();
            });
        });
    }

    colocarFichas() {
        this.clearTablero();

        let tipos = ['torre', 'caballo', 'alfil', 'reina', 'rey', 'alfil', 'caballo', 'torre'];

        //fichas blancas
        let fila = this.tablero[0];
        for (let i = 0; i < fila.length; i++) {
            fila[i].setFicha(new Ficha(tipos[i], 1));
        }

        fila = this.tablero[1];

        fila.forEach((celda) => {
            celda.setFicha(new Ficha('peon', 1));
        });

        //fichas negras
        fila = this.tablero[7];

        for (let i = 0; i < fila.length; i++) {
            fila[i].setFicha(new Ficha(tipos[i], 0));
        }

        fila = this.tablero[6];

        fila.forEach((celda) => {
            celda.setFicha(new Ficha('peon', 0));
        });
    }

    moverFicha(origen, destino) {
        destino.setFicha(origen.pop());
    }

    clearRutaSeleccionada(){
        this.tablero.forEach((t)=>{
            t.forEach((celda)=>{
                celda.clearSelect();
            });
        });
    }
}