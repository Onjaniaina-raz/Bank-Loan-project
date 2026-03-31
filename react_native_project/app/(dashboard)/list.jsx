import { FlatList, Text, View } from "react-native";
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
  return (
    <View className="flex-1 bg-bank-01 flex p-4 gap-4">
      <FlatList
        data={loanData}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg p-4 mb-3 mx-4 border">
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row">
                <Ionicons name="person-outline" size={20} color="#000" />
                <Text className="font-semibold "> : {item.client}</Text>
              </View>
              <View className="flex-row gap-2 items-center">
                <Text className="text-sm text-[#568259]">Ar {item.amount}</Text>
                <Ionicons name="cash-outline" size={16} color="green" />
              </View>
            </View>

            <View className="flex-row">
              <Ionicons name="business-outline" size={20} color="#000" />
              <Text className="text-sm text-bank-04">
                <Text className="font-bold text-black"> : </Text>
                {item.bank}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 text-xs my-3">{item.date}</Text>
              <Text className="text-gray-500 text-md my-3">{item.loanPercent} %</Text>
            </View>

            <View className="flex-row">
              <Ionicons name="wallet-outline" size={20} color="#000" />
              <Text className="font-bold text-black"> : </Text>
              <Text className="font-bold text-red-400">
                {(
                  parseFloat(item.amount) *
                    (parseFloat(item.loanPercent) / 100) +
                  parseFloat(item.amount)
                ).toFixed(2)}{" "}
                Ar
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
      />
    </View>
  );
};

export default List;
