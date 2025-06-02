import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

interface Props {
  photoId: string;
  onBack: () => void;
}

interface PhotoDocument {
  id: string;
  fileName: string;
  username: string;
  craft: string;
  defectType: string;
  description: string;
  startProcess: boolean;
  location: string;
  imageData: string;
}

export default function PhotoMetadataScreen({ photoId, onBack }: Props) {
  const [photo, setPhoto] = useState<PhotoDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/photos/${photoId}`);
        setPhoto(response.data);
      } catch (error) {
        console.error('Fehler beim Laden der Bilddetails:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photoId]);

  if (loading || !photo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${photo.imageData}` }}
        style={styles.image}
      />

      <Text style={styles.label}>ID:</Text>
      <Text style={styles.value}>{photo.id}</Text>

      <Text style={styles.label}>Dateiname:</Text>
      <Text style={styles.value}>{photo.fileName}</Text>

      <Text style={styles.label}>Benutzername:</Text>
      <Text style={styles.value}>{photo.username}</Text>

      <Text style={styles.label}>Gewerk:</Text>
      <Text style={styles.value}>{photo.craft}</Text>

      <Text style={styles.label}>Mangeltyp:</Text>
      <Text style={styles.value}>{photo.defectType}</Text>

      <Text style={styles.label}>Beschreibung:</Text>
      <Text style={styles.value}>{photo.description}</Text>

      <Text style={styles.label}>Mängelprozess starten:</Text>
      <Text style={styles.value}>{photo.startProcess ? 'Ja' : 'Nein'}</Text>

      <Text style={styles.label}>Ort:</Text>
      <Text style={styles.value}>{photo.location}</Text>

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backText}>Zurück</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    marginBottom: 4,
  },
  backButton: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
