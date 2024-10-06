import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

// device with height
const DeviceWH = Dimensions.get("window");

// ICONS
import Feather from "@expo/vector-icons/Feather";

const NFCWrite = () => {
  const [message, setMessage] = useState("");

  const onNFCWriteHandler = async () => {
    try {
      // Request NFC Technology
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Create an NDEF message to write
      const bytes = Ndef.encodeMessage([Ndef.textRecord(message)]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes); // Write the message
        // alert("Successfully wrote to the NFC tag!");
      }
    } catch (ex) {
      console.warn(ex);
      //   alert("Failed to write to NFC tag");
    } finally {
      NfcManager.cancelTechnologyRequest(); // Reset NFC
    }
  };
  return (
    <View style={styles.container}>
      {/* ---- input ----- */}
      <View style={{ width: DeviceWH.width - 40 }}>
        <Text style={styles.title}>
          Please add you want to write text in NFC card
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your text"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
      </View>

      {/* --- button ---- */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={onNFCWriteHandler}
      >
        <Text
          style={{
            marginHorizontal: 10,
            color: "#8858BA",
            fontWeight: "bold",
            fontSize: 15
          }}
        >
          WRITE NFC Card
        </Text>
        <View
          style={{
            backgroundColor: "#C288FE",
            padding: 5,
            borderRadius: 50,
            shadowOffset: { width: 0, height: 8 },
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 2
          }}
        >
          <Feather name="arrow-right" size={24} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NFCWrite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  title: {
    color: "#7142A1",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: "#E0C3FE",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  },
  input: {
    padding: 0
  },
  inputContainer: {
    width: DeviceWH.width - 40,
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5
  }
});
