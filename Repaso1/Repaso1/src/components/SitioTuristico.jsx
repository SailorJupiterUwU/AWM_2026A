import { useEffect, useState } from "react";


const SitioTuristico = (props) => {
    const { nombre, ciudad, pais, descripcion, imagen, likes } = props;
    return (
        <div className="contenido_card">

            <div className="titulo">
                <strong className="tit1"> {nombre} </strong>
                <span className="lik1">{likes} likes</span>
            </div>
            <div>
                {ciudad}, {pais}
            </div>

            <div>
                <span className="texto--fondo">
                    <strong>{nombre}</strong> {descripcion}
                </span>
            </div>
        </div>
    )
}

export default SitioTuristico