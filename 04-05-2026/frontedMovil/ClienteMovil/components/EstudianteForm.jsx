import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from "react-native";

import { useEstudiante } from "../hooks/useEstudiante";


const EstudianteForm = ({ navigation, route }) => {
  const {  agregarEstudiante, editarEstudiante, getEstudiante } = useEstudiante();
  const id = route?.params?.id;
  const editar = !!id;
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: "",
    edad: "",
    url: "",
    email: ""
  });
  const [errorNombre, setErrorNombre] = useState("");
  const [errorEdad, setErrorEdad] = useState("");
  useEffect(() => {
    if (editar) {
      getEstudiante(id)
        .then(res => {
          setNuevoEstudiante({...res.data,password: ""});
        });
    }
  }, [id]);
  const handlerSubmit = async () => {
    let valido = true;
    if (nuevoEstudiante.nombre.length < 8) {
      setErrorNombre("El nombre debe tener mínimo 8 caracteres");
      valido = false;
    } else {
      setErrorNombre("");
    }
    if (Number(nuevoEstudiante.edad) < 18) {
      setErrorEdad("La edad debe ser mayor de 18");
      valido = false;
    } else {
      setErrorEdad("");
    }
    if (!valido) return;
    try {
      if (editar) {
        await editarEstudiante(nuevoEstudiante);
        Alert.alert(
          "Correcto",
          "Estudiante actualizado"
        );
        navigation.goBack();
      } else {
        await agregarEstudiante(nuevoEstudiante);
        Alert.alert(
          "Correcto",
          "Estudiante registrado"
        );
        navigation.navigate("EstudiantesPage");
      }
    } catch(error){
      Alert.alert(
        "Error",
        error
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {editar ? "Editar Estudiante" : "Registro"}
      </Text>
      <TextInput style={styles.input} placeholder="Nombre" value={nuevoEstudiante.nombre}
        onChangeText={(text)=> setNuevoEstudiante({...nuevoEstudiante, nombre:text})}
      />
      <Text style={styles.error}>
        {errorNombre}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Edad"
        keyboardType="numeric"
        value={String(nuevoEstudiante.edad)}
        onChangeText={(text)=>
          setNuevoEstudiante({
            ...nuevoEstudiante,
            edad:text
          })
        }
      />
      <Text style={styles.error}>
        {errorEdad}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="URL"
        value={nuevoEstudiante.url}
        onChangeText={(text)=>
          setNuevoEstudiante({
            ...nuevoEstudiante,
            url:text
          })
        }
      />
      <Button
        title={editar ? "Actualizar" : "Registrar"}
        onPress={handlerSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20
  },

  titulo:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20,
    textAlign:"center"
  },

  input:{
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    padding:10,
    marginBottom:10
  },

  error:{
    color:"red",
    marginBottom:10
  }

});


export default EstudianteForm;