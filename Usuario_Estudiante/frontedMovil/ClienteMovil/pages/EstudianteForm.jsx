import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRol } from "../hooks/useRol";

const EstudianteForm = ({ onAgregar, onEditar, onGetEstudiante, navigation, route }) => {
    const { esVisualizador } = useRol();

    const id = route.params?.id;
    const editar = !!id;

    const [errorNombre, setError] = useState("");
    const [errorEdad, setErrorEdad] = useState("");

    const [nuevoEstudiante, setNuevoEstudiante] = useState({
        nombre: "",
        edad: "", // Cambiado a string vacío para un placeholder nativo más limpio
        url: "",
    });

    useEffect(() => {
        if (editar) {
            onGetEstudiante(id).then((res) => {
                setNuevoEstudiante({
                    ...res.data,
                    edad: res.data.edad ? String(res.data.edad) : ""
                });
            });
        }
    }, [id]);

    const handlerSubmit = () => {
        const edadNumerica = parseInt(nuevoEstudiante.edad, 10) || 0;

        if (nuevoEstudiante.nombre.length >= 8 && edadNumerica >= 18) {
            const datosEnvio = { ...nuevoEstudiante, edad: edadNumerica };
            const accion = editar ? onEditar(datosEnvio) : onAgregar(datosEnvio);
            
            accion
                .then(() => {
                    setError("");
                    setErrorEdad("");
                    setNuevoEstudiante({ id: "", nombre: "", edad: "", url: "" });
                    navigation.navigate("Estudiantes");
                })
                .catch((mensaje) => setError(mensaje));
            return; // Detiene la ejecución si todo fue exitoso
        }

        // Validaciones de UI
        if (nuevoEstudiante.nombre.length <= 7) {
            setError("El nombre debe tener 8 caracteres mínimo");
        } else {
            setError("");
        }

        if (edadNumerica < 18) {
            setErrorEdad("La edad debe ser mayor o igual a 18");
        } else {
            setErrorEdad("");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.botonBack} 
                    onPress={() => navigation.navigate(editar ? "EstudianteDetalle" : "Estudiantes", { id })}
                >
                    <Text style={styles.backTexto}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.tituloHeader}>{editar ? "Editar" : "Registrar"}</Text>
                <View style={{ width: 75 }} />
            </View>

            <View style={styles.hr} />

            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.inputLabel}>Información del Estudiante</Text>

                <Text style={styles.label}>Nombre completo</Text>
                <TextInput
                    style={[styles.input, !!errorNombre && styles.inputError]}
                    value={nuevoEstudiante.nombre}
                    onChangeText={(v) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: v })}
                    placeholder="Ingresa nombre completo"
                    placeholderTextColor="#94A3B8"
                />
                <Text style={styles.errorText}>{errorNombre}</Text>

                <Text style={styles.label}>Edad</Text>
                <TextInput
                    style={[styles.input, !!errorEdad && styles.inputError]}
                    value={nuevoEstudiante.edad}
                    onChangeText={(v) => setNuevoEstudiante({ ...nuevoEstudiante, edad: v })}
                    placeholder="Ej. 21"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                />
                <Text style={styles.errorText}>{errorEdad}</Text>

                <Text style={styles.label}>URL Sitio Web (Opcional)</Text>
                <TextInput
                    style={styles.input}
                    value={nuevoEstudiante.url}
                    onChangeText={(v) => setNuevoEstudiante({ ...nuevoEstudiante, url: v })}
                    placeholder="https://ejemplo.com"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                    keyboardType="url"
                />

                <TouchableOpacity
                    style={[styles.boton, esVisualizador && styles.botonDeshabilitado]}
                    disabled={esVisualizador}
                    onPress={handlerSubmit}
                >
                    <Text style={styles.botonTexto}>{editar ? "Guardar Cambios" : "Registrar Estudiante"}</Text>
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
        padding: 24,
        flexGrow: 1 
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 20
    },
    label: { 
        fontSize: 14, 
        fontWeight: "600", 
        color: "#475569", 
        marginBottom: 6 
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: "#1E293B",
        marginBottom: 4,
    },
    inputError: {
        borderColor: "#EF4444",
        backgroundColor: "#FFF5F5"
    },
    errorText: { 
        color: "#EF4444", 
        fontSize: 13,
        fontWeight: "500",
        marginBottom: 14 
    },
    boton: {
        backgroundColor: "#4F46E5",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 16,
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

export default EstudianteForm;