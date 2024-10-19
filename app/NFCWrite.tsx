import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Keyboard
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
import { Entypo, MaterialIcons } from "@expo/vector-icons";
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
  const [writing, setWriting] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectTypeName, setSelectedTypeName] = useState<DemoType>({
    title: "Text",
    type: "text",
    icon: <Entypo name="text" size={24} color="black" />
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      org: "",
      email: "",
      text: "",
      link: "",
      ssid: "",
      password: ""
    }
  });

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const onNFCWriteHandler = handleSubmit(async (data) => {
    switch (selectTypeName.type) {
      case "text":
        onNFCWrite(Ndef.textRecord(data.text));
        break;
      case "vcard":
        // const mimeType = new TextEncoder().encode("text/vcard");
        // const payload = new TextEncoder().encode(vCard);
        // onNFCWrite(Ndef.record(Ndef.TNF_MIME_MEDIA, mimeType, [], payload));
        const vCard = `BEGIN:VCARD\nVERSION:2.1\nN:;${data.name}\nORG: ${data.org}\nTEL;HOME:${data.phone}\nEMAIL:${data.email}\nEND:VCARD`;
        onNFCWrite(Ndef.record(Ndef.TNF_MIME_MEDIA, "text/vcard", [], vCard));
        break;
      case "wifi":
        onNFCWrite(
          Ndef.wifiSimpleRecord({ ssid: data.ssid, networkKey: data.password })
        );
        break;
      default:
        onNFCWrite(Ndef.uriRecord(data.link));
        break;
    }
  });

  const onNFCWrite = async (cardData: any) => {
    if (cardData) {
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
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  // select card type
  const onSelectedHandler = (cardType: DemoType) => {
    setSelectedTypeName(cardType);
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {selectTypeName.icon}
              <Text style={{ marginLeft: 10, fontSize: 14 }}>
                {selectTypeName.title}
              </Text>
            </View>
            <Feather name="chevron-down" size={24} color="#A86CE5" />
          </TouchableOpacity>
        </View>

        {selectTypeName.type === "vcard" ? (
          <View>
            {/* --- Name Input ---- */}
            <InputForm
              control={control}
              placeholder="Name"
              type="name"
              icon={<FontAwesome5 name="user" size={20} color="#A86CE5" />}
            />

            {/* --- Phone Input ---- */}
            <InputForm
              control={control}
              placeholder="Phone Number"
              type="phone"
              icon={<Feather name="phone" size={22} color="#A86CE5" />}
            />

            {/* --- Email Input ---- */}
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

            {/* --- Org Input ---- */}
            <InputForm
              control={control}
              placeholder="Organization"
              type="org"
              icon={<Octicons name="organization" size={20} color="#A86CE5" />}
            />
          </View>
        ) : selectTypeName.type === "wifi" ? (
          <View>
            {/* --- SSID Input ---- */}
            <InputForm
              control={control}
              placeholder="Wifi Name"
              type="ssid"
              icon={<Feather name="wifi" size={22} color="#A86CE5" />}
            />

            {/* --- Password Input ---- */}
            <InputForm
              control={control}
              placeholder="Password"
              type="password"
              icon={
                <MaterialIcons name="lock-outline" size={24} color="#A86CE5" />
              }
            />
          </View>
        ) : selectTypeName.type === "text" ? (
          <View>
            {/* --- Name Input ---- */}
            <InputForm
              control={control}
              placeholder={`Enter your text`}
              type="text"
              icon={
                selectTypeName.type == "text" ? (
                  <Entypo name="text" size={24} color="#A86CE5" />
                ) : (
                  <Entypo name="link" size={24} color="#A86CE5" />
                )
              }
            />
          </View>
        ) : (
          <View>
            {/* --- Link Input ---- */}
            <InputForm
              control={control}
              placeholder={`Enter your link`}
              type="link"
              icon={
                selectTypeName.type == "text" ? (
                  <Entypo name="text" size={24} color="#A86CE5" />
                ) : (
                  <Entypo name="link" size={24} color="#A86CE5" />
                )
              }
            />
          </View>
        )}

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
        selected={selectTypeName.type}
        onSelect={onSelectedHandler}
      />

      {/* ------ alert ------ */}
      <AlertModal
        showModal={showAlert}
        contentText={`Please add your ${selectTypeName.title} and continue`}
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
    alignItems: "center",
    width: "50%",
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    borderColor: "#C288FE",
    paddingVertical: 14
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
    marginTop: 20
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
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});
