import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Estudiante = (props) => {
  const { nombre, edad, url } = props;
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.edad}>{edad}</Text>
      {url ? (
        <TouchableOpacity>
          <Text style={styles.link}>Home Page</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  edad: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  link: {
    color: '#1e88e5',
    marginTop: 4,
  },
});

export default Estudiante;