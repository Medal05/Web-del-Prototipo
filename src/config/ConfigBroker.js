// import Paho from "paho-mqtt";
// import {  useEffect } from "react";
// // import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, Button, View, TextInput } from 'react-native';

// const client = new Paho.Client(
//   "broker.hivemq.com",
//   Number(8000),
//   `sensoresintegradora ${parseInt(Math.random() * 100)}`
// );

// export default function App() {
//   function onMessage(message) {
//     if (message.destinationName === "/Integradora/ph") {
//       const receivedValue = parseInt(message.payloadString);
//       setTemperatura(receivedValue);
//       console.log(`Valor Ph: ${receivedValue}`);
//     }
//   }

//   useEffect(() => {
//     client.connect({
//       onSuccess: () => {
//         console.log("Connected!");
//         client.subscribe("/Integradora/ph");
//         client.onMessageArrived = onMessage;
//       },
//       onFailure: () => {
//         console.log("Failed to connect!");
//       }
//     });

//     return () => {
//       if (client.isConnected()) {
//         client.disconnect();
//       }
//     };
//   }, []);



//   return (
//     <View style={styles.container}>
      
//     </View>
//   );
// }

// // Estilos
// ;
