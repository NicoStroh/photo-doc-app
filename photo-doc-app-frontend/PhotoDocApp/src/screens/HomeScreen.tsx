import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onLogout: () => void;
  onStart: () => void;
  onOpenArchive: () => void;
}

export default function HomeScreen({ onLogout, onStart, onOpenArchive }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          Fotodokumentation starten
        </Text>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={onStart} style={styles.button}>
          <Icon name="camera-outline" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onOpenArchive} style={styles.button}>
          <Icon name="folder-open-outline" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onLogout} style={styles.button}>
          <Icon name="exit-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#00000088',
    padding: 16,
    borderRadius: 50,
  },
});
