import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";
import { getId } from "../utils/normalizador";

export const useEstudiante = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [esVisualizador, setEsVisualizador] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarEstudiantes = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("token");
            
            if (!token) {
                console.log("useEstudiante: No hay token disponible en AsyncStorage");
                setEstudiantes([]); // Limpiamos datos viejos por seguridad
                setCargando(false);
                return;
            }

            const rol = ((await AsyncStorage.getItem("rol")) || "").trim().toLowerCase();
            setEsVisualizador(rol === "visualizador");

            // Pasamos el token explícitamente por si el interceptor global aún no se actualizó
            const res = await api.get("/api/estudiantes", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEstudiantes(res.data);
        } catch (err) {
            const mensaje = err.response?.data?.message ?? "Error al cargar estudiantes";
            setError(mensaje);
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarEstudiantes();
    }, [cargarEstudiantes]);

    const agregarEstudiante = async (nuevoEstudiante) => {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw "Sesión expirada. No hay token.";
        try {
            const res = await api.post("/api/estudiantes", nuevoEstudiante, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEstudiantes((prev) => [...prev, res.data]);
            return res.data;
        } catch (err) {
            const mensaje = err.response?.data?.message ?? "Error al registrar";
            throw mensaje;
        }
    };

    const eliminarEstudiante = async (id) => {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw "Sesión expirada. No hay token.";
        try {
            await api.delete(`/api/estudiantes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEstudiantes((prev) => prev.filter((e) => getId(e) !== id));
        } catch (err) {
            const mensaje = err.response?.data?.message ?? "Error al eliminar estudiante";
            throw mensaje;
        }
    };

    const editarEstudiante = async (editadoEstudiante) => {
        const id = getId(editadoEstudiante);
        const token = await AsyncStorage.getItem("token");
        if (!token) throw "Sesión expirada. No hay token.";
        try {
            const res = await api.put(`/api/estudiantes/${id}`, editadoEstudiante, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEstudiantes((prev) => prev.map((e) => (getId(e) === id ? res.data : e)));
            return res.data;
        } catch (err) {
            const mensaje = err.response?.data?.message ?? "Error al editar el estudiante";
            throw mensaje;
        }
    };

    const getEstudiante = async (id) => {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw "Sesión expirada. No hay token.";
        try {
            const res = await api.get(`/api/estudiantes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res;
        } catch (err) {
            const mensaje = err.response?.data?.message ?? "Error al obtener los datos del estudiante";
            throw mensaje;
        }
    };

    return {
        estudiantes,
        esVisualizador,
        cargando,
        error,
        recargar: cargarEstudiantes,
        agregarEstudiante,
        eliminarEstudiante,
        editarEstudiante,
        getEstudiante,
    };
};