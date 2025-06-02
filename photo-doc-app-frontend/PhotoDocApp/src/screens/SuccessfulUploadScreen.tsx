import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onDone: () => void;
  onAddAnother: () => void;
}

export default function SuccessfulUploadScreen({ onDone, onAddAnother }: Props) {
  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle" size={96} color="#007BFF" />
      <Text style={styles.text}>Das Bild wurde erfolgreich abgelegt!</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onDone}>
          <Text style={styles.buttonText}>Beenden</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onAddAnother}>
          <Text style={styles.buttonText}>Weiteres Foto hinzufügen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 48,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
