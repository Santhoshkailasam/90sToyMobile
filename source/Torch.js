import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Torch from "react-native-torch";
import { Platform } from "react-native";

const FlashlightToggle = () => {
  const [isTorchOn, setIsTorchOn] = useState(false);

  const toggleFlashlight = () => {
    setIsTorchOn(!isTorchOn);
    Torch.switchState(!isTorchOn);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={toggleFlashlight}
        style={{
          padding: 15,
          backgroundColor: isTorchOn ? "red" : "green",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          {isTorchOn ? "Turn Off" : "Turn On"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FlashlightToggle;
