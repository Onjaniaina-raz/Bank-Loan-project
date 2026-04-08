import { useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import api from "./services/api";
import "../styles/global.css";

const Update = () => {
  const { loanId } = useLocalSearchParams(); // Get loanId from URL params
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

  // Rest of your code remains the same...
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
      router.back(); // Use router.back() instead of navigation.goBack()
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const openDatePicker = () => {
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
    // Validation
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

    // Create date string in YYYY-MM-DD format for backend
    const dateString = `${formData.year}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2, "0")}`;

    // Prepare data for backend
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
            router.back(); // Go back to list
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

  if (loading) {
    return (
      <View className="flex-1 bg-bank-01 justify-center items-center">
        <ActivityIndicator size="large" color="#568259" />
        <Text className="mt-4 text-gray-500">Loading loan data...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bank-01 flex items-center justify-center gap-8">
      <Text className="relative bottom-4 font-bold text-bank-05 text-balance text-xl">
        U p d a t e L o a n{" "}
        <Ionicons name="create-outline" size={24} color="#464e47" />
      </Text>

      <View className="bg-white w-[80%] h-[60%] rounded-lg border">
        <ScrollView className="h-full w-full px-6 my-8">
          <View className="flex gap-6">
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
              className="p-4 rounded-lg border border-bank-05"
              placeholder="Account number"
              keyboardType="numeric"
              value={formData.account_number}
              onChangeText={(text) => handleChange("account_number", text)}
            />

            <TextInput
              className="p-4 rounded-lg border border-bank-05"
              placeholder="Client"
              value={formData.client}
              onChangeText={(text) => handleChange("client", text)}
            />

            <TextInput
              className="p-4 rounded-lg border border-bank-05"
              placeholder="Bank"
              value={formData.bank}
              onChangeText={(text) => handleChange("bank", text)}
            />

            <TextInput
              className="p-4 rounded-lg border border-bank-05"
              placeholder="Amount"
              keyboardType="numeric"
              value={formData.amount}
              onChangeText={(text) => handleChange("amount", text)}
            />

            <TextInput
              className="p-4 rounded-lg border border-bank-05"
              placeholder="Loan %"
              keyboardType="numeric"
              value={formData.loan}
              onChangeText={(text) => handleChange("loan", text)}
            />
          </View>
        </ScrollView>
      </View>

      <Pressable
        className="w-[300px] flex flex-row justify-center items-center gap-2 bg-bank-04 py-4 rounded-lg active:opacity-75"
        activeOpacity={0.7}
        onPress={handleUpdate}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#f1fffa" />
        ) : (
          <>
            <Text className="text-bank-01">U P D A T E</Text>
            <Ionicons name="refresh-outline" color="#f1fffa" size={18} />
          </>
        )}
      </Pressable>

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
                <ScrollView className="h-48">
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
                <ScrollView className="h-48">
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
                <ScrollView className="h-48">
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
    </View>
  );
};

export default Update;
