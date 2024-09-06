import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Card, Button, Overlay, SearchBar, Text } from '@rneui/themed';
import Axios from 'axios';

const AxiosParcial03 = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data); // Para inicializar con todos los datos
      })
      .catch(error => console.error(error));
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
    setFilteredData(
      data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    );
  };

  const toggleOverlay = (item) => {
    setSelectedItem(item);
    setVisible(!visible);
  };

  return (
    <View>
      <SearchBar
        round
        placeholder="Buscar..."
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.name}</Card.Title>
            <Card.Divider />
            <Text>Email: {item.email}</Text>
            <Text>Id: {item.id}</Text>
            <Button title="Ver Detalles" onPress={() => toggleOverlay(item)} />
          </Card>
        )}
      />
      {selectedItem && (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} 
                        style={{ width: 300, height: 250, padding: 10 }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedItem.name}</Text>
            <Text>Email: {selectedItem.email}</Text>
            <Text>Phone: {selectedItem.id}</Text>
            <Button title="Cerrar" onPress={toggleOverlay} />
          </View>
        </Overlay>
      )}
    </View>
  );
};

export default AxiosParcial03;
