import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EstudiantesPage from './pages/EstudiantePage';
import EstudianteDetail from "./pages/EstudianteDetail"
import EstudianteForm from './components/EstudianteForm';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="EstudiantesPage" component={EstudiantesPage}
            options={{ title: 'Estudiantes' }} />
          <Stack.Screen name="EstudianteDetail" component={EstudianteDetail}
            options={{ title: 'Detalle de Estudiante' }} />
          <Stack.Screen name="EstudianteForm" component={EstudianteForm}
            options={{ title: "Registro" }}
          />
        </Stack.Navigator >
      </NavigationContainer>
    </SafeAreaProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;