import React from "react";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";

// device with height
const DeviceWH = Dimensions.get("window");

// props type
interface InputFormProps {
  control: any;
  placeholder: string;
  type: string;
  icon: any;
}
const InputForm: React.FC<InputFormProps> = ({
  control,
  placeholder,
  type,
  icon
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.line} />
      <Controller
        control={control}
        rules={{
          maxLength: 100
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
        name={type}
      />
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#F4E9FF",
    padding: 5,
    borderRadius: 50
  },
  line: {
    width: 0.5,
    height: "100%",
    marginRight: 10,
    backgroundColor: "#AD5CFF"
  },
  input: {
    width: DeviceWH.width / 2 + 20,
    padding: 0,
    fontSize: 14,
    color: "#000",
    height: "100%",
    borderColor: "#AD5CFF"
  },
  inputContainer: {
    width: DeviceWH.width - 40,
    backgroundColor: "#fff",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#C288FE",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1.5
  }
});
