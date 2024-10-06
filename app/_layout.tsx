import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
          title: "Read / Write NFC Card",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: "#32357A" }
        }}
      />

    <Stack.Screen name="NFCScan" options={{
            title: "Read NFC Card",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#32357A" }
          }}
        />

    <Stack.Screen name="NFCWrite" options={{
            title: "Write NFC Card",
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: "#32357A" }
          }}
        />
    </Stack>
  );
}
