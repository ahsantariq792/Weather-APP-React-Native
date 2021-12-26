import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, Text, ScrollView, Image } from "react-native";
import { View } from "react-native-web";
import { useState, useEffect } from "react";
import axios from "axios";

import { Card } from 'react-native-elements';
import { Center, Stack, HStack, NativeBaseProvider } from "native-base";

import Icon from 'react-native-vector-icons/Ionicons';
import Location from 'react-native-vector-icons/Ionicons';


export default function App() {

  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("karachi")
  const [location, setLocation] = useState(null)
  const [submit, setSubmit] = useState(false)



  // const climate = () => {
  //   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
  //     .then(res => {
  //       const newWeather = res.data;
  //       console.log(newWeather);
  //       setWeather(newWeather);

  //     })
  // };


  useEffect(() => {

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log("position got: ", position.coords.latitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          // console.log(location)

        }, function (error) {

          setLocation("fail")

        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    getLocation()

  }, []);



  useEffect(() => {

    let name = "";

    if (city) {
      name = `q=${city}`
    } else if (location) {

      if (!location) {

      } else if (location === "fail") {
        name = "q=new york";
      } else if (location && location.latitude) {
        name = `lat=${location.latitude}&lon=${location.longitude}`
      }
    }

    // console.log("name: ", name)
    if (name) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?${name}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
        .then(res => {
          const newWeather = res.data;
          setWeather(newWeather);
        });
    }

  }, [submit, location]);




  return (
    <SafeAreaView style={{ backgroundColor: '#494e60' }}>

      <Text style={styles.loc}><Location name='location-outline' size={20}> </Location> {weather?.sys?.country} | {weather?.name}</Text>

      <SafeAreaView style={styles.container}>

      <NativeBaseProvider>

        <HStack style={styles.icon}>

          <TextInput
            style={styles.input}
            placeholder="Enter City..."
            onChangeText={setCity}
            value={city}
          />

          <Icon
            style={styles.search}
            name={'ios-search'}
            size={38}
            color={'black'}
            onPress={() => setSubmit(!submit)}
          />
        </HStack>
        </NativeBaseProvider>
        {(weather !== null) ?

          <>
            <View style={styles.card}>

              <Text style={styles.temp}>
                {weather?.main?.temp} °C
              </Text>

              <Text style={styles.desp}>
                {weather?.weather[0]?.main}
              </Text>

              <Text style={styles.text}>
                Humidity: {weather?.main?.humidity}%
              </Text>

              <Text style={styles.text}>
                Pressure: {weather?.main?.pressure} Pa
              </Text>

              <Text style={styles.text}>
                Wind Speed: {weather?.wind?.speed} m/s
              </Text>

              <Text style={styles.text}>
                Humidity: {weather?.main?.humidity} g/kg
              </Text>

            </View>



          </>
          :
          null
        }

      </SafeAreaView>

    </SafeAreaView >


  );
}


const styles = StyleSheet.create({
  container: {
    margin: 40,
    marginTop: 10,
    flex: 2,
  },
  input: {
    marginTop: 100,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#fff',
    height: 40,
  },
  btn: {
    borderRadius: 100,
    color: "#841584",
    width: 50,
    backgroundColor: '#000'
  },
  card: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#494e60',

  },
  icon: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  search: {
    marginTop: 80,
    marginBottom: 10,
    backgroundColor: '#A9A9A9',
    height: 40,
    borderRadius: 5,
  },
  loc: {
    margin: 40,
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    color: "#fff",
    justifyContent: 'center'

  },
  maincard: {
    margin: 20,
    backgroundColor: '#494e60',
  },
  temp: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: '400',
    // marginBottom: 20,

  },
  desp: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 20,
    marginLeft: 10,
  },
  text: {
    color: '#fff',
    marginBottom: 10,

  }
});
