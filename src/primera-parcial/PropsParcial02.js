import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropsParcial02 = ({ route }) => {
  // Desestructuramos los parámetros recibidos
  const { inputValue, semestre } = route.params;

  return (
    <View>
      <Text style={styles.text}>Mi nombre es: {inputValue} - Actualmente curso el {semestre} semestre</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'black'
  },
});

export default PropsParcial02;
