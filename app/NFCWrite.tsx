import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Checkbox from "expo-checkbox";
import { useForm } from "react-hook-form";

// component
import BottomSheets from "@/components/BottomSheet";
import InputForm from "@/components/InputForm";

// device with height
const DeviceWH = Dimensions.get("window");

// icons
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Entypo } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AlertModal from "@/components/AlertModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";

// list type
interface DemoType {
  title: string;
  type: string;
  icon: any;
}
// demo
let listTypeDemo: DemoType[] = [
  {
    title: "Text",
    type: "text",
    icon: <Entypo name="text" size={24} color="black" />
  },
  {
    title: "Wi-Fi Credentials",
    type: "wifi",
    icon: <Ionicons name="wifi" size={24} color="black" />
  },
  {
    title: "Web Url",
    type: "url",
    icon: <Entypo name="link" size={24} color="black" />
  },
  {
    title: "VCard",
    type: "vcard",
    icon: <FontAwesome6 name="vcard" size={24} color="black" />
  }
];

const NFCWrite = () => {
  const [addData, setAddData] = useState("");
  const [writing, setWriting] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [selectedType, setSelectedType] = useState("text");
  const [showAlert, setShowAlert] = useState(false);

  const {
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      org: "",
      email: ""
    }
  });

  // vCard
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");

  // wifi
  const [ssid, setSSID] = useState("");
  const [wifiPwd, setWifiPwd] = useState("");

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onNFCWriteHandler = () => {
    switch (selectedType) {
      case "text":
        onNFCWrite(Ndef.textRecord(addData));
        break;
      case "vcard":
        // const mimeType = new TextEncoder().encode("text/vcard");
        // const payload = new TextEncoder().encode(vCard);
        // onNFCWrite(Ndef.record(Ndef.TNF_MIME_MEDIA, mimeType, [], payload));
        const vCard = `BEGIN:VCARD\nVERSION:2.1\nN:;${name}\nORG: ${org}\nTEL;HOME:${phone}\nEMAIL:${email}\nEND:VCARD`;
        onNFCWrite(Ndef.record(Ndef.TNF_MIME_MEDIA, "text/vcard", [], vCard));
        break;
      case "wifi":
        onNFCWrite(Ndef.wifiSimpleRecord({ ssid: ssid, networkKey: wifiPwd }));
        break;
      default:
        onNFCWrite(Ndef.uriRecord(addData));
        break;
    }
  };
  const onNFCWrite = async (cardData: any) => {
    if (addData) {
      setWriting(true);
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef);

        // Encode and write your message
        const bytes = Ndef.encodeMessage([cardData]);

        if (bytes) {
          await NfcManager.ndefHandler.writeNdefMessage(bytes);
          if (readOnly) {
            await NfcManager.ndefHandler.makeReadOnly();
          }
        }
      } catch (ex) {
        console.warn("nfc error :", ex);
        setWriting(false);
      } finally {
        setWriting(false);
        NfcManager.cancelTechnologyRequest(); // Reset NFC
      }
    } else {
      setShowAlert(true);
    }
  };

  // callbacks
  const onShowTypeHandler = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // select card type
  const onSelectedHandler = (cardType: DemoType) => {
    setSelectedType(cardType.type);
    setTimeout(() => {
      bottomSheetModalRef.current?.close();
    }, 300);
  };

  return (
    <View style={styles.container}>
      {/* ---- input ----- */}
      <View style={{ width: DeviceWH.width - 40 }}>
        <Text style={styles.title}>Hold your device near the NFC tag</Text>
      </View>
      <View style={styles.inputContainerSection}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.containerSelected}
            activeOpacity={0.6}
            onPress={onShowTypeHandler}
          >
            <MaterialCommunityIcons
              name="form-dropdown"
              size={24}
              color="#C288FE"
            />
            <Text style={{ paddingLeft: 5, color: "#C288FE", fontSize: 13 }}>
              Select
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder={`Enter your ${selectedType}`}
            value={addData}
            onChangeText={setAddData}
            style={styles.input}
            keyboardType="default"
          />
        </View>

        <View>
          {/* --- Name Input ---- */}
          <InputForm
            control={control}
            placeholder="Name"
            type="name"
            icon={<FontAwesome5 name="user" size={22} color="#A86CE5" />}
          />

          {/* --- Name Input ---- */}
          <InputForm
            control={control}
            placeholder="Phone Number"
            type="phone"
            icon={<Feather name="phone" size={24} color="#A86CE5" />}
          />

          {/* --- Name Input ---- */}
          <InputForm
            control={control}
            placeholder="Email"
            type="email"
            icon={
              <MaterialCommunityIcons
                name="email-edit-outline"
                size={24}
                color="#A86CE5"
              />
            }
          />

          {/* --- Name Input ---- */}
          <InputForm
            control={control}
            placeholder="Organization"
            type="org"
            icon={<Octicons name="organization" size={24} color="#A86CE5" />}
          />
        </View>

        {/* ----- Write with readonly ------- */}

        <View style={styles.optionContainer}>
          <Checkbox
            style={styles.checkbox}
            value={readOnly}
            onValueChange={setReadOnly}
            color={readOnly ? "#8858BA" : "#8858BA"}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setReadOnly(!readOnly)}
          >
            <Text style={styles.readonlyText}>Write Readonly</Text>
          </TouchableOpacity>
        </View>
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

      {/* --- Bottom Sheet --- */}
      <BottomSheets
        data={listTypeDemo}
        bottomRef={bottomSheetModalRef}
        selected={selectedType}
        onSelect={onSelectedHandler}
      />

      {/* ------ alert ------ */}
      <AlertModal
        showModal={showAlert}
        contentText={`Please add your ${selectedType} and continue`}
        onChange={() => setShowAlert(false)}
      />
    </View>
  );
};

export default NFCWrite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#FBFBFB"
  },
  readonlyText: {
    // ---
    fontSize: 14,
    color: "#8858BA",
    marginLeft: 10
  },
  checkbox: {
    // ---
  },
  optionContainer: {
    width: DeviceWH.width - 35,
    paddingHorizontal: 4,
    marginTop: 15,
    flexDirection: "row"
  },
  containerSelected: {
    flexDirection: "row",
    alignItems: "center"
  },
  selectType: {
    marginLeft: 10
  },
  selectButtonContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(225,255,255,0.5)"
  },
  selectionTypeCotnainer: {
    width: DeviceWH.width - 40,
    marginVertical: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  inputContainerSection: {
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between"
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
    width: DeviceWH.width / 2 + 20,
    padding: 0,
    fontSize: 14,
    color: "#000",
    height: "100%",
    paddingLeft: 10,
    marginLeft: 10,
    borderLeftWidth: 0.8,
    borderColor: "#AD5CFF"
  },
  inputContainer: {
    width: DeviceWH.width - 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C288FE",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  }
});
