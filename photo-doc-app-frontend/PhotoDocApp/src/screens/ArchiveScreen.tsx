import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

interface Props {
  username: string;
  onBack: () => void;
  onPress: (id: string) => void;
}

interface PhotoDocument {
  id: string;
  fileName: string;
  imageData: string;
}

export default function ArchiveScreen({ username, onBack, onPress }: Props) {
  const [photos, setPhotos] = useState<PhotoDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/photos/user/${username}`);
        setPhotos(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Fotos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [username]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archiv von {username}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.thumbnailContainer} onPress={() => onPress(item.id)}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imageData}` }}
                style={styles.thumbnail}
              />
              <Text style={styles.filename}>{item.fileName}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>Zurück</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 32,
  },
  thumbnailContainer: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  filename: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
