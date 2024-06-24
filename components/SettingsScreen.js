import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Bell, Moon, Volume2Icon } from "lucide-react-native";

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const getDarkModeSetting = async () => {
      const isDarkMode = await AsyncStorage.getItem("darkModeEnabled");
      if (isDarkMode !== null) {
        setDarkModeEnabled(JSON.parse(isDarkMode));
      }
    };

    getDarkModeSetting();
  }, []);

  const toggleDarkMode = async () => {
    const newDarkModeEnabled = !darkModeEnabled;
    setDarkModeEnabled(newDarkModeEnabled);
    await AsyncStorage.setItem(
      "darkModeEnabled",
      JSON.stringify(newDarkModeEnabled)
    );
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
    // Logic to update actual notification settings in your app
  };

  const toggleSound = () => {
    setSoundEnabled((prevState) => !prevState);
    // Logic to toggle sound settings
  };

  return (
    <View
      style={[
        styles.container,
        darkModeEnabled ? styles.containerDark : styles.containerLight,
      ]}
    >
      {/* Notifications */}
      <View
        style={[
          styles.section,
          darkModeEnabled ? styles.sectionDark : styles.sectionLight,
        ]}
      >
        <Bell size={24} color="#4a90e2" style={styles.icon} />
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#767577", true: "#4a90e2" }}
          thumbColor={notificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
        />
      </View>
      <View style={styles.separator} />

      {/* Appearance */}
      <View
        style={[
          styles.section,
          darkModeEnabled ? styles.sectionDark : styles.sectionLight,
        ]}
      >
        <Moon size={24} color="#6e5494" style={styles.icon} />
        <Text style={styles.sectionTitle}>Appearance</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
          trackColor={{ false: "#767577", true: "#6e5494" }}
          thumbColor={darkModeEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
        />
      </View>
      <View style={styles.separator} />

      {/* Sound */}
      <View
        style={[
          styles.section,
          darkModeEnabled ? styles.sectionDark : styles.sectionLight,
        ]}
      >
        <Volume2Icon size={24} color="#55c42b" style={styles.icon} />
        <Text style={styles.sectionTitle}>Sound</Text>
        <Switch
          value={soundEnabled}
          onValueChange={toggleSound}
          trackColor={{ false: "#767577", true: "#55c42b" }}
          thumbColor={soundEnabled ? "#f4f3f4" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
        />
      </View>
      <View style={styles.separator} />

      {/* Sign Out */}
      <TouchableOpacity
        style={[
          styles.button,
          darkModeEnabled ? styles.buttonDark : styles.buttonLight,
        ]}
        onPress={() => {}}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "center",
  },
  containerLight: {
    backgroundColor: "#fff",
  },
  containerDark: {
    backgroundColor: "#333",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionLight: {
    backgroundColor: "#fff",
  },
  sectionDark: {
    backgroundColor: "#444",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
  },
  switch: {
    marginLeft: "auto",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonLight: {
    backgroundColor: "#f0f0f0",
  },
  buttonDark: {
    backgroundColor: "#666",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});

export default SettingsScreen;
