import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import dimension from "../responsive_size/dimension";
import Barbie from "../assets/barbie.png";

const Mainpage = () => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  const songs = {
    '1': require('../assets/song.mp3'),
    '2': require('../assets/nokia.mp3'),
    '3': require('../assets/devvuda.mp3'),
    '4': require('../assets/ring.mp3'),
    '5': require('../assets/song.mp3'),
    '6': require('../assets/devvuda.mp3'),
    '7': require('../assets/nokia.mp3'),
    '8': require('../assets/ring.mp3'),
    '9': require('../assets/devvuda.mp3'),
    '0': require('../assets/nokia.mp3'),
    '*': require('../assets/song.mp3'),
    '#': require('../assets/ring.mp3'),
  };

  const [sound, setSound] = useState(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSong = async (buttonValue) => {
    try {
      const songFile = songs[buttonValue];

      if (!songFile) {
        console.log(`No song for ${buttonValue}`);
        return;
      }

      // Stop and unload previous sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      // Load new sound
      const { sound: newSound } = await Audio.Sound.createAsync(songFile);

      setSound(newSound); // Save reference
      await newSound.playAsync(); // Safe to call now

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.isPlaying) {
          console.log("🎵 Song is playing");
        }
        if (!status.isLoaded) {
          console.log("⚠️ Sound not loaded");
        }
      });
    } catch (error) {
      console.error("❌ Error playing sound:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        {/* Image container */}

      <View style={styles.imgcontainer}>
        <Image source={Barbie} style={styles.barbie} />
      </View>

      {/* Dialpad container */}
      <View style={styles.dialpadcontainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => playSong(button)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D8246F",
    flex: 1,
  },
  imgcontainer: {
    alignItems: 'center',
  },
  barbie: {
    width: dimension.scale(320),
    height: dimension.verticalScale(320),
    marginTop: dimension.window.height * 0.1,
  },
  dialpadcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: dimension.spacing.sm,
    marginTop: dimension.spacing.xxxl,
    marginLeft: dimension.spacing.xl,
  },
  button: {
    width: '20%',
    aspectRatio: 1,
    margin: '1%',
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    marginRight: 35,
    marginTop: 25,
  },
  buttonText: {
    fontSize: dimension.fontSize.xxl,
    fontWeight: 'bold',
  },
});

export default Mainpage;
