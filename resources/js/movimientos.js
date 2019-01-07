const MOVIMINETOS = {
    peon: (celda, tablero) => {
        console.log(celda, tablero);
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

        console.log(m1, m2, m3, m4);

        if (m1 && !m1.ficha) movimientos.push(m1);

        if (m2 && !m1.ficha && ((coord.y === 1 && ficha.color === 1) || coord.y === 6 && ficha.color === 0) && !m2.ficha) movimientos.push(m2);

        if (m3 && m3.ficha && m3.ficha.color !== ficha.color) movimientos.push(m3);

        if (m4 && m4.ficha && m4.ficha.color !== ficha.color) movimientos.push(m4);

        return movimientos;
    },

    torre: (celda) => {},
    alfil: (celda) => {},
    caballo: (celda) => {},
    reina: (celda) => {},
    rey: (celda) => {}
}