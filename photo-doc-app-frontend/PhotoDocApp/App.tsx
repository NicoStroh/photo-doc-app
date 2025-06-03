import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SelectBuildingScreen from './src/screens/SelectBuildingScreen';
import SelectFloorScreen from './src/screens/SelectFloorScreen';
import SelectApartmentScreen from './src/screens/SelectApartmentScreen';
import SelectRoomScreen from './src/screens/SelectRoomScreen';
import CaptureImageScreen from './src/screens/CaptureImageScreen';
import UploadScreen from './src/screens/UploadScreen';
import SpinnerScreen from './src/screens/SpinnerScreen';
import SuccessfulUploadScreen from './src/screens/SuccessfulUploadScreen';
import ArchiveScreen from './src/screens/ArchiveScreen';
import PhotoMetadataScreen from './src/screens/PhotoMetadataScreen';

type Screen =
  | 'login'
  | 'home'
  | 'select-building'
  | 'select-floor'
  | 'select-apartment'
  | 'select-room'
  | 'upload'
  | 'successful-save'
  | 'archive'
  | 'photo-metadata';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');

  const [username, setUsername] = useState<string | null>(null);
  
  const [selectedBuilding, setSelectedBuilding] = useState<{ id: string; name: string } | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<{ id: string; name: string } | null>(null);
  const [selectedApartment, setSelectedApartment] = useState<{ id: string; name: string } | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<{ id: string; name: string } | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const location =
    selectedBuilding && selectedFloor && selectedApartment && selectedRoom
      ? `${selectedBuilding.name} / ${selectedFloor.name} / ${selectedApartment.name} / ${selectedRoom.name}`
      : '';

  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {screen === 'login' && (
        <LoginScreen
          onLoginSuccess={(username) => {
            setUsername(username);
            setScreen('home');
          }}
        />
      )}

      {screen === 'home' && (
        <HomeScreen
          onLogout={() => setScreen('login')}
          onStart={() => setScreen('select-building')}
          onOpenArchive={() => setScreen('archive')}
        />
      )}

      {screen === 'select-building' && (
        <SelectBuildingScreen
          onBack={() => setScreen('home')}
          onSelectBuilding={(building) => {
            setSelectedBuilding(building);
            setScreen('select-floor');
          }}
        />
      )}

      {screen === 'select-floor' && selectedBuilding && (
        <SelectFloorScreen
          buildingId={selectedBuilding.id}
          buildingName={selectedBuilding.name}
          onBack={() => setScreen('select-building')}
          onSelectFloor={(floor) => {
            setSelectedFloor(floor);
            setScreen('select-apartment');
          }}
        />
      )}

      {screen === 'select-apartment' && selectedFloor && (
        <SelectApartmentScreen
          floorId={selectedFloor.id}
          floorName={selectedFloor.name}
          onBack={() => setScreen('select-floor')}
          onSelectApartment={(apartment) => {
            setSelectedApartment(apartment);
            setScreen('select-room');
          }}
        />
      )}

      {screen === 'select-room' && selectedApartment && (
        <SelectRoomScreen
          apartmentId={selectedApartment.id}
          apartmentName={selectedApartment.name}
          onBack={() => setScreen('select-apartment')}
          onSelectRoom={(room) => {
            setSelectedRoom(room);
            setScreen('capture-image');
          }}
        />
      )}

      {screen === 'capture-image' &&
        selectedRoom &&
        selectedApartment &&
        selectedFloor &&
        selectedBuilding && (
          <CaptureImageScreen
            location={location}
            onBack={() => setScreen('select-room')}
            onSave={(imageUri) => {
              setSelectedImage(imageUri);
              setScreen('upload');
            }}
          />
        )}

      {screen === 'upload' && selectedImage && (
        <UploadScreen
          imageUri={selectedImage}
          location={location}
          username={username}
          onBack={() => setScreen('capture-image')}
          onFinishUpload={(success) => {
            setUploadSuccess(success);
            setScreen('successful-save');
          }}
        />
      )}

      {screen === 'successful-save' && uploadSuccess && (
        <SuccessfulUploadScreen
          onDone={() => setScreen('login')}
          onAddAnother={() => setScreen('capture-image')}
        />
      )}

      {screen === 'archive' && username && (
        <ArchiveScreen
          username={username}
          onBack={() => setScreen('home')}
          onPress={(id) => {
                     setSelectedPhotoId(id);
                     setScreen('photo-metadata');
          }}
        />
      )}

      {screen === 'photo-metadata' && selectedPhotoId && (
        <PhotoMetadataScreen
          photoId={selectedPhotoId}
          onBack={() => setScreen('archive')}
        />
      )}
    </View>
  );
}
