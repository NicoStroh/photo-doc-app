import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert
    } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.js';

interface Props {
  imageUri: string;
  location: string;
  onBack: () => void;
  username: string;
  onStartUpload: () => void;
  onFinishUpload: (success: boolean) => void;
}

export default function MetadataScreen({ imageUri, location, onBack, username, onStartUpload, onFinishUpload} : Props) {

  const [craftOpen, setCraftOpen] = useState(false);
  const [defectTypeOpen, setDefectTypeOpen] = useState(false);

  const [craft, setCraft] = useState(null);
  const [defectType, setDefectType] = useState(null);
  const [description, setDescription] = useState('');
  const [startProcess, setStartProcess] = useState(false);

  const [craftOptions, setCraftOptions] = useState([
    { label: 'Elektro', value: 'Elektro' },
    { label: 'Sanitär', value: 'Sanitär' },
    { label: 'Heizung', value: 'Heizung' },
    { label: 'Lüftung', value: 'Lüftung' },
  ]);

  const [defectTypeOptions, setDefectTypeOptions] = useState([
    { label: 'Steckdose', value: 'Steckdose' },
    { label: 'Lichtschalter', value: 'Lichtschalter' },
    { label: 'Waschbecken', value: 'Waschbecken' },
    { label: 'WC', value: 'WC' },
    { label: 'Heizkörper', value: 'Heizkörper' },
    { label: 'Fenster', value: 'Fenster' },
  ]);

  const [uploading, setUploading] = useState(false);

  const handleSave = async () => {

    onStartUpload();

    const formData = new FormData();

    formData.append('username', username);
    formData.append('craft', craft);
    formData.append('defectType', defectType);
    formData.append('description', description);
    formData.append('startProcess', startProcess.toString());
    formData.append('location', location);

    // Konvertiere URI in File-Objekt
    formData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/photos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload erfolgreich:', response.data);
      return response.data;
    } catch (error) {
      console.error('Upload fehlgeschlagen:', error);
      throw error;
    } finally {
      onFinishUpload(true);
    }

  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={{ uri: imageUri }} style={styles.image} />

          <Text style={styles.label}>Gewerk</Text>
          <DropDownPicker
            open={craftOpen}
            value={craft}
            items={craftOptions}
            setOpen={setCraftOpen}
            setValue={setCraft}
            setItems={setCraftOptions}
            placeholder="Bitte wählen"
            style={styles.dropdown}
            zIndex={3000}
            zIndexInverse={1000}
          />

          <Text style={styles.label}>Mangeltyp</Text>
          <DropDownPicker
            open={defectTypeOpen}
            value={defectType}
            items={defectTypeOptions}
            setOpen={setDefectTypeOpen}
            setValue={setDefectType}
            setItems={setDefectTypeOptions}
            placeholder="Bitte wählen"
            style={styles.dropdown}
            zIndex={2000}
            zIndexInverse={2000}
          />

          <Text style={styles.label}>Beschreibung</Text>
          <TextInput
            style={styles.textArea}
            multiline
            onChangeText={setDescription}
            value={description}
            placeholder="Beschreibe den Mangel"
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={startProcess}
              onValueChange={setStartProcess}
            />
            <Text style={styles.checkboxLabel}>Mängelprozess starten</Text>
          </View>

          <Button title="Speichern" onPress={handleSave} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{location}</Text>
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 16,
  },
  dropdown: {
    marginBottom: 16,
  },
  textArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: 'top',
    marginBottom: 16,
    padding: 8,
    height: 150,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
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
  locationText: {
    flexShrink: 1,
    fontStyle: 'italic',
  },
});
