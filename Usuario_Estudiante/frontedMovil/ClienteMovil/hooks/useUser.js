import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { api } from "../utils/api";

export const useUser = () => {
    const agregarUser = async (nuevoUser) => {
        try {
            const res = await api.post("/api/user", nuevoUser);
            return res.data;
        } catch (err) {
            const mensaje = err.response?.data?.message ?? "Error al agregar nuevo usuario";
            throw mensaje;
        }
    };

    const loginUser = async (user) => {
        try {
            const res = await api.post("/api/login", user);
            const token = res.data.token;
            const payload = jwtDecode(token);
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("rol", payload.rol);
            return payload;
        } catch (err) {
            const mensaje = err.response?.data?.message ?? "Error al iniciar sesion";
            throw mensaje;
        }
    };

    const logoutUser = async () => {
        await AsyncStorage.multiRemove(["token", "rol"]);
    };

    return { agregarUser, loginUser, logoutUser };
};