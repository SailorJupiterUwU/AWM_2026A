import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import EstudiantesPage from './pages/EstudiantePage';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <EstudiantesPage />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;