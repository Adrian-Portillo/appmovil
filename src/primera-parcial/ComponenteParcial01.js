import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input, ListItem} from '@rneui/base';

const ComponenteParcial01 = ({navigation}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Examen Primera Parcial</Text>
      <View style={styles.containerImagen}>
      <Image
        style={styles.logo}
        source={require('../assets/politecnica.jpg')}
      />
      </View>
      <Input
        placeholder="Ingresar nombre"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <ScrollView>
        <ListItem
          bottomDivider
          onPress={() =>
            navigation.navigate('PropsParcial02', {
              inputValue,
              semestre: 8,
            })
          }>
          <ListItem.Content>
            <ListItem.Title>PropsParcial02</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider onPress={() => navigation.navigate('AxiosParcial03')}>
          <ListItem.Content>
            <ListItem.Title>AxiosParcial03</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem
          bottomDivider
          onPress={() => navigation.navigate('AsyncStorageParcial04')}>
          <ListItem.Content>
            <ListItem.Title>AsyncStorageParcial04</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  
  },
  containerImagen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 30,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default ComponenteParcial01;
