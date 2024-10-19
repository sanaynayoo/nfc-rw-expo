import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

// icon
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

// components
import NFCCategory from "@/components/NFCCategory";
import AlertModal from "@/components/AlertModal";

// hook
import { useToastAndroidIOS } from "@/hooks/useToastAndroidIOS";

// Device WH
const DeviceWH = Dimensions.get("window");

const NFCWriter = () => {
  const [isNFCSupport, setIsNFCSupport] = useState<boolean>(false);
  const animationRef = useRef<LottieView>(null);
  const [showAlert, setShowAlert] = useState(false);

  const { ToastAndroidIOS } = useToastAndroidIOS();

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);

  useEffect(() => {
    // Initialize NFC Manager
    const initialNFC = async () => {
      await NfcManager.isSupported().then((res) => {
        if (res) {
          setIsNFCSupport(true);
          NfcManager.start();
        } else {
          setIsNFCSupport(false);
        }
      });
    };

    initialNFC();
  }, []);

  // to enable nfc
  const goToNfcSetting = async () => {
    return NfcManager.goToNfcSetting();
  };

  const onNFCScanHandler = () => {
    if (isNFCSupport) {
      router.push("/NFCScan");
    } else {
      ToastAndroidIOS("Your device does not have NFC capabilities");
    }
  };

  const onNFCWriteHandler = () => {
    if (!isNFCSupport) {
      router.push("/NFCWrite");
    } else {
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* ---- nfc info ---- */}
      <View style={styles.nfcHeaderContainer}>
        <View style={styles.nfcContainer}>
          {isNFCSupport ? (
            <MaterialCommunityIcons
              name="cellphone-nfc"
              size={30}
              color="#fff"
            />
          ) : (
            <MaterialCommunityIcons
              name="cellphone-nfc-off"
              size={30}
              color="#fff"
            />
          )}
          <Text style={{ marginLeft: 10, color: "#fff", fontSize: 16 }}>
            NFC
          </Text>
          <View
            style={[
              styles.nfcActiveContainer,
              { backgroundColor: isNFCSupport ? "#73DC45" : "#FF1D1D" }
            ]}
          />
        </View>

        {/* ----- enable NFC ----- */}
        <TouchableOpacity
          style={{ backgroundColor: "#fff" }}
          activeOpacity={0.5}
          onPress={goToNfcSetting}
        >
          <View style={{ alignItems: "flex-end" }}>
            <Ionicons name="settings" size={26} color="#32357A" />
          </View>
          <Text style={{ marginTop: 5, fontSize: 14, color: "#32357A" }}>
            NFC Settings
          </Text>
        </TouchableOpacity>
      </View>

      {/* ---- NFC Option --- */}
      <NFCCategory onScan={onNFCScanHandler} onWrite={onNFCWriteHandler} />

      {/* ------ alert ------ */}
      <AlertModal
        showModal={showAlert}
        contentText={`Your device does not have NFC capabilities.`}
        onChange={() => setShowAlert(false)}
      />
    </View>
  );
};

export default NFCWriter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  nfcActiveContainer: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: "#fff",
    position: "absolute",
    top: -3,
    right: -5
  },
  nfcHeaderContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10
  },
  nfcContainer: {
    width: DeviceWH.width / 4 + 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#32357A",
    borderRadius: 10
  }
});
