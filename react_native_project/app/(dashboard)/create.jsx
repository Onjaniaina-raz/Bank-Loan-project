import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
import "../../styles/global.css";

const Create = () => {
  const [formData, setFormData] = useState({
    account_number: "",
    client: "",
    bank: "",
    amount: "",
    loan: "",
  });
  const [loading, setLoading] = useState(false);

  // Get current date in the desired format
  const getCurrentDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.account_number || !formData.client || !formData.bank || !formData.amount || !formData.loan) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Prepare data for backend
    const loanData = {
      account_number: parseInt(formData.account_number),
      client: formData.client,
      bank: formData.bank,
      amount: parseInt(formData.amount),
      loan: parseFloat(formData.loan),
      // date will be set automatically by backend
    };

    try {
      setLoading(true);
      const response = await api.post('/projet30', loanData);
      console.log("Loan created:", response.data);
      
      Alert.alert(
        "Success", 
        "Loan created successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setFormData({
                account_number: "",
                client: "",
                bank: "",
                amount: "",
                loan: "",
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error creating loan:", error);
      Alert.alert("Error", "Failed to create loan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-bank-01 flex items-center justify-center gap-8">
      <Text className="relative bottom-4 font-bold text-bank-05 text-balance text-xl">
        M a k e    a    L o a n    <Ionicons name="card-outline" size={24} color="#464e47" />
      </Text>
      
      <View className="bg-white w-[80%] h-[60%] rounded-lg border">
        <ScrollView className="h-full w-full px-6 my-8">
          <View className="flex gap-6">
            {/* Current Date Display */}
            <View className="bg-bank-01 rounded-lg p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="calendar-outline" size={20} color="#568259" />
                <Text className="text-bank-05 font-semibold">Current Date:</Text>
              </View>
              <Text className="text-bank-05 font-bold text-base">
                {getCurrentDate()}
              </Text>
            </View>

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
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#f1fffa" />
        ) : (
          <>
            <Text className="text-bank-01">I N S E R T</Text>
            <Ionicons name="arrow-forward" color="#f1fffa" size={18} />
          </>
        )}
      </Pressable>
    </View>
  );
};

export default Create;