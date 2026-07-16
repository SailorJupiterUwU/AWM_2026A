import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import UserForm from "./pages/UserForm";
import EstudiantePage from "./pages/EstudiantePage";
import EstudianteForm from "./pages/EstudianteForm";
import DetalleEstudiante from "./pages/DetalleEstudiante";
import LocationPage from "./pages/LocationPage";
import RutaProtegida from "./components/RutaProtegida";

import { useEstudiante } from "./hooks/useEstudiante";
import { useUser } from "./hooks/useUser";

const Stack = createNativeStackNavigator();

function App() {
  const { estudiantes, agregarEstudiante, eliminarEstudiante, editarEstudiante, getEstudiante } = useEstudiante();
  const { agregarUser, loginUser } = useUser();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Home">
            {(props) => <HomePage {...props} />}
          </Stack.Screen>

          <Stack.Screen name="Login">
            {(props) => <LoginForm {...props} onLogin={loginUser} />}
          </Stack.Screen>

          <Stack.Screen name="UsuarioForm">
            {(props) => <UserForm {...props} onAgregarUser={agregarUser} />}
          </Stack.Screen>

          <Stack.Screen name="Estudiantes">
            {(props) => (
              <RutaProtegida {...props}>
                <EstudiantePage {...props} estudiantes={estudiantes} onEliminar={eliminarEstudiante} />
              </RutaProtegida>
            )}
          </Stack.Screen>

          <Stack.Screen name="EstudianteForm">
            {(props) => (
              <RutaProtegida {...props}>
                <EstudianteForm
                  {...props}
                  onAgregar={agregarEstudiante}
                  onEditar={editarEstudiante}
                  onGetEstudiante={getEstudiante}
                />
              </RutaProtegida>
            )}
          </Stack.Screen>

          <Stack.Screen name="EstudianteDetalle">
            {(props) => (
              <RutaProtegida {...props}>
                <DetalleEstudiante {...props} onGetEstudiante={getEstudiante} />
              </RutaProtegida>
            )}
          </Stack.Screen>

          <Stack.Screen name="LocationPage">
            {(props) => (

              <LocationPage {...props} />

            )}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;