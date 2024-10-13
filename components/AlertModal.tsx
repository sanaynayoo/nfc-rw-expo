import LottieView from "lottie-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity
} from "react-native";

// icons
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

// Device With
const DeviceWh = Dimensions.get("window");

// type
interface AlertModalType {
  showModal: boolean;
  contentText: string;
  onChange: () => void;
}

const AlertModal: React.FC<AlertModalType> = ({
  showModal,
  onChange,
  contentText
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      statusBarTranslucent
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <View style={styles.errorContainer}>
            <Entypo name="cross" size={24} color="#FF0030" />
            <Text style={styles.errorText}>ERROR</Text>
          </View>
          <Text style={styles.title}> {contentText}</Text>

          {/* continue button  */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnAction}
              activeOpacity={0.8}
              onPress={onChange}
            >
              <Text style={styles.btnText}>Continue</Text>
              <FontAwesome name="caret-right" size={20} color="#C288FE" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#FFD8E0",
    flexDirection: "row",
    alignItems: "center",
    width: 90,
    paddingVertical: 1,
    marginTop: -2,
    paddingHorizontal: 2
  },
  errorText: {
    color: "#FF0030",
    fontSize: 16,
    fontWeight: "bold"
  },
  btnText: {
    fontSize: 14,
    color: "#C288FE",
    marginRight: 10,
    marginTop: -3
  },
  btnAction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 15,
    right: 10,
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 15
  },
  title: {
    // ---
    fontSize: 14,
    color: "#000",
    marginTop: 15
  },
  modalContent: {
    // --
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  titleContainerAlert: {
    width: DeviceWh.width / 2 + 130,
    height: DeviceWh.height / 4,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: "hidden",
    paddingHorizontal: 13
  },
  titleContainer: {
    // ---
    width: DeviceWh.width - 50,
    height: DeviceWh.height / 5,
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 10
  }
});
