import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions
} from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";

// device window
const DeviceWH = Dimensions.get("window");

const NFCScan = () => {
  const [nfcData, setNfcData] = useState<string | undefined>("");

  useEffect(() => {
    readNfcData();
  }, []);

  const readNfcData = async () => {
    try {
      // Request NFC Tech
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Read tag data
      const tag = await NfcManager.getTag();
      console.log("NFC Data:", tag?.techTypes);
      setNfcData(tag?.id);
    } catch (error) {
      console.warn("NFC Read Error", error);
    } finally {
      // Stop NFC reading
      await NfcManager.cancelTechnologyRequest();
      console.log("NFC Manager stopped");
    }
  };

  // NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
  //   console.log("Tag Discovered", tag);
  //   setNfcData(tag.id);
  //   // NfcManager.setAlertMessageIOS("NFC Tag Discovered");
  //   // NfcManager.unregisterTagEvent().catch(() => 0);
  // });

  // // Enable NFC reading
  // NfcManager.registerTagEvent();

  // return () => {
  //   NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //   // NfcManager.unregisterTagEvent().catch(() => 0);
  //   // NfcManager.stop();
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* -- read nfc -- */}
      {nfcData ? (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold" }}>
            {nfcData}
          </Text>
        </View>
      ) : (
        <View style={styles.nfcContainer}>
          <LottieView
            source={require("@/assets/icons/NFCScan.json")}
            autoPlay
            loop
            style={{ width: "100%", height: 300 }}
          />

          <Text style={styles.nfcText}>Searching NFC card...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NFCScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  nfcContainer: {
    width: DeviceWH.width,
    alignItems: "center"
  },
  nfcText: {
    fontSize: 16

    // fontWeight: "bold"
  }
});
