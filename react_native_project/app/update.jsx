import { useState, useEffect, useRef } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import api from "./services/api";
import "../styles/global.css";

const Update = () => {
  const { loanId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    account_number: "",
    client: "",
    bank: "",
    amount: "",
    loan: "",
    day: "",
    month: "",
    year: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  // Refs for scrolling to inputs
  const scrollViewRef = useRef();
  const inputRefs = {
    account_number: useRef(),
    client: useRef(),
    bank: useRef(),
    amount: useRef(),
    loan: useRef(),
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 50 }, (_, i) =>
    (new Date().getFullYear() - 25 + i).toString(),
  );

  const getMonthName = (monthNum) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[parseInt(monthNum) - 1];
  };

  const getCurrentDateDisplay = () => {
    if (!formData.day || !formData.month || !formData.year)
      return "Select Date";
    return `${formData.day} - ${getMonthName(formData.month)} - ${formData.year}`;
  };

  useEffect(() => {
    if (loanId) {
      fetchLoanData();
    }
  }, [loanId]);

  const fetchLoanData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/projet30/${loanId}`);
      const loan = response.data;

      const dateParts = loan.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      setFormData({
        account_number: loan.account_number.toString(),
        client: loan.client,
        bank: loan.bank,
        amount: loan.amount.toString(),
        loan: loan.loan.toString(),
        day: day,
        month: month,
        year: year,
      });
    } catch (error) {
      console.error("Error fetching loan:", error);
      Alert.alert("Error", "Failed to load loan data");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const openDatePicker = () => {
    Keyboard.dismiss();
    setTempDate({
      day: formData.day,
      month: formData.month,
      year: formData.year,
    });
    setShowDatePicker(true);
  };

  const confirmDate = () => {
    setFormData({
      ...formData,
      day: tempDate.day,
      month: tempDate.month,
      year: tempDate.year,
    });
    setShowDatePicker(false);
  };

  const handleUpdate = async () => {
    Keyboard.dismiss();
    if (
      !formData.account_number ||
      !formData.client ||
      !formData.bank ||
      !formData.amount ||
      !formData.loan
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const dateString = `${formData.year}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2, "0")}`;

    const loanData = {
      account_number: parseInt(formData.account_number),
      client: formData.client,
      bank: formData.bank,
      amount: parseInt(formData.amount),
      loan: parseFloat(formData.loan),
      date: dateString,
    };

    try {
      setSubmitting(true);
      await api.patch(`/projet30/${loanId}`, loanData);

      Alert.alert("Success", "Loan updated successfully!", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (error) {
      console.error("Error updating loan:", error);
      Alert.alert("Error", "Failed to update loan. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle focus to scroll to input
  const handleInputFocus = (field, yPosition) => {
    scrollViewRef.current?.scrollTo({
      y: yPosition,
      animated: true,
    });
  };

  if (loading) {
    return (
      <View className="flex-1 bg-bank-01 justify-center items-center">
        <ActivityIndicator size="large" color="#568259" />
        <Text className="mt-4 text-gray-500">Loading loan data...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-bank-01"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-bank-01">
          <Text className="text-center mt-12 font-bold text-bank-05 text-xl">
            U p d a t e    L o a n{" "}
            <Ionicons name="create-outline" size={24} color="#464e47" />
          </Text>

          <View className="bg-white w-[90%] h-[70%] rounded-lg border self-center mt-8">
            <ScrollView
              ref={scrollViewRef}
              className="h-full w-full px-6 py-4"
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
            >
              <View className="flex gap-4 pb-8">
                {/* Date Picker Button */}
                <Pressable
                  onPress={openDatePicker}
                  className="bg-bank-01 rounded-lg p-4 flex-row items-center justify-between active:opacity-75"
                >
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="calendar-outline" size={20} color="#568259" />
                    <Text className="text-bank-05 font-semibold">Select Date:</Text>
                  </View>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-bank-05 font-bold text-base">
                      {getCurrentDateDisplay()}
                    </Text>
                    <Ionicons name="chevron-down" size={18} color="#568259" />
                  </View>
                </Pressable>

                <TextInput
                  ref={inputRefs.account_number}
                  className="p-4 rounded-lg border border-bank-05 bg-white"
                  placeholder="Account number"
                  keyboardType="numeric"
                  value={formData.account_number}
                  onChangeText={(text) => handleChange("account_number", text)}
                  onFocus={() => handleInputFocus('account_number', 0)}
                  returnKeyType="next"
                  onSubmitEditing={() => inputRefs.client.current?.focus()}
                />

                <TextInput
                  ref={inputRefs.client}
                  className="p-4 rounded-lg border border-bank-05 bg-white"
                  placeholder="Client"
                  value={formData.client}
                  onChangeText={(text) => handleChange("client", text)}
                  onFocus={() => handleInputFocus('client', 100)}
                  returnKeyType="next"
                  onSubmitEditing={() => inputRefs.bank.current?.focus()}
                />

                <TextInput
                  ref={inputRefs.bank}
                  className="p-4 rounded-lg border border-bank-05 bg-white"
                  placeholder="Bank"
                  value={formData.bank}
                  onChangeText={(text) => handleChange("bank", text)}
                  onFocus={() => handleInputFocus('bank', 200)}
                  returnKeyType="next"
                  onSubmitEditing={() => inputRefs.amount.current?.focus()}
                />

                <TextInput
                  ref={inputRefs.amount}
                  className="p-4 rounded-lg border border-bank-05 bg-white"
                  placeholder="Amount"
                  keyboardType="numeric"
                  value={formData.amount}
                  onChangeText={(text) => handleChange("amount", text)}
                  onFocus={() => handleInputFocus('amount', 300)}
                  returnKeyType="next"
                  onSubmitEditing={() => inputRefs.loan.current?.focus()}
                />

                <TextInput
                  ref={inputRefs.loan}
                  className="p-4 rounded-lg border border-bank-05 bg-white"
                  placeholder="Loan %"
                  keyboardType="numeric"
                  value={formData.loan}
                  onChangeText={(text) => handleChange("loan", text)}
                  onFocus={() => handleInputFocus('loan', 400)}
                  returnKeyType="done"
                  onSubmitEditing={handleUpdate}
                />
              </View>
            </ScrollView>
          </View>

          <Pressable
            className="w-[90%] self-center flex flex-row justify-center items-center gap-2 bg-bank-04 py-4 rounded-lg active:opacity-75 mt-6"
            activeOpacity={0.7}
            onPress={handleUpdate}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#f1fffa" />
            ) : (
              <>
                <Text className="text-bank-01 font-bold">U P D A T E</Text>
                <Ionicons name="refresh-outline" color="#f1fffa" size={18} />
              </>
            )}
          </Pressable>
        </View>
      </TouchableWithoutFeedback>

      {/* Custom Date Picker Modal */}
      <Modal visible={showDatePicker} transparent={true} animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-bank-05">
                Select Date
              </Text>
              <Pressable onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </Pressable>
            </View>

            <View className="flex-row gap-4 mb-6">
              {/* Days Column */}
              <View className="flex-1">
                <Text className="text-center font-semibold text-bank-05 mb-2">
                  Day
                </Text>
                <ScrollView className="h-48" nestedScrollEnabled={true}>
                  {days.map((day) => (
                    <Pressable
                      key={day}
                      onPress={() => setTempDate({ ...tempDate, day })}
                      className={`p-3 rounded-lg mb-1 ${
                        tempDate.day === day ? "bg-bank-01" : "bg-gray-50"
                      }`}
                    >
                      <Text
                        className={`text-center ${
                          tempDate.day === day
                            ? "text-bank-05 font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {day}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Months Column */}
              <View className="flex-1">
                <Text className="text-center font-semibold text-bank-05 mb-2">
                  Month
                </Text>
                <ScrollView className="h-48" nestedScrollEnabled={true}>
                  {months.map((month) => (
                    <Pressable
                      key={month}
                      onPress={() => setTempDate({ ...tempDate, month })}
                      className={`p-3 rounded-lg mb-1 ${
                        tempDate.month === month ? "bg-bank-01" : "bg-gray-50"
                      }`}
                    >
                      <Text
                        className={`text-center ${
                          tempDate.month === month
                            ? "text-bank-05 font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {getMonthName(month)}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Years Column */}
              <View className="flex-1">
                <Text className="text-center font-semibold text-bank-05 mb-2">
                  Year
                </Text>
                <ScrollView className="h-48" nestedScrollEnabled={true}>
                  {years.map((year) => (
                    <Pressable
                      key={year}
                      onPress={() => setTempDate({ ...tempDate, year })}
                      className={`p-3 rounded-lg mb-1 ${
                        tempDate.year === year ? "bg-bank-01" : "bg-gray-50"
                      }`}
                    >
                      <Text
                        className={`text-center ${
                          tempDate.year === year
                            ? "text-bank-05 font-bold"
                            : "text-gray-600"
                        }`}
                      >
                        {year}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            <Pressable
              onPress={confirmDate}
              className="bg-bank-04 py-4 rounded-lg active:opacity-75"
            >
              <Text className="text-bank-01 text-center font-bold">
                Confirm Date
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Update;