import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';

export default function QRScreen() {
  const [inputText, setInputText] = useState('');
  const [showQR, setShowQR] = useState(false);
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#000000';
  const backgroundColor = isDark ? '#000000' : '#FFFFFF';
  const borderColor = isDark ? '#888888' : '#CCCCCC';

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    inputText
  )}`;

  const handleGenerateQR = () => {
    if (inputText.trim()) {
      setShowQR(true);
    }
  };
  const handleClear = () => {
    setInputText('');
    setShowQR(false);
  };


  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>QR Code Generator</Text>

      <TextInput
        style={[
          styles.input,
          { color: textColor, borderColor: borderColor, backgroundColor: isDark ? '#1c1c1c' : '#f9f9f9' },
        ]}
        placeholder="Enter text or URL to generate QR code"
        placeholderTextColor={isDark ? '#AAAAAA' : '#666666'}
        value={inputText}
        onChangeText={setInputText}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Generate" onPress={handleGenerateQR} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Clean" onPress={handleClear} color="#FF5C5C" />
        </View>
      </View>

      {showQR && (
        <View style={styles.qrContainer}>
          <Image source={{ uri: qrUrl }} style={styles.qrImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrImage: {
    width: 200,
    height: 200,
    borderWidth: 1,
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 20,
},
buttonWrapper: {
  flex: 1,
  marginHorizontal: 5,
}

});
