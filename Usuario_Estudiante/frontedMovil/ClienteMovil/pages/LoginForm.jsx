import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Cambiamos Provider por el View protector

const LoginForm = ({ onLogin, navigation }) => {
    const [errorEmail, setErrorEmail] = useState("");
    const [iniciarUser, setIniciarUser] = useState({
        email: "",
        password: "",
    });

    const handlerSubmit = () => {
        if (iniciarUser.email.length > 8) {
            onLogin(iniciarUser)
                .then(() => {
                    navigation.navigate("Estudiantes");
                })
                .catch((mensaje) => {
                    setErrorEmail(mensaje);
                });
        }
    };

    return (
        // SafeAreaView asegura que el contenido no se pegue arriba ni abajo de la pantalla táctil
        <SafeAreaView style={styles.safeArea}>
            {/* ScrollView permite deslizar el formulario si la pantalla es pequeña o si se abre el teclado */}
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>Inicio de Sesión</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.back}>← Volver</Text>
                </TouchableOpacity>
                <View style={styles.hr} />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={iniciarUser.email}
                    onChangeText={(v) => setIniciarUser({ ...iniciarUser, email: v })}
                    placeholder="Ingresa tu email"
                    autoCapitalize="none"
                    keyboardType="email-address" // Teclado optimizado para emails
                />
                <Text style={styles.error}>{errorEmail}</Text>

                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={iniciarUser.password}
                    onChangeText={(v) => setIniciarUser({ ...iniciarUser, password: v })}
                    placeholder="Ingresa tu password"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.boton} onPress={handlerSubmit}>
                    <Text style={styles.botonTexto}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: "#F8FAFC" // El fondo claro ahora cubre toda la pantalla del celular
    },
    scrollContainer: { 
        padding: 24, // Agregamos un poco más de espacio interno general
        justifyContent: "center" 
    },
    titulo: { fontSize: 24, fontWeight: "800", color: "#1E293B", marginTop: 10 },
    back: { fontSize: 16, color: "#4F46E5", marginVertical: 12 },
    hr: { height: 1, backgroundColor: "#E2E8F0", marginBottom: 20 },
    label: { fontSize: 14, fontWeight: "600", color: "#1E293B", marginBottom: 6 },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        padding: 14,
        marginBottom: 4,
        fontSize: 16, // Tamaño cómodo para evitar zoom automático en iOS
    },
    error: { color: "#EF4444", marginBottom: 12, fontSize: 13 },
    boton: {
        backgroundColor: "#4F46E5",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        marginTop: 16,
    },
    botonTexto: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
});

export default LoginForm;