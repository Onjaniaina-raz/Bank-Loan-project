import { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import api from "../services/api";
import "../../styles/global.css";

const List = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await api.get("/projet30");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
      Alert.alert(
        "Error",
        "Failed to load loans. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredData = loans.filter(
    (item) =>
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.account_number.toString().includes(searchQuery),
  );

  const getInterestColor = (percent) => {
    if (percent < 5) return "#4caf50";
    if (percent < 8) return "#ff9800";
    return "#f44336";
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this loan?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/projet30/${id}`);
              // Refresh the list after deletion
              fetchLoans();
              Alert.alert("Success", "Loan deleted successfully");
            } catch (error) {
              console.error("Error deleting loan:", error);
              Alert.alert("Error", "Failed to delete loan");
            }
          },
        },
      ],
    );
  };

  const handleUpdate = (item) => {
  router.push({
    pathname: '/update',
    params: { loanId: item.id }
  });
};

  if (loading) {
    return (
      <View className="flex-1 bg-bank-01 justify-center items-center">
        <ActivityIndicator size="large" color="#568259" />
        <Text className="mt-4 text-gray-500">Loading loans...</Text>
      </View>
    );
  }

  return (
    
    <View className="flex-1 bg-bank-01">
      {/* Header */}
      <View className="bg-bank-05 pt-12 pb-4 px-4">
        <Text className="text-bank-01 text-2xl font-bold">Loan list</Text>
        <Text className="text-bank-01 text-sm opacity-80 mt-1">
          Manage and track all your loans
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 -mt-4 mb-2">
        <View className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
          <View className="flex-row items-center">
            <Ionicons name="search-outline" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-base text-gray-800"
              placeholder="Search by client or bank..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#9ca3af" />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      {/* Results Count */}
      {searchQuery.length > 0 && (
        <Text className="text-gray-500 text-xs px-4 mb-2">
          Found {filteredData.length} result(s)
        </Text>
      )}

      {/* Loan List */}
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <Pressable className="mx-4 mb-3">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              {/* Header - Client and Amount with Action Buttons */}
              <View className="flex-row justify-between items-center mb-3 pb-2 border-b border-gray-100">
                <View className="flex-row items-center gap-2 flex-1">
                  <View className="bg-bank-01 rounded-full p-2">
                    <Ionicons name="person-outline" size={18} color="#568259" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-bank-05 text-base">
                      {item.client}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      Acc: {item.account_number}
                    </Text>
                  </View>
                </View>

                {/* Amount Badge */}
                <View className="bg-green-50 px-3 py-1 rounded-full flex-row items-center gap-1">
                  <Ionicons name="cash-outline" size={14} color="#4caf50" />
                  <Text className="font-bold text-green-600 text-sm">
                    Ar {item.amount.toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* Bank Info */}
              <View className="flex-row items-center gap-2 mb-3">
                <Ionicons name="business-outline" size={16} color="#6b7280" />
                <Text className="text-gray-600 text-sm flex-1">
                  {item.bank}
                </Text>
              </View>

              {/* Date and Interest */}
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                  <Text className="text-gray-400 text-xs">
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
                <View
                  className="px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${getInterestColor(item.loan)}20`,
                  }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: getInterestColor(item.loan) }}
                  >
                    {item.loan}% APR
                  </Text>
                </View>
              </View>

              {/* Total to Pay */}
              {/* Total to Pay */}
              <View className="bg-bank-01 rounded-lg p-3 mt-1 mb-3">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="wallet-outline" size={16} color="#568259" />
                    <Text className="text-bank-05 text-xs font-semibold">
                      TOTAL TO PAY
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      name="trending-up-outline"
                      size={14}
                      color="#f44336"
                    />
                    <Text className="font-bold text-red-500 text-base">
                      
                      Ar{" "}
                      {(
                        Number(item.amount) * (Number(item.loan) / 100) +
                        Number(item.amount)
                      ).toFixed(0)}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-gray-400 text-xs">
                    Principal: Ar {Number(item.amount).toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    Interest: Ar{" "}
                    {(Number(item.amount) * (Number(item.loan) / 100)).toFixed(
                      2,
                    )}
                  </Text>
                </View>
              </View>

              {/* Action Buttons - Delete & Update */}
              <View className="flex-row gap-3">
                {/* Update Button */}
                <Pressable
                  onPress={() => handleUpdate(item)}
                  className="flex-1 bg-blue-50 py-2 rounded-lg flex-row items-center justify-center gap-2"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Ionicons name="create-outline" size={18} color="#3b82f6" />
                  <Text className="text-blue-600 font-semibold text-sm">
                    Update
                  </Text>
                </Pressable>

                {/* Delete Button */}
                <Pressable
                  onPress={() => handleDelete(item.id)}
                  className="flex-1 bg-red-50 py-2 rounded-lg flex-row items-center justify-center gap-2"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  <Text className="text-red-600 font-semibold text-sm">
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={loading}
        onRefresh={fetchLoans}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 mt-4 text-center text-base">
              No loans found
            </Text>
            <Text className="text-gray-300 text-sm mt-1">
              {searchQuery
                ? "Try searching for something else"
                : "Pull down to refresh"}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default List;
