import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import { useEstudiante } from "../hooks/useEstudiante";


const EstudianteDetail = ({ navigation, route }) => {

    const { getEstudiante } = useEstudiante();

    const [estudiante, setEstudiante] = useState({});

    const id = route?.params?.id;


    useEffect(() => {

        if (!id) return;

        getEstudiante(id)
            .then(res => {
                setEstudiante(res.data);
            })
            .catch(err => {
                console.log(err);
            });

    }, [id]);



    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Detalle del Estudiante
            </Text>
            <Text style={styles.text}>
                Nombre: {estudiante.nombre}
            </Text>

            <Text style={styles.text}>
                Edad: {estudiante.edad}
            </Text>

            <Text style={styles.text}>
                URL: {estudiante.url}
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>
                    Volver
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate(
                        "EstudianteForm",
                        { id }
                    )
                }
            >
                <Text style={styles.buttonText}>
                    Editar
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:20
    },

    title:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:30
    },

    text:{
        fontSize:18,
        marginBottom:10
    },

    button:{
        backgroundColor:"#007AFF",
        padding:12,
        borderRadius:8,
        marginTop:15,
        width:"80%",
        alignItems:"center"
    },

    buttonText:{
        color:"#fff",
        fontSize:16,
        fontWeight:"bold"
    }

});

export default EstudianteDetail;