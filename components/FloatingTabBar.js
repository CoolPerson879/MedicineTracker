import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const FloatingTabBar = () => {
  const goToScreen = (screenName) => {
    Navigation.push("AppStack", {
      component: {
        name: screenName,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goToScreen("Screen1")}>
        <Icon name="ios-home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goToScreen("Screen2")}>
        <Icon name="ios-search" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goToScreen("Screen3")}>
        <Icon name="ios-notifications" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goToScreen("Screen4")}>
        <Icon name="ios-person" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => goToScreen("Screen5")}
      >
        <Icon name="ios-add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    elevation: 8,
  },
  centerButton: {
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingTabBar;
