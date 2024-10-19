import React, { Ref, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// icons
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

// Device Width
const DeviceWH = Dimensions.get("window");

// type
interface DemoType {
  title: string;
  type: string;
  icon: any;
}

interface BottomSheetType {
  data: DemoType[];
  bottomRef: any;
  selected: string;
  onSelect: (value: DemoType) => void;
}

const BottomSheets: React.FC<BottomSheetType> = ({
  bottomRef,
  selected,
  data,
  onSelect
}) => {
  // snapPoints
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheetModal
      ref={bottomRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.directionContainer}>
            {/* <Feather name="arrow-up-right" size={24} color="#8858BA" /> */}
            <MaterialCommunityIcons
              name="form-dropdown"
              size={24}
              color="#C288FE"
            />
          </View>
          <Text style={styles.cardTtitle}>Select Write Card Type</Text>
        </View>
        <View style={styles.listContainer}>
          {data.map((list, idx) => (
            <View key={idx}>
              <TouchableOpacity
                style={styles.listItem}
                activeOpacity={0.6}
                onPress={() => onSelect(list)}
              >
                <View style={{ flexDirection: "row" }}>
                  {list.icon}
                  <Text style={styles.listText}>{list.title}</Text>
                </View>
                {selected === list.type ? (
                  <Ionicons name="checkmark-circle" size={24} color="#C288FE" />
                ) : null}
              </TouchableOpacity>
              <View style={styles.line} />
            </View>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ddd"
  },
  directionContainer: {
    backgroundColor: "#F1E4FF",
    borderRadius: 50,
    padding: 10
  },
  line: {
    width: DeviceWH.width - 30,
    height: 0.5,
    backgroundColor: "#ddd"
  },
  listText: {
    marginLeft: 10
  },
  listItem: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listContainer: {
    width: DeviceWH.width,
    paddingHorizontal: 20
  },
  cardTtitle: {
    fontSize: 16,
    color: "#8858BA",
    fontWeight: "bold",
    marginLeft: 10
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: DeviceWH.width,
    paddingHorizontal: 15,
    marginBottom: 10
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  }
});

export default BottomSheets;
