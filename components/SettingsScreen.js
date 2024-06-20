import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Settings as SettingsIcon } from "lucide-react-native";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton}>
          <SettingsIcon size={24} color="#7F5DF0" />
          <Text style={styles.menuItemText}>General Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton}>
          <SettingsIcon size={24} color="#7F5DF0" />
          <Text style={styles.menuItemText}>Account Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton}>
          <SettingsIcon size={24} color="#7F5DF0" />
          <Text style={styles.menuItemText}>Privacy Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuItemButton}>
          <SettingsIcon size={24} color="#7F5DF0" />
          <Text style={styles.menuItemText}>Notification Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuItemButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333333",
  },
});

export default SettingsScreen;
