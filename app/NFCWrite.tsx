import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

// device with height
const DeviceWH = Dimensions.get("window");

// ICONS
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const NFCWrite = () => {
  const [addData, setAddData] = useState("");
  const [writing, setWriting] = useState(false);

  const onNFCWriteHandler = async () => {
    setWriting(true);
    try {
      // Request NFC Technology
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Create an NDEF message to write
      // const bytes = Ndef.encodeMessage([Ndef.textRecord(addData)]);
      const bytes = Ndef.encodeMessage([Ndef.uriRecord(addData)]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes); // Write the message
      }
    } catch (ex) {
      console.warn("nfc error :", ex);
      setWriting(false);
    } finally {
      setWriting(false);
      NfcManager.cancelTechnologyRequest(); // Reset NFC
    }
  };
  return (
    <View style={styles.container}>
      {/* ---- input ----- */}
      <View style={{ width: DeviceWH.width - 40 }}>
        <Text style={styles.title}>Hold your device near the NFC tag.</Text>
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="filetext1" size={24} color="#9456D3" />
        <TextInput
          placeholder="Enter your data"
          value={addData}
          onChangeText={setAddData}
          style={styles.input}
          keyboardType="default"
        />
      </View>

      {/* --- button ---- */}
      <TouchableOpacity
        style={styles.buttonContainer}
        activeOpacity={0.8}
        onPress={onNFCWriteHandler}
      >
        <Text style={styles.nfcWritingText}>
          {writing ? "Writing NFC card..." : "WRITE NFC Card"}
        </Text>
        <View style={styles.nfcIconContainer}>
          {writing ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Feather name="arrow-right" size={24} color="#fff" />
          )}
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
  nfcWritingText: {
    marginHorizontal: 10,
    color: "#8858BA",
    fontWeight: "bold",
    fontSize: 15
  },
  nfcIconContainer: {
    backgroundColor: "#C288FE",
    padding: 5,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 8 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  },
  title: {
    color: "#7142A1",
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonContainer: {
    height: 45,
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
    width: DeviceWH.width / 2 + 80,
    padding: 0,
    fontSize: 14,
    color: "#000",
    height: "100%",
    marginLeft: 10
  },
  inputContainer: {
    width: DeviceWH.width - 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5
  }
});
