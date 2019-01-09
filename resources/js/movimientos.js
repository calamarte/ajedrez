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

        let ejeX = (multi = 1) => {
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

        let ejeY = (multi = 1) => {
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
    alfil: (celda, tablero) => {
        let ficha = celda.ficha;
        let coord = celda.coordenadas;
        let movimientos = [];

        let calc = (multiY = 1, multiX = 1) => {
            let y, x;
            for (let i = 1; i <= 7; i++) {
                y = coord.y + (i * multiY);
                x = coord.x + (i * multiX);
                if (exist(y) && exist(x)) {
                    let c = tablero[y][x];
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

        calc(1, 1);
        calc(-1, 1);
        calc(1, -1);
        calc(-1, -1);

        return movimientos;
    },
    caballo: (celda, tablero) => {
        let movimientos = [];
        let coordenadas = celda.coordenadas;
        let posiblesCoord = [
            {y:1, x:2},
            {y:2, x:1},
            {y:-1, x:-2},
            {y:-2, x:-1},
            {y:-2, x: 1},
            {y:1, x: -2},
            {y:2, x:-1},
            {y:-1,x:2}
        ];

        let y,x, mv;
        posiblesCoord.forEach((coord) =>{
            y = coordenadas.y + coord.y;
            x = coordenadas.x + coord.x;
            if(exist(y) && exist(x)){
                mv = tablero[y][x];

                if(!mv.ficha || (mv.ficha && mv.ficha.color !== celda.ficha.color)){
                    movimientos.push(mv);
                }

            }
        });

        return movimientos;
    },
    reina: (celda, tablero) => {
        return MOVIMINETOS.alfil(celda, tablero)
            .concat(MOVIMINETOS.torre(celda, tablero));
    },
    rey: (celda, tablero) => []
}

function exist(v) {
    return v >= 0 && v <= 7;
}