import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useRol = () => {
    const [rol, setRol] = useState("");
    const [esVisualizador, setEsVisualizador] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarRol = async () => {
            const valor = ((await AsyncStorage.getItem("rol")) || "").trim();
            setRol(valor);
            setEsVisualizador(valor.toLowerCase() === "visualizador");
            setCargando(false);
        };
        cargarRol();
    }, []);

    return { rol, esVisualizador, cargando };
};