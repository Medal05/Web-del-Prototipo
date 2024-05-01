import { createContext, useState, useEffect } from "react";
// import { RegistrarUsuario, login, verifyTokenRequest, getUserRequest } from "../api/auth";
import axios from 'axios';
// import { Client } from "paho-mqtt";

import PropTypes from 'prop-types';

// var api="http://localhost:4000/api"
export const SensoresContext = createContext();


export const SensorProvider = ({ children }) => {

  const [historialFlujo, setHistorialFlujo] = useState([]);
  const [historialPh, setHistorialPh] = useState([]);
  const [historialVentas, sethistorialVentas] = useState([]);
  const [historialCalidad, sethistorialCalidad] = useState([]);

  const [nivelPh, setnivelPh] = useState([]); //Ultimo valor de ph en la base de datos
  const [nivelFlujo, setnivelFlujo] = useState([]);//Ultimo valor de Flujo en la base de datos
  const [nivelTurbidez, setnivelTurbidez] = useState([]);//Ultimo valor de Turbidez en la base de datos
  const [ultimaVenta, setultimaVenta] = useState([]);
  const [totalVentas, settotalVentas] = useState([]);
  const [totalSemanaVentas, settotalSemanaVentas] = useState([]);
  const [totalMesVentas, settotalMesVentas] = useState([]);


  // variable usada para conectar a la api
  const api = 'http://localhost:4000/api'
  // -------OBTENER ULTIMO DATO DE LA BASE DE DATOS DE SENSORES----
  useEffect(() => {
    // MostrarFlujo();
    // obtenerUltimoDato();
    // MostrarPh();
    // MostrarVentas();
  }, []);
  try {
    useEffect(() => {
      const obtenerUltimoDato = async () => {
        try {
          // Hacer solicitudes HTTP para obtener los datos más recientes
          const responsePh = await axios.get(`${api}/ph`);
          const responseFlujo = await axios.get(`${api}/flujo`);
          const responseCalidad = await axios.get(`${api}/MostrarCalidad`);
          const responseTurbidez = await axios.get(`${api}/turbidez`);
          const responseVenta = await axios.get(`${api}/UltimaVenta`);
          const responsetotalVentas = await axios.get(`${api}/TotalVentas`);
          const responsetotalSemanaVentas = await axios.get(`${api}/TotalSemanaVentas`);
          const responsetotalMesVentas = await axios.get(`${api}/TotalMesVentas`);

          // Formatear la fecha de los datos
          const datosPh = {
            ...responsePh.data,
            fecha: new Date(responsePh.data.fecha).toLocaleString()
          };
          const datosFlujo = {
            ...responseFlujo.data,
            fecha: new Date(responseFlujo.data.fecha).toLocaleString()
          };
          const datosTurbidez = {
            ...responseTurbidez.data,
            fecha: new Date(responseTurbidez.data.fecha).toLocaleString()
          };
          setnivelPh(datosPh);
          setnivelFlujo(datosFlujo);
          setnivelTurbidez(datosTurbidez);
          sethistorialCalidad(responseCalidad.data)
          setultimaVenta(responseVenta.data)
          settotalVentas(responsetotalVentas.data.total_ventas)
          settotalSemanaVentas(responsetotalSemanaVentas.data.total_ventas_semana)
          settotalMesVentas(responsetotalMesVentas.data.total_ventas_mes)
          // console.log("venta sem",responsetotalSemanaVentas.data.total_ventas_semana)
          // console.log(responsetotalMesVentas.data.total_ventas_mes)


          // Obtener todos los datos de la base de datos
          // const MostrarFlujo = async () => {
          try {
            const response = await axios.get(`${api}/mostrarFlujo`);
            setHistorialFlujo(response.data);
          } catch (error) {
            console.error("Error Mostrar Flujo:", error);
          }
          // };
          // const MostrarPh = async () => {
          try {
            const response = await axios.get(`${api}/MostrarPh`);
            setHistorialPh(response.data);
          } catch (error) {
            console.error("Error Mostrar Ph:", error);
          }
          // };

          // const MostrarVentas = async () => {
          try {
            const response = await axios.get(`${api}/Ventas`);
            sethistorialVentas(response.data);
          } catch (error) {
            console.error("Error Mostrar las Ventas:", error);
          }
          // };
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };
      obtenerUltimoDato();
      const interval = setInterval(obtenerUltimoDato, 1000);

      return () => clearInterval(interval);
    }, []);
  } catch (error) {
    console.log("Error al llamar los datos de los ultimos Dato", error)
  }







  return (
    <SensoresContext.Provider value={{
      historialFlujo,
      historialPh,
      nivelPh,
      nivelFlujo,
      nivelTurbidez,
      ultimaVenta,
      historialVentas,
      totalVentas,
      totalMesVentas,
      totalSemanaVentas,
      historialCalidad

    }}>
      {children}
    </SensoresContext.Provider>
  );
}

SensorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
