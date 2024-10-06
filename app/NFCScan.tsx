import React from "react";
import { StyleSheet, Text, View, SafeAreaView ,TouchableOpacity} from "react-native";

const NFCScan = () => {
  return (
    <SafeAreaView style={styles.container}>

        {/* -- read nfc -- */}
      <TouchableOpacity>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </TouchableOpacity>

      {/* --- write nfc -- */}
      <TouchableOpacity>
        <Text>Hello</Text>
        <Text>Hello</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NFCScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
