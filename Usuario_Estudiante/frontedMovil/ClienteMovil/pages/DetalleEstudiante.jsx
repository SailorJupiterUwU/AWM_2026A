import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRol } from "../hooks/useRol";

const DetalleEstudiante = ({ onGetEstudiante, navigation, route }) => {
    const [estudiante, setEstudiante] = useState({});
    const { id } = route.params;
    const [errorBuscarEstudiante, setErrorBuscarEstudiante] = useState("");
    const { esVisualizador } = useRol();

    useEffect(() => {
        onGetEstudiante(id)
            .then((res) => {
                setErrorBuscarEstudiante("");
                setEstudiante({ ...res.data });
            })
            .catch((error) => {
                setErrorBuscarEstudiante(error);
            });
    }, [id]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.botonBack} onPress={() => navigation.navigate("Estudiantes")}>
                    <Text style={styles.backTexto}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.tituloHeader}>Perfil</Text>
                <View style={{ width: 70 }} />
            </View>
            
            <View style={styles.hr} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {!!errorBuscarEstudiante && <Text style={styles.error}>{errorBuscarEstudiante}</Text>}

                <View style={styles.tarjetaPerfil}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarLetra}>
                            {estudiante.nombre ? estudiante.nombre.charAt(0).toUpperCase() : "?"}
                        </Text>
                    </View>
                    
                    <Text style={styles.nombre}>{estudiante.nombre || "Cargando..."}</Text>
                    <Text style={styles.edad}>Edad: {estudiante.edad} años</Text>

                    <View style={styles.divisorTarjeta} />

                    {estudiante.url ? (
                        <TouchableOpacity 
                            style={styles.botonLink} 
                            onPress={() => Linking.openURL(estudiante.url)}
                        >
                            <Text style={styles.linkTexto}>Visitar Sitio Web</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.contenedorSinDato}>
                            <Text style={styles.sinDato}>Sitio web no disponible</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={[styles.botonEditar, esVisualizador && styles.botonDeshabilitado]}
                    disabled={esVisualizador}
                    onPress={() => navigation.navigate("EstudianteForm", { id })}
                >
                    <Text style={styles.botonTexto}>Editar Perfil</Text>
                </TouchableOpacity>
            </ScrollView>
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
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    botonBack: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#E2E8F0",
        borderRadius: 8,
    },
    backTexto: { 
        fontSize: 14, 
        color: "#4F46E5", 
        fontWeight: "600" 
    },
    tituloHeader: { 
        fontSize: 20, 
        fontWeight: "800", 
        color: "#1E293B" 
    },
    hr: { 
        height: 1, 
        backgroundColor: "#E2E8F0", 
        marginTop: 12 
    },
    scrollContainer: { 
        padding: 24 
    },
    error: { 
        color: "#EF4444", 
        fontSize: 16, 
        marginBottom: 16, 
        textAlign: "center" 
    },
    // Contenedor tipo tarjeta de perfil
    tarjetaPerfil: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
        marginBottom: 20,
    },
    avatarPlaceholder: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#EEF2F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#CBD5E1",
    },
    avatarLetra: {
        fontSize: 28,
        fontWeight: "700",
        color: "#4F46E5",
    },
    nombre: { 
        fontSize: 24, 
        fontWeight: "800", 
        color: "#1E293B", 
        textAlign: "center" 
    },
    edad: { 
        fontSize: 16, 
        color: "#64748B", 
        marginTop: 6, 
        marginBottom: 4 
    },
    divisorTarjeta: {
        height: 1,
        backgroundColor: "#F1F5F9",
        width: "100%",
        marginVertical: 18,
    },
    botonLink: { 
        backgroundColor: "#EEF2F6",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    linkTexto: { 
        color: "#4F46E5", 
        fontWeight: "700",
        fontSize: 15
    },
    contenedorSinDato: {
        paddingVertical: 12,
        alignItems: "center",
    },
    sinDato: { 
        color: "#94A3B8", 
        fontStyle: "italic",
        fontSize: 14
    },
    botonEditar: {
        backgroundColor: "#4F46E5",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    botonDeshabilitado: { 
        opacity: 0.4,
        backgroundColor: "#94A3B8",
        shadowOpacity: 0,
        elevation: 0
    },
    botonTexto: { 
        color: "#FFFFFF", 
        fontWeight: "700",
        fontSize: 16 
    },
});

export default DetalleEstudiante;