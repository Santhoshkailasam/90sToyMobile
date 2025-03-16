import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

const Mainpage = () => {
    const [sound, setSound] = useState(null);
    const [currentSong, setCurrentSong] = useState(null); // Track which song is playing

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync(); // Cleanup on unmount
            }
        };
    }, [sound]);

    const playSong = async (songFile) => {
        try {
            // Stop and unload current sound if playing
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            // Load and play the new song
            const { sound: newSound } = await Audio.Sound.createAsync(
                songFile,
                { shouldPlay: true }
            );
            setSound(newSound);
            setCurrentSong(songFile);
        } catch (error) {
            console.log("Error playing sound:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.insidebox}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => playSong(require("../assets/devvuda.mp3"))} 
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>
                        Play Song 1
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, { marginTop: 20 }]} 
                    onPress={() => playSong(require("../assets/nokia.mp3"))} 
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>
                        Play Song 2
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E0218A",
        flex: 1
    },
    insidebox: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    button: {
        backgroundColor: "blue",
        borderRadius: 50,
        height: 60,
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default Mainpage;
