import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Bienvenido</Text>
                <Text style={styles.subtitulo}>Selecciona una opción para continuar</Text>
                <TouchableOpacity 
                    style={styles.botonPrincipal} 
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.textoBotonPrincipal}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.botonSecundario} 
                    onPress={() => navigation.navigate("UsuarioForm")}
                >
                    <Text style={styles.textoBotonSecundario}>Crear Cuenta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: "#F8FAFC" 
    },
    container: { 
        flex: 1, 
        paddingHorizontal: 24, 
        justifyContent: "center" 
    },
    titulo: { 
        fontSize: 32, 
        fontWeight: "800", 
        color: "#1E293B", 
        textAlign: "center",
        marginBottom: 8 
    },
    subtitulo: {
        fontSize: 16,
        color: "#64748B",
        textAlign: "center",
        marginBottom: 40
    },
    // Estilos del Botón de Inicio de Sesión (Sólido)
    botonPrincipal: {
        backgroundColor: "#4F46E5",
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: "center",
        marginBottom: 16,
        // Sombra ligera para iOS
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        // Sombra para Android
        elevation: 3,
    },
    textoBotonPrincipal: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
    },
    // Estilos del Botón de Registro (Contorno/Outline)
    botonSecundario: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#4F46E5",
        borderRadius: 12,
        paddingVertical: 14, // Un poco menos para compensar el grosor del borde
        alignItems: "center",
    },
    textoBotonSecundario: {
        color: "#4F46E5",
        fontWeight: "700",
        fontSize: 16,
    },
});

export default HomePage;