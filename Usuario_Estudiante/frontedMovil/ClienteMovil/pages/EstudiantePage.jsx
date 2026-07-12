import { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Estudiante from "../components/Estudiante";
import { getId } from "../utils/normalizador";
import { api } from "../utils/api"; // Asegúrate de importar tu instancia de API

const EstudiantePage = ({ estudiantes, onEliminar, navigation }) => {
    const [listaEstudiantes, setListaEstudiantes] = useState([]);
    const [esVisualizador, setEsVisualizador] = useState(false);

    // useFocusEffect se ejecuta CADA VEZ que la pantalla pasa al primer plano
    useFocusEffect(
        useCallback(() => {
            const verificarSesionYRol = async () => {
                const token = await AsyncStorage.getItem("token");
                
                // Si por alguna razón no hay token al enfocar la pantalla, redirigimos a Login
                if (!token) {
                    navigation.replace("Login");
                    return;
                }

                const valorRol = ((await AsyncStorage.getItem("rol")) || "").trim().toLowerCase();
                setEsVisualizador(valorRol === "visualizador");

                // Sincronizamos la lista de estudiantes que viene por props
                if (estudiantes) {
                    setListaEstudiantes(estudiantes);
                }
            };

            verificarSesionYRol();
        }, [estudiantes, navigation])
    );

    const cerrarSesion = async () => {
        // 1. Limpiamos el almacenamiento persistente
        await AsyncStorage.multiRemove(["rol", "token"]);
        
        // 2. Limpiamos los headers globales de Axios para que no quede rastro del token viejo
        if (api.defaults.headers.common["Authorization"]) {
            delete api.defaults.headers.common["Authorization"];
        }

        // 3. Redirigimos al Login (o Home dependiendo de tu jerarquía)
        navigation.replace("Login"); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Estudiantes</Text>
                <TouchableOpacity style={styles.botonCerrar} onPress={cerrarSesion}>
                    <Text style={styles.cerrarSesionTexto}>Salir</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.hr} />

            <FlatList
                data={listaEstudiantes}
                keyExtractor={(item) => String(getId(item))}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => {
                    const id = getId(item);
                    return (
                        <View style={styles.cardEstudiante}>
                            <Estudiante nombre={item.nombre} edad={item.edad} url={item.url} />
                            
                            <View style={styles.filaBotones}>
                                <TouchableOpacity 
                                    style={styles.botonDetail}
                                    onPress={() => navigation.navigate("EstudianteDetalle", { id })}
                                >
                                    <Text style={styles.linkBoton}>Ver Detalle</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[styles.botonEliminar, esVisualizador && styles.botonDeshabilitado]}
                                    disabled={esVisualizador}
                                    onPress={() => onEliminar(id)}
                                >
                                    <Text style={styles.linkBotonEliminar}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />

            {!esVisualizador && (
                <TouchableOpacity
                    style={styles.botonFlotante}
                    onPress={() => navigation.navigate("EstudianteForm")}
                >
                    <Text style={styles.botonAgregarTexto}>+</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: "#F8FAFC" 
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    titulo: { 
        fontSize: 26, 
        fontWeight: "800", 
        color: "#1E293B" 
    },
    botonCerrar: {
        backgroundColor: "#FEE2E2",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    cerrarSesionTexto: { 
        color: "#EF4444", 
        fontWeight: "700",
        fontSize: 14 
    },
    hr: { 
        height: 1, 
        backgroundColor: "#E2E8F0", 
        marginTop: 12,
        marginBottom: 4 
    },
    listContainer: {
        padding: 20,
        paddingBottom: 90 
    },
    cardEstudiante: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    filaBotones: { 
        flexDirection: "row", 
        gap: 12, 
        marginTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingTop: 12
    },
    botonDetail: {
        flex: 1,
        backgroundColor: "#F1F5F9",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center"
    },
    botonEliminar: {
        flex: 1,
        backgroundColor: "#FFE4E6",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center"
    },
    linkBoton: { 
        color: "#4F46E5", 
        fontWeight: "600",
        fontSize: 14
    },
    linkBotonEliminar: { 
        color: "#E11D48", 
        fontWeight: "600",
        fontSize: 14
    },
    botonDeshabilitado: { 
        opacity: 0.4 
    },
    botonFlotante: {
        position: "absolute",
        right: 20,
        bottom: 24,
        backgroundColor: "#4F46E5",
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    botonAgregarTexto: { 
        color: "#FFFFFF", 
        fontSize: 28, 
        fontWeight: "400",
        lineHeight: 32
    },
});

export default EstudiantePage;