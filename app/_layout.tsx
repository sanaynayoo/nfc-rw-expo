import { Stack } from "expo-router";
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";

function InitialLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Read / Write NFC Card",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#32357A" }
        }}
      />

      <Stack.Screen
        name="NFCScan"
        options={{
          title: "Read NFC Card",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#32357A" }
        }}
      />

      <Stack.Screen
        name="NFCWrite"
        options={{
          title: "Write NFC Card",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#32357A" }
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <InitialLayout />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
}
