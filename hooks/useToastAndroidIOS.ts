import Toast from "react-native-root-toast";

export const useToastAndroidIOS = () => {
  const ToastAndroidIOS = (text: string) => {
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      textColor: "#8858BA",
      backgroundColor: "#F9F3FF",
      animation: true,
      shadow: false,
      textStyle: {
        fontSize: 16,
        lineHeight: 25,
        paddingHorizontal: 10
      }
    });
  };

  return { ToastAndroidIOS };
};
