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
import { API_BASE_URL } from '../config/api.js';

interface Props {
  onBack: () => void;
  onSelectBuilding: (building: { id: string; name: string }) => void;
}

interface Building {
  id: string;
  name: string;
}

export default function SelectBuildingScreen({ onBack, onSelectBuilding }: Props) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/location/buildings`);
        setBuildings(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Gebäude:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={buildings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onSelectBuilding(item)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Location</Text>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-back" size={24} color="#fff" />
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007BFF',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});
