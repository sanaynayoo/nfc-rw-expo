import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from "react-native";

// icons
import Feather from "@expo/vector-icons/Feather";
import LottieView from "lottie-react-native";

// width & height
const DeviceWH = Dimensions.get("window");

interface NFCProps {
  onScan: () => void;
  onWrite: () => void;
}
const NFCCategory: React.FC<NFCProps> = ({ onWrite, onScan }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* -- read nfc -- */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.nfcContianer, { backgroundColor: "#D0D3FC" }]}
        onPress={onScan}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>NFC Scan</Text>
          <View style={styles.iconContainer}>
            <Feather name="arrow-right" size={24} color="#fff" />
          </View>
        </View>
        {/* --- nfc --- */}
        <View style={{ marginTop: -15 }}>
          <LottieView
            source={require("@/assets/icons/NFCRead.json")}
            autoPlay
            loop
            style={{ width: "100%", height: 90 }}
          />
        </View>
      </TouchableOpacity>

      {/* --- write nfc -- */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.nfcContianer, { backgroundColor: "#E0C3FE" }]}
        onPress={onWrite}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>NFC Write</Text>
          <View style={[styles.iconContainer, { backgroundColor: "#C288FE" }]}>
            <Feather name="arrow-right" size={24} color="#fff" />
          </View>
        </View>
        {/* --- nfc --- */}
        <View style={{ marginTop: -15 }}>
          <LottieView
            source={require("@/assets/icons/NFCWrite.json")}
            autoPlay
            loop
            style={{ width: "100%", height: 90 }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NFCCategory;

const styles = StyleSheet.create({
  container: {
    width: DeviceWH.width,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  nfcContianer: {
    width: DeviceWH.width / 2 - 20,
    height: DeviceWH.height / 6,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  },
  iconContainer: {
    backgroundColor: "#A6ACFC",
    alignSelf: "flex-end",
    padding: 6.5,
    borderRadius: 50,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  }
});
