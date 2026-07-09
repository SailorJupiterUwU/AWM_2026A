import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Estudiante from '../components/Estudiante';
import { getId } from '../utils/normalizador';
import { api } from '../utils/api';
import { useEstudiante } from "../hooks/useEstudiante";

const EstudiantesPage = ({ navigation }) => {

  const { estudiantes } = useEstudiante();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => String(getId(item))}
        renderItem={({ item }) => (
          <Estudiante nombre={item.nombre} edad={item.edad} onPress={() => navigation.navigate('EstudianteDetail', { id: getId(item) })} />
        )}
      />
      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("EstudianteForm")}>
        <Text style={styles.textoBoton}>
          Agregar Estudiante
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },

  textoBoton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EstudiantesPage;

/* EXPO_PUBLIC_URL_BASE=http://192.168.100.149:8000 */