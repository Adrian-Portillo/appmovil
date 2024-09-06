import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Props02 = ({ route }) => {
  // Desestructuramos los parámetros recibidos
  const { inputValue, estado } = route.params;

  return (
    <View>
      {/* Mostramos el nombre y el estado */}
      <Text style={styles.text}>nombre: {inputValue} - estado: {estado ? 'verdadero' : 'falso'}</Text>
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

export default Props02;
