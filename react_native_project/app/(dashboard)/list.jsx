import { useState } from "react";
import { FlatList, Text, TextInput, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import "../../styles/global.css";

const loanData = [
  {
    id: "1",
    accountNumber: "123456789",
    client: "John Doe",
    bank: "Chase Bank",
    amount: 5000,
    date: "2024-03-31",
    loanPercent: 5.5,
  },
  {
    id: "2",
    accountNumber: "987654321",
    client: "Jane Smith",
    bank: "Bank of America",
    amount: 10000,
    date: "2024-03-30",
    loanPercent: 4.2,
  },
];

const List = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = loanData.filter((item) =>
    item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.accountNumber.includes(searchQuery)
  );

  const getInterestColor = (percent) => {
    if (percent < 5) return "#4caf50";
    if (percent < 8) return "#ff9800";
    return "#f44336";
  };

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
              {/* Header - Client and Amount */}
              <View className="flex-row justify-between items-center mb-3 pb-2 border-b border-gray-100">
                <View className="flex-row items-center gap-2">
                  <View className="bg-bank-01 rounded-full p-2">
                    <Ionicons name="person-outline" size={18} color="#568259" />
                  </View>
                  <View>
                    <Text className="font-bold text-bank-05 text-base">
                      {item.client}
                    </Text>
                    <Text className="text-gray-400 text-xs">
                      Acc: {item.accountNumber}
                    </Text>
                  </View>
                </View>
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
                <Text className="text-gray-600 text-sm">{item.bank}</Text>
              </View>

              {/* Date and Interest */}
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center gap-1">
                  <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                  <Text className="text-gray-400 text-xs">{item.date}</Text>
                </View>
                <View 
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${getInterestColor(item.loanPercent)}20` }}
                >
                  <Text 
                    className="text-xs font-semibold"
                    style={{ color: getInterestColor(item.loanPercent) }}
                  >
                    {item.loanPercent}% APR
                  </Text>
                </View>
              </View>

              {/* Total to Pay */}
              <View className="bg-bank-01 rounded-lg p-3 mt-1">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="wallet-outline" size={16} color="#568259" />
                    <Text className="text-bank-05 text-xs font-semibold">
                      TOTAL TO PAY
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="trending-up-outline" size={14} color="#f44336" />
                    <Text className="font-bold text-red-500 text-base">
                      Ar {(item.amount * (item.loanPercent / 100) + item.amount).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-gray-400 text-xs">
                    Principal: Ar {item.amount.toLocaleString()}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    Interest: Ar {(item.amount * (item.loanPercent / 100)).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 mt-4 text-center text-base">
              No loans found
            </Text>
            <Text className="text-gray-300 text-sm mt-1">
              Try searching for something else
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default List;