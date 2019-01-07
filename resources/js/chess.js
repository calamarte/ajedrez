let tablero = [[], [], [], [], [], [], [], []];

function Celda(element, backgroundColor, y, x) {
    this.y = y;
    this.x = x;
    this.tamano;
    this.backgroundColor = backgroundColor;
    this.element = element;
    this.ficha;

    this.setFicha = function (ficha) {
        this.ficha = ficha;
        let img = this.element.getElementsByTagName('img')[0];
        img.src = 'resources/img/' + this.ficha.tipo + '.png';
        if (!this.ficha.isWhite) img.classList.add('invert-color');
    }

    this.removeFicha = function () {
        let img = this.element.getElementsByTagName('img')[0];
        img.removeAttribute('src');
        img.removeAttribute('class');

        this.ficha = null;
    }

    this.posiblesMovimientos = function () {
        if (this.ficha) return this.ficha.posiblesMovimientos(this);
        else return [];
    }
    
    this.selectRoute = function () {
        let color;
        
        if(this.ficha) color = 'red';
        else color = 'orange';
        
        this.element.style.backgroundColor = color;
    }
    
    this.clearSelect = function(){
        this.element.style.backgroundColor = this.backgroundColor;
    }
}

function Ficha(tipo, isWhite) {
    this.tipo = tipo;
    this.isWhite = isWhite;

    this.posiblesMovimientos = function (celda) {
        let movimientos = [];
        let m1, m2, m3, m4;
        
        if (isWhite) {
           
            if(celda.y + 1 <= 7){
                m1 = tablero[celda.y + 1][celda.x];

                if(celda.y + 2 <= 7) m2 = tablero[celda.y + 2][celda.x];
                if(celda.x + 1 <= 7) m3 = tablero[celda.y + 1][celda.x + 1];
                if(celda.x - 1 >= 0) m4 = tablero[celda.y + 1][celda.x - 1];

            }                        

            
        } else{
            if(celda.y - 1 >= 0){
                m1 = tablero[celda.y - 1][celda.x];

                if(celda.y - 2 >= 0) m2 = tablero[celda.y - 2][celda.x];
                if(celda.x + 1 <= 7) m3 = tablero[celda.y - 1][celda.x + 1];
                if(celda.x - 1 >= 0) m4 = tablero[celda.y - 1][celda.x - 1];

            }           
        }
        
        if (m1 && !m1.ficha) movimientos.push(m1);

        if (m2 && !m1.ficha && ((celda.y === 1 && isWhite) || celda.y === 6 && !isWhite) && !m2.ficha) movimientos.push(m2);

        if (m3 && m3.ficha && m3.ficha.isWhite !== isWhite) movimientos.push(m3);

        if (m4 && m4.ficha && m4.ficha.isWhite !== isWhite) movimientos.push(m4);

        return movimientos;
    }
}

createTable();

function createTable() {
    let chess = document.getElementById('chess');
    let width = parseInt(chess.style.width.split('p')[0]) / 8;

    chess.style.borderWidth = width + 'px';
    console.log('tamano', width);

    let black = true;
    for (let i = 0; i < 8; i++) {
        let blackLine = black;
        for (let k = 0; k < 8; k++) {
            let cell = document.createElement('div');
            cell.appendChild(document.createElement('img'));
            

            let backgroundColor = blackLine ? 'black' : 'white';

            cell.id = i + '-' + k + '-cell';
            cell.classList.add('cell');
            cell.style.width = width + 'px';
            cell.style.height = width + 'px';
            cell.style.backgroundColor = backgroundColor;

            cell.onclick = (e) => {
                let celda = getCeldaById(cell.id);
                
                if(celda.ficha) celda.removeFicha();
                else celda.setFicha(new Ficha('peon', false));
                
            }

            let coordenadas = [];
            cell.onmouseover = (e) => {
                if(e.target.id) return;
                
                let indice = e.target.parentNode.id.split('-');
                
                
                let celda = tablero[parseInt(indice[0])][parseInt(indice[1])];
                coordenadas = celda.posiblesMovimientos();

                coordenadas.forEach((celda) => {
                    celda.selectRoute();
                });
            }

            cell.onmouseout = (e) => {
                coordenadas.forEach((celda)=>{
                    celda.clearSelect();
                });
            }
            
            

            chess.appendChild(cell);

            tablero[i].push(new Celda(cell, backgroundColor, i, k));

            blackLine = !blackLine;
        }
        black = !black;
        blackLine = black;
    }

    tablero[1].forEach((celda) => {
        celda.setFicha(new Ficha('peon', true));
    });

    tablero[6].forEach((celda) => {
        celda.setFicha(new Ficha('peon', false));
    });

    console.log(tablero);
}

function getCeldaById(stringId){
    let y, x;
    let indice;
    
    indice = stringId.split('-');
    y = parseInt(indice[0]);
    x = parseInt(indice[1]);
    
    return tablero[y][x];
}
