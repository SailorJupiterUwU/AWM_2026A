import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RutaProtegida = ({ navigation, children }) => {
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem("token").then((token) => {
            if (!token) {
                navigation.replace("Login");
            }
            setVerificando(false);
        });
    }, []);

    if (verificando) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return children;
};

export default RutaProtegida;