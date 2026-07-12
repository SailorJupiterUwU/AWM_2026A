import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";

// Para mostrar a un solo estudiante en toda la lista
const Estudiante = ({ nombre, edad, url }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.edad}>{edad}</Text>
            {url ? (
                <TouchableOpacity onPress={() => Linking.openURL(url)}>
                    <Text style={styles.link}>Home Page</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.sinDato}>No disponible</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
    },
    nombre: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1E293B",
    },
    edad: {
        fontSize: 14,
        color: "#64748B",
        marginTop: 2,
    },
    link: {
        fontSize: 14,
        color: "#4F46E5",
        fontWeight: "600",
        marginTop: 6,
    },
    sinDato: {
        fontSize: 13,
        color: "#94A3B8",
        fontStyle: "italic",
        marginTop: 6,
    },
});

export default Estudiante;