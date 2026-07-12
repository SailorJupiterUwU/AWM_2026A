import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserForm = ({ onAgregarUser, navigation }) => {
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const [nuevoUsuario, setNuevoUsuario] = useState({
        email: "",
        rol: "Visualizador", // Un rol por defecto previene envíos vacíos
        password: "",
    });

    const handlerSubmit = () => {
        if (nuevoUsuario.password === confPassword) {
            setErrorPassword("");
            onAgregarUser(nuevoUsuario)
                .then(() => {
                    setConfPassword("");
                    setErrorEmail("");
                    navigation.navigate("Login");
                })
                .catch((mensajeClaro) => {
                    if (mensajeClaro.toLowerCase().includes("existe") || mensajeClaro.toLowerCase().includes("email")) {
                        setErrorEmail(mensajeClaro);
                    } else {
                        setErrorPassword(mensajeClaro);
                    }
                });
        } else {
            setErrorPassword("Las contraseñas deben ser iguales");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.botonBack} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.backTexto}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.tituloHeader}>Registro</Text>
                <View style={{ width: 75 }} />
            </View>

            <View style={styles.hr} />

            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.inputLabel}>Crear Cuenta Nueva</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, !!errorEmail && styles.inputError]}
                    value={nuevoUsuario.email}
                    onChangeText={(v) => setNuevoUsuario({ ...nuevoUsuario, email: v })}
                    placeholder="ejemplo@correo.com"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <Text style={styles.errorText}>{errorEmail}</Text>

                <Text style={styles.label}>Selecciona tu Rol</Text>
                <View style={styles.filaRol}>
                    <TouchableOpacity
                        style={[styles.rolBoton, nuevoUsuario.rol === "Admin" && styles.rolBotonActivo]}
                        onPress={() => setNuevoUsuario({ ...nuevoUsuario, rol: "Admin" })}
                    >
                        <Text style={[styles.rolTexto, nuevoUsuario.rol === "Admin" && styles.rolTextoActivo]}>
                            Administrador
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.rolBoton, nuevoUsuario.rol === "Visualizador" && styles.rolBotonActivo]}
                        onPress={() => setNuevoUsuario({ ...nuevoUsuario, rol: "Visualizador" })}
                    >
                        <Text style={[styles.rolTexto, nuevoUsuario.rol === "Visualizador" && styles.rolTextoActivo]}>
                            Visualizador
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={[styles.input, !!errorPassword && styles.inputError]}
                    value={nuevoUsuario.password}
                    onChangeText={(v) => setNuevoUsuario({ ...nuevoUsuario, password: v })}
                    placeholder="Mínimo 6 caracteres"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                />

                <Text style={styles.label}>Confirmar Contraseña</Text>
                <TextInput
                    style={[styles.input, !!errorPassword && styles.inputError]}
                    value={confPassword}
                    onChangeText={setConfPassword}
                    placeholder="Repite tu contraseña"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                />
                <Text style={styles.errorText}>{errorPassword}</Text>

                <TouchableOpacity style={styles.botonSubmit} onPress={handlerSubmit}>
                    <Text style={styles.botonTexto}>Registrar Usuario</Text>
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
    filaRol: { 
        flexDirection: "row", 
        gap: 12, 
        marginBottom: 20 
    },
    rolBoton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    rolBotonActivo: { 
        backgroundColor: "#4F46E5", 
        borderColor: "#4F46E5",
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2
    },
    rolTexto: { 
        color: "#475569", 
        fontWeight: "700",
        fontSize: 14
    },
    rolTextoActivo: { 
        color: "#FFFFFF" 
    },
    botonSubmit: {
        backgroundColor: "#4F46E5",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 12,
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    botonTexto: { 
        color: "#FFFFFF", 
        fontWeight: "700", 
        fontSize: 16 
    },
});

export default UserForm;