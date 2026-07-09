import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../utils/api";
import { getId } from "../utils/normalizador";

export const useEstudiante = () => {

    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
        cargarEstudiantes();
    }, []);

     const cargarEstudiantes = async () => {
        try {
            const res = await api.get("/estudiantes");

            setEstudiantes(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    const agregarEstudiante = async (nuevoEstudiante) => {
        try {

            const res = await api.post("/estudiantes", nuevoEstudiante);

            setEstudiantes(prev => [...prev, res.data]);

            return res.data;

        } catch (err) {

            const mensaje =
                err.response?.data?.message ?? "Error al registrar";

            throw mensaje;
        }
    };

    const eliminarEstudiante = async (id) => {

        try {

            await api.delete(`/estudiantes/${id}`);

            setEstudiantes(prev =>
                prev.filter(e => getId(e) !== id)
            );

        } catch (err) {
            console.log(err);
        }
    };

    const editarEstudiante = async (estudianteEditado) => {

        try {

            const id = getId(estudianteEditado);


            const res = await api.put(
                `/estudiantes/${id}`,
                estudianteEditado
            );

            setEstudiantes(prev =>
                prev.map(e =>
                    getId(e) === id ? res.data : e
                )
            );

            return res.data;

        } catch (err) {
            console.log(err);
        }
    };

    const login = async (estudianteLogin) => {

        try {

            const res = await api.post(
                "/estudiantes/login",
                estudianteLogin
            );



            return res.data;

        } catch (err) {

            const mensaje =
                err.response?.data?.message ??
                "Error al iniciar sesión";

            throw mensaje;
        }
    };

    const getEstudiante = async (id) => {

        try {

            const res = await api.get(`/estudiantes/${id}`);

            return res;

        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
    };

    return {
        estudiantes,
        agregarEstudiante,
        eliminarEstudiante,
        editarEstudiante,
        getEstudiante,
        login,
        logout,
        cargarEstudiantes
    };
};