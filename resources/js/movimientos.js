const MOVIMINETOS = {
    peon: (celda, tablero) => {
        let ficha = celda.ficha;
        let coord = celda.coordenadas;
        let movimientos = [];
        let m1, m2, m3, m4;

        if (ficha.color === 1) {

            if (coord.y + 1 <= 7) {
                m1 = tablero[coord.y + 1][coord.x];

                if (coord.y + 2 <= 7) m2 = tablero[coord.y + 2][coord.x];
                if (coord.x + 1 <= 7) m3 = tablero[coord.y + 1][coord.x + 1];
                if (coord.x - 1 >= 0) m4 = tablero[coord.y + 1][coord.x - 1];

            }


        } else {
            if (coord.y - 1 >= 0) {
                m1 = tablero[coord.y - 1][coord.x];

                if (coord.y - 2 >= 0) m2 = tablero[coord.y - 2][coord.x];
                if (coord.x + 1 <= 7) m3 = tablero[coord.y - 1][coord.x + 1];
                if (coord.x - 1 >= 0) m4 = tablero[coord.y - 1][coord.x - 1];

            }
        }

        if (m1 && !m1.ficha) movimientos.push(m1);

        if (m2 && !m1.ficha && ((coord.y === 1 && ficha.color === 1) || coord.y === 6 && ficha.color === 0) && !m2.ficha) movimientos.push(m2);

        if (m3 && m3.ficha && m3.ficha.color !== ficha.color) movimientos.push(m3);

        if (m4 && m4.ficha && m4.ficha.color !== ficha.color) movimientos.push(m4);

        return movimientos;
    },

    torre: (celda, tablero) => {
        let ficha = celda.ficha;
        let coord = celda.coordenadas;
        let movimientos = [];

        let exist = v => v >= 0 && v <= 7;
        let ejeX = (multi = 1)=>{
            for (let i = 1; i <= 7; i++) {
                let y = coord.y + (i * multi);
                if (exist(y)) {
                    let c = tablero[y][coord.x];
                    if (!c.ficha) {
                        movimientos.push(c);
                        continue;
    
                    } else if (c.ficha && c.ficha.color !== ficha.color) {
                        movimientos.push(c);
                    }
    
                    break;
                }
                break;
            }
        }

        let ejeY = (multi = 1) =>{
            for (let i = 1; i <= 7; i++) {
                let x = coord.x + (i * multi);
                if (exist(x)) {
                    let c = tablero[coord.y][x];
                    if (!c.ficha) {
                        movimientos.push(c);
                        continue;
    
                    } else if (c.ficha && c.ficha.color !== ficha.color) {
                        movimientos.push(c);
                    }
    
                    break;
                }
                break;
            }
        } 

        ejeX(1);
        ejeX(-1);
        ejeY(1);
        ejeY(-1);

        return movimientos;
    },
    alfil: (celda, tablero) => [],
    caballo: (celda, tablero) => [],
    reina: (celda, tablero) => [],
    rey: (celda, tablero) => []
}