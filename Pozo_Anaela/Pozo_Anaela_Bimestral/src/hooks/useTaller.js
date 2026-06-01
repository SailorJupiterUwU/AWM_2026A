import { useEffect, useState } from "react"
import api from "../utils/api"

const useTaller = () => {
    const [talleres, setTalleres] = useState([]);

    useEffect(() => {
        api.get("/talleres")
            .then((res) => {
                setTalleres(res.data)})
            .catch((err) => console.log(err))
    }, [])

    const agregarTaller = (nuevo) => {
        api.post("/talleres", nuevo)
            .then((res) => {
                setTalleres((prev) => { [...prev, res.data] })
            })
            .catch((err) => console.log(err))
    }
    return ({ talleres, agregarTaller })
}
export default useTaller