import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const Estudiante = ({ nombre, edad, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.edad}>{edad}</Text>
      </View>
    </TouchableOpacity>
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
});

export default Estudiante;