import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface Props {
  location: string;
  onBack: () => void;
  onSave: (imageUri) => void;
}

export default function CaptureImageScreen({ location, onBack, onSave }: Props) {
  const [imageUri, setImageUri] = useState<string | null>(null);

    async function requestPermission() {

      if (Platform.OS === 'android') {
          const permission = Platform.Version >= 33
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

          const cameraStatus = await check(PERMISSIONS.ANDROID.CAMERA);
          const photoStatus = await check(permission);

          if (cameraStatus !== RESULTS.GRANTED) {
            await request(PERMISSIONS.ANDROID.CAMERA);
          }

          if (photoStatus !== RESULTS.GRANTED) {
            await request(permission);
          }
        }
  }

  const handleCapture = async () => {

    const hasPermission = await requestPermission();

    try {
      const result = await launchCamera({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri || null);
      }
    } catch (err) {
      console.error('Kamera-Fehler:', err);
    }

  };

  const handleSelect = async () => {

    const hasPermission = await requestPermission();

    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri || null);
      }
    } catch (err) {
      console.error('Galerie-Fehler:', err);
    }
  };

  const resetImage = () => {
      setImageUri(null);
  };

  const handleSave = () => {
    if (imageUri) {
      onSave(imageUri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderOptions}>
            <TouchableOpacity onPress={handleSelect} style={styles.placeholderButton}>
              <Text style={styles.placeholderText}>Bild aus Galerie wählen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCapture} style={styles.placeholderButton}>
              <Text style={styles.placeholderText}>Kamera öffnen</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          onPress={imageUri ? resetImage : undefined}
          style={[styles.changeButton, !imageUri && styles.disabledButton]}
          disabled={! imageUri}>
          <Text style={[styles.changeButtonText, !imageUri && styles.disabledText]}>Foto ändern</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={imageUri ? handleSave : undefined}
          style={[styles.saveButton, !imageUri && styles.disabledButton]}
          disabled={! imageUri}>
          <Text style={styles.saveButtonText}>Foto speichern</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{location}</Text>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderOptions: {
    alignItems: 'center',
  },
  placeholderButton: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 8,
    marginVertical: 8,
  },
  placeholderText: {
    fontSize: 18,
    color: '#444',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  changeButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  changeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#888',
  },
  footer: {
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
