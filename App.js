import React from 'react';
import {Button, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {PERMISSIONS, request} from 'react-native-permissions';

let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

var Sound = require('react-native-sound');
const sound = new Sound(audioPath, '');

export default function App() {
  const [onCall, setOnCall] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const handleCallNow = async () => {
    setShow(false);
    const status = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    if (status === 'granted') {
      RNImmediatePhoneCall.immediatePhoneCall('8484820498');
      setOnCall(true);
      await AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'High',
        AudioEncoding: 'aac',
      });
      AudioRecorder.startRecording();
    }
  };

  const playAudio = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setTimeout(() => {
        sound.play((success) => {
          if (!success) {
            setIsPlaying(false);
            Alert.alert('Error', 'no records found');
          }
        });
      }, 100);
    }, 100);
  };

  const stopAudio = () => {
    sound.stop();
  };

  const handleStopRecording = async () => {
    setOnCall(false);
    await AudioRecorder.stopRecording();
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {show ? (
        <View style={styles.tile}>
          <Text style={{marginVertical: 10}}>
            {AudioUtils.DocumentDirectoryPath + '/test.aac'}
          </Text>
          <Button
            title={isPlaying ? 'Stop' : 'Play'}
            onPress={isPlaying ? stopAudio : playAudio}
          />
        </View>
      ) : (
        <></>
      )}

      <View style={styles.button}>
        <Button
          title={onCall ? 'Stop recording' : 'Call Now'}
          onPress={onCall ? handleStopRecording : handleCallNow}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  tile: {
    marginTop: 15,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
