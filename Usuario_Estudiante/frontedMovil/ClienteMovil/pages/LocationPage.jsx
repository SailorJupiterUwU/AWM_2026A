import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationPage = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [cargando, setCargando] = useState(true);

    const obtenerUbicacion = async () => {
        setCargando(true);
        setErrorMsg(null);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("No se ha concedido el permiso de acceso a la geolocalización");
                setCargando(false);
                return;
            }

            const ubicacion = await Location.getCurrentPositionAsync({});
            setLocation(ubicacion);
        } catch (err) {
            setErrorMsg("No se pudo obtener la ubicación. Intenta de nuevo.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerUbicacion();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.botonBack} onPress={() => navigation.goBack()}>
                    <Text style={styles.backTexto}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.tituloHeader}>Mi Ubicación</Text>
                <View style={{ width: 70 }} />
            </View>

            <View style={styles.hr} />

            <View style={styles.container}>
                {cargando ? (
                    <View style={styles.centro}>
                        <ActivityIndicator size="large" color="#4F46E5" />
                        <Text style={styles.textoCargando}>Obteniendo ubicación...</Text>
                    </View>
                ) : errorMsg ? (
                    <View style={styles.tarjetaError}>
                        <Text style={styles.iconoError}>⚠️</Text>
                        <Text style={styles.textoError}>{errorMsg}</Text>
                        <TouchableOpacity style={styles.botonReintentar} onPress={obtenerUbicacion}>
                            <Text style={styles.botonReintentarTexto}>Reintentar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.tarjeta}>
                        <View style={styles.iconoContenedor}>
                            <Text style={styles.icono}>📍</Text>
                        </View>
                        <Text style={styles.filaLabel}>Latitud</Text>
                        <Text style={styles.filaValor}>{location?.coords?.latitude}</Text>

                        <View style={styles.divisor} />

                        <Text style={styles.filaLabel}>Longitud</Text>
                        <Text style={styles.filaValor}>{location?.coords?.longitude}</Text>

                        <View style={styles.divisor} />

                        <Text style={styles.filaLabel}>Precisión</Text>
                        <Text style={styles.filaValor}>{location?.coords?.accuracy?.toFixed(1)} m</Text>

                        <TouchableOpacity style={styles.botonActualizar} onPress={obtenerUbicacion}>
                            <Text style={styles.botonActualizarTexto}>Actualizar ubicación</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
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
    backTexto: { fontSize: 14, color: "#4F46E5", fontWeight: "600" },
    tituloHeader: { fontSize: 20, fontWeight: "800", color: "#1E293B" },
    hr: { height: 1, backgroundColor: "#E2E8F0", marginTop: 12 },
    container: { flex: 1, padding: 24, justifyContent: "center" },
    centro: { alignItems: "center", justifyContent: "center" },
    textoCargando: { marginTop: 12, color: "#64748B", fontSize: 14 },
    tarjeta: {
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
    },
    iconoContenedor: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#EEF2F6",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    icono: { fontSize: 28 },
    filaLabel: { fontSize: 13, color: "#94A3B8", fontWeight: "600", marginTop: 8 },
    filaValor: { fontSize: 18, color: "#1E293B", fontWeight: "700", marginTop: 2 },
    divisor: { height: 1, backgroundColor: "#F1F5F9", width: "100%", marginVertical: 14 },
    botonActualizar: {
        backgroundColor: "#4F46E5",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 24,
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    botonActualizarTexto: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
    tarjetaError: {
        backgroundColor: "#FEF2F2",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FECACA",
    },
    iconoError: { fontSize: 32, marginBottom: 8 },
    textoError: { color: "#EF4444", fontSize: 15, textAlign: "center", fontWeight: "600" },
    botonReintentar: {
        backgroundColor: "#EF4444",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 16,
    },
    botonReintentarTexto: { color: "#FFFFFF", fontWeight: "700" },
});

export default LocationPage;