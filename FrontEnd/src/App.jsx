
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/registrar';
import InicioPage from './pages/inicio';
import CalidadPage from './pages/calidad';
import FlujoPage from './pages/flujo';
import VentasPage from './pages/ventas';
import PerfilPage from './pages/perfil';
import Ph from './pages/ph'
import UsuariosPage from './pages/usuario';
import Editar from './pages/editar';
import UsuariosEliminadosPage from './pages/basurero';
import { AuthProvider } from './context/Auth.context';
import ProtectedRoute from "./protectedRoutes";
import { SensorProvider } from './context/sensores.context';
import AgregarPage from './pages/agregar';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SensorProvider>

          <Routes>
            {/* //Rutas disponibles */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Register />} />

            <Route element={<ProtectedRoute />}>

              <Route path='/Inicio' element={<InicioPage/>}></Route>
              <Route path='/Calidad' element={<CalidadPage/>}></Route>
              <Route path='/Ph' element={<Ph></Ph>}></Route>
              <Route path='/Flujo' element={<FlujoPage/>}></Route>
              <Route path='/Ventas' element={<VentasPage/>}></Route>
              <Route path='/Perfil' element={<PerfilPage/>}></Route>
              <Route path='/user' element={<UsuariosPage/>}></Route>
              <Route path='/user/:iduser' element={<UsuariosPage/>}></Route>
              <Route path='/basurero' element={<UsuariosEliminadosPage/>}></Route>
              <Route path='/editar/:id' element={<Editar />}></Route>
              <Route path='/agregar' element={<AgregarPage />}></Route>

            </Route>
          </Routes>
        </SensorProvider>

      </BrowserRouter>

    </AuthProvider>
  )
}

export default App
