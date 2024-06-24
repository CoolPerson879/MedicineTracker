import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Enter a valid email"),
  location: Yup.string(),
  number: Yup.number().required("Number is required"),
  category: Yup.string().required("Category is required"),
  extrafieldtwo: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

// Simple ID generator
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
};

const FormScreen = ({ navigation }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const existingData = await AsyncStorage.getItem("formData");
      const formData = existingData ? JSON.parse(existingData) : [];
      values.id = generateId(); // Add a unique ID to each form entry
      formData.push(values);
      await AsyncStorage.setItem("formData", JSON.stringify(formData));
      resetForm();
      navigation.navigate("Data");
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const [isChecked, setIsChecked] = useState(false);

  // Get the height of the tab bar dynamically
  const tabBarHeight = Platform.OS === "ios" ? 50 : 60; // Adjust as per your tab bar height

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            number: "",
            category: "Clinical",
            date: new Date(),
            time: new Date(),
            extra: "",
            extrafieldone: "",
            extrafieldtwo: "",
            extrafieldthree: "",
            extrafieldfour: "",
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <ScrollView
              contentContainerStyle={{
                ...styles.scrollContainer,
                paddingBottom: tabBarHeight, // Ensure content is above tab bar
              }}
              keyboardShouldPersistTaps="handled" // Persist keyboard dismiss on tap
            >
              <View style={styles.form}>
                <Text style={styles.label}>
                  Category <Text style={{ color: "red" }}>*</Text>
                </Text>
                <RNPickerSelect
                  onValueChange={(value) => setFieldValue("category", value)}
                  items={[
                    { label: "Clinical", value: "Clinical" },
                    { label: "Extracurricular", value: "Extracurricular" },
                    { label: "Shadowing", value: "Shadowing" },
                    { label: "Volunteer", value: "Volunteer" },
                    { label: "Research", value: "Research" },
                  ]}
                  style={{
                    inputIOS: styles.picker,
                    inputAndroid: styles.picker,
                    placeholder: { color: "#ccc" },
                  }}
                  value={values.category}
                />
                {errors.category && touched.category ? (
                  <Text style={styles.error}>{errors.category}</Text>
                ) : null}

                <Text style={styles.label}>
                  Hours <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("number")}
                  onBlur={handleBlur("number")}
                  value={values.number}
                  keyboardType="numeric"
                />
                {errors.number && touched.number ? (
                  <Text style={styles.error}>{errors.number}</Text>
                ) : null}

                <Text style={styles.label}>
                  Activity Name <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <Text style={styles.error}>{errors.name}</Text>
                ) : null}

                <Text style={styles.label}>Location/Institution</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("location")}
                  onBlur={handleBlur("location")}
                  value={values.location}
                />
                {errors.location && touched.location ? (
                  <Text style={styles.error}>{errors.location}</Text>
                ) : null}

                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, { minHeight: 40, height: "auto" }]}
                  onChangeText={handleChange("extra")}
                  onBlur={handleBlur("extra")}
                  value={values.extra}
                  multiline={true}
                />

                <View style={styles.dateTimeContainer}>
                  <View style={styles.dateTimeInput}>
                    <Text style={styles.label}>
                      Start Date <Text style={{ color: "red" }}>*</Text>
                    </Text>
                    <DateTimePicker
                      value={values.date}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setFieldValue("date", selectedDate);
                      }}
                    />
                  </View>
                  {isChecked === false && (
                    <>
                      <View style={styles.dateTimeInput}>
                        <Text style={styles.label}>End Date</Text>
                        <DateTimePicker
                          value={values.time}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setFieldValue("time", selectedDate);
                          }}
                        />
                      </View>
                    </>
                  )}
                </View>
                {/* Checkbox */}
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>In progress</Text>
                </View>
                <Button
                  onPress={toggleExpanded}
                  title={
                    expanded
                      ? "Hide Additional Fields"
                      : "Show Additional Fields"
                  }
                />

                {expanded && (
                  <>
                    <Text style={styles.label}>Institution Email</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                    ) : null}

                    <Text style={styles.label}>Institution Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange("extrafieldtwo")}
                      onBlur={handleBlur("extrafieldtwo")}
                      value={values.extrafieldtwo}
                      keyboardType="numeric"
                    />
                    {errors.extrafieldtwo && touched.extrafieldtwo ? (
                      <Text style={styles.error}>{errors.extrafieldtwo}</Text>
                    ) : null}
                  </>
                )}

                <Button onPress={handleSubmit} title="Submit" />
                <Text>
                  <Text style={{ color: "red" }}>* Required</Text>
                </Text>
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -150,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateTimeInput: {
    flex: 1,
    alignItems: "flex-start", // Align items to the left
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});

export default FormScreen;
