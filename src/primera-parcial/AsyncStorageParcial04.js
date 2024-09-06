import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button, ListItem, Text } from '@rneui/themed';

const AsyncStorageParcial04 = () => {
  const [carrera, setCarrera] = useState('');
  const [codigo, setCodigo] = useState('');
  const [facultad, setFacultad] = useState('');
  const [dataList, setDataList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      setIsDisabled(false);
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      setDataList(items.map(([id, value]) => ({ id, value })));
    } catch (error) {
      console.error('Error loading lista', error);
    }
  };

  const editar = (id, value) => {
    setCodigo(id);
    setCarrera(value.carrera);
    setFacultad(value.facultad);
    setIsDisabled(true);
  };

  const guardarOActualizar = async () => {
    try {
      if (carrera.trim() === '' || facultad.trim() === '') {
        Alert.alert('Error', 'El campo carrera y facultad no pueden estar vacíos');
        return;
      }

      await AsyncStorage.setItem(codigo, JSON.stringify({ carrera, facultad }));
      setCarrera('');
      setCodigo('');
      setFacultad("")
      listar();
      Alert.alert('Éxito', isDisabled ? 'Datos actualizados' : 'Datos guardados');
    } catch (error) {
      Alert.alert('Error', 'Error al guardar los datos');
      console.error(error);
    }
  };

  const eliminar = async (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar este dato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(id);
              listar();
              Alert.alert('Éxito', 'Datos eliminados');
            } catch (error) {
              Alert.alert('Error', 'Error al eliminar los datos');
              console.error(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Código"
        disabled={isDisabled}
        value={codigo}
        onChangeText={setCodigo}
        style={styles.input}
      />
           <Input
        placeholder="Ingrese el nombre de la facultad.."
        value={facultad}
        onChangeText={setFacultad}
        style={styles.input}
      />
      <Input
        placeholder="Ingrese el nombre de la carrera.."
        value={carrera}
        onChangeText={setCarrera}
        style={styles.input}
      />
      <Button title={isDisabled ? "Actualizar" : "Guardar"} onPress={guardarOActualizar} />
      <Text h4 style={styles.title}>Lista de Datos:</Text>
      {dataList.map(({ id, value }) => (
        <ListItem key={id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{value}</ListItem.Title>
            <ListItem.Subtitle>{id}</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            icon={{ carrera: 'edit', type: 'font-awesome', size: 15, color: 'white' }}
            buttonStyle={styles.button}
            onPress={() => editar(id, value)}
          />
          <Button
            icon={{ carrera: 'trash', type: 'font-awesome', size: 15, color: 'white' }}
            buttonStyle={[styles.button, styles.deleteButton]}
            onPress={() => eliminar(id)}
          />
        </ListItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  title: {
    marginVertical: 10,
  },
  button: {
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default AsyncStorageParcial04;