import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  apartmentId: number;
  apartmentName: string;
  onBack: () => void;
  onSelectRoom: (roomId: number, roomName: string) => void;
}

interface Room {
  id: number;
  name: string;
}

export default function SelectRoomScreen({ apartmentId, apartmentName, onBack, onSelectRoom }: Props) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:5000/api/location/apartments/${apartmentId}/rooms`);
        setRooms(response.data);
      } catch (err) {
        console.error('Fehler beim Laden der Räume', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [apartmentId]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onSelectRoom(item)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{apartmentName}</Text>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 16, paddingTop: 48 },
  item: {
    padding: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 12,
  },
  itemText: { fontSize: 18 },
  footer: {
    backgroundColor: '#007BFF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});
