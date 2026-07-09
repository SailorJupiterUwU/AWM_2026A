import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Estudiante from '../components/Estudiante';
import { getId } from '../utils/normalizador';
import { api } from '../utils/api';

const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    api.get('/estudiantes')
      .then((res) => setEstudiantes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes</Text>
      <FlatList
        data={estudiantes}
        keyExtractor={(item) => String(getId(item))}
        renderItem={({ item }) => (
          <Estudiante nombre={item.nombre} edad={item.edad} url={item.url} />
        )}
      />
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
});

export default EstudiantesPage;

/* EXPO_PUBLIC_URL_BASE=http://192.168.100.149:8000 */