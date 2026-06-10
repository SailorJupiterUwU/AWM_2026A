import { useState, useEffect } from "react";
import { api } from "../utils/api.js"

export const useTuristico = () => {
    //Variable de estado
    const [sitios, setSitios] = useState([])
    //Para llenar la lista de sitios
    useEffect(() => {
        api.get('/sitio')
            .then((res) => {
                setSitios(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    //Para agregar un nuevo sitio
    const agregarSitio = (nuevoSitio) => {
        api.post("sitio", nuevoSitio)
            .then((res) => {
                setSitios(prev => ([...prev, res.data]))
            })
            .catch((err) => console.log(err))
    }

    const darLike = (sitio) => {
        const sitioActualizado = {...sitio, likes: sitio.likes + 1
    }
//No se usa
    api.put()

    }
    return {sitios, agregarSitio, darLike}
}