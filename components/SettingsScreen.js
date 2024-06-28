import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Bell, Moon, Volume2Icon } from "lucide-react-native";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [profile, setProfile] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await AsyncStorage.getItem("userProfile");
      if (userProfile) {
        setProfile(JSON.parse(userProfile));
      }
    };

    fetchProfile();
  }, []);

  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
    // Logic to update actual notification settings in your app
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled((prevState) => !prevState);
    // Logic to apply dark mode to your app
  };

  const toggleSound = () => {
    setSoundEnabled((prevState) => !prevState);
    // Logic to toggle sound settings
  };

  return (
    <View style={styles.container}>
      {/* Profile */}
      <View style={styles.profileSection}>
        <Text style={styles.profileTitle}>Profile</Text>
        <Text style={styles.profileText}>Username: {profile.username}</Text>
        <Text style={styles.profileText}>Email: {profile.email}</Text>
      </View>
      <View style={styles.separator} />

      {/* Notifications */}
      <View style={styles.section}>
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
      <View style={styles.section}>
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
      <View style={styles.section}>
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
        style={styles.button}
        onPress={async () => {
          await AsyncStorage.removeItem("userProfile");
          // Optionally navigate to login screen or reload the app
        }}
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
    backgroundColor: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 16,
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
