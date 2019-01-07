const MOVIMINETOS = {
    peon = (celda) => {
        let movimientos = [];
        let m1, m2, m3, m4;

        if (isWhite) {

            if (celda.y + 1 <= 7) {
                m1 = tablero[celda.y + 1][celda.x];

                if (celda.y + 2 <= 7) m2 = tablero[celda.y + 2][celda.x];
                if (celda.x + 1 <= 7) m3 = tablero[celda.y + 1][celda.x + 1];
                if (celda.x - 1 >= 0) m4 = tablero[celda.y + 1][celda.x - 1];

            }


        } else {
            if (celda.y - 1 >= 0) {
                m1 = tablero[celda.y - 1][celda.x];

                if (celda.y - 2 >= 0) m2 = tablero[celda.y - 2][celda.x];
                if (celda.x + 1 <= 7) m3 = tablero[celda.y - 1][celda.x + 1];
                if (celda.x - 1 >= 0) m4 = tablero[celda.y - 1][celda.x - 1];

            }
        }

        if (m1 && !m1.ficha) movimientos.push(m1);

        if (m2 && !m1.ficha && ((celda.y === 1 && isWhite) || celda.y === 6 && !isWhite) && !m2.ficha) movimientos.push(m2);

        if (m3 && m3.ficha && m3.ficha.isWhite !== isWhite) movimientos.push(m3);

        if (m4 && m4.ficha && m4.ficha.isWhite !== isWhite) movimientos.push(m4);

        return movimientos;
    },

    torre = (celda) => {},
    alfil = (celda) => {},
    caballo = (celda) => {},
    reina = (celda) => {},
    rey = (celda) => {}
}