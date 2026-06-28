const botonDeshabilitado = {
    disabled: esVisualizador,
    style: {
        opacity: esVisualizador ? 0.5 : 1,
        cursor: esVisualizador ? "not-allowed" : "pointer",
    },
};