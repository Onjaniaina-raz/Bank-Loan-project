import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import '../../styles/global.css';
import api from '../services/api';

const Histogram = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalToPay: 0,
    minPayment: 0,
    maxPayment: 0,
    averagePayment: 0,
    totalLoans: 0,
  });
  const [chartType, setChartType] = useState('pie'); 

  const screenWidth = Dimensions.get('window').width;
  const calculateTotalPayment = (amount, loanPercent) => {
    return Number(amount) * (Number(loanPercent) / 100) + Number(amount);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projet30');
      setLoans(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
      Alert.alert('Error', 'Failed to load loan data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (loanData) => {
    
    const payments = loanData.map(loan => {
      return calculateTotalPayment(loan.amount, loan.loan);
    });

    const total = payments.reduce((sum, payment) => sum + payment, 0);
    const min = Math.min(...payments);
    const max = Math.max(...payments);
    const avg = total / payments.length;

    setStats({
      totalToPay: total,
      minPayment: min,
      maxPayment: max,
      averagePayment: avg,
      totalLoans: loanData.length,
    });
  };

  const getPieChartData = () => {
    const sortedLoans = [...loans]
      .sort((a, b) => {
        const paymentA = calculateTotalPayment(a.amount, a.loan);
        const paymentB = calculateTotalPayment(b.amount, b.loan);
        return paymentB - paymentA;
      })
      .slice(0, 5);

    const colors = ['#568259', '#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF'];
    
    return sortedLoans.map((loan, index) => ({
      name: loan.client.length > 12 ? loan.client.substring(0, 12) + '...' : loan.client,
      population: calculateTotalPayment(loan.amount, loan.loan),
      color: colors[index % colors.length],
      legendFontColor: '#7F8C8D',
      legendFontSize: 12,
    }));
  };

  const getBarChartData = () => {
    const sortedLoans = [...loans]
      .sort((a, b) => {
        const paymentA = calculateTotalPayment(a.amount, a.loan);
        const paymentB = calculateTotalPayment(b.amount, b.loan);
        return paymentB - paymentA;
      })
      .slice(0, 8);

    return {
      labels: sortedLoans.map(loan => 
        loan.client.length > 8 ? loan.client.substring(0, 8) + '...' : loan.client
      ),
      datasets: [{
        data: sortedLoans.map(loan => calculateTotalPayment(loan.amount, loan.loan)),
      }],
    };
  };

  const formatCurrency = (amount) => {
    return `Ar ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  if (loading) {
    return (
      <View className="flex-1 bg-bank-01 justify-center items-center">
        <ActivityIndicator size="large" color="#568259" />
        <Text className="mt-4 text-gray-500">Loading statistics...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bank-01">
      {/* Header */}
      <View className="bg-bank-05 pt-12 pb-6 px-4">
        <Text className="text-bank-01 text-2xl font-bold">Loan Statistics</Text>
        <Text className="text-bank-01 text-sm opacity-80 mt-1">
          Overview of all loan payments (Principal + Interest)
        </Text>
      </View>

      {/* Stats Cards */}
      <View className="px-4 mt-6">
        {/* Total Loans Card */}
        <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <View className="flex-row items-center gap-3 mb-2">
            <Ionicons name="document-text-outline" size={24} color="#568259" />
            <Text className="text-gray-500 text-sm">Total Loans</Text>
          </View>
          <Text className="text-bank-05 text-3xl font-bold">{stats.totalLoans}</Text>
        </View>

        {/* Total to Pay Card */}
        <View className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <View className="flex-row items-center gap-3 mb-2">
            <Ionicons name="cash-outline" size={24} color="#f44336" />
            <Text className="text-gray-500 text-sm">Total to Pay (All Loans)</Text>
          </View>
          <Text className="text-red-500 text-3xl font-bold">{formatCurrency(stats.totalToPay)}</Text>
          <Text className="text-gray-400 text-xs mt-1">Principal + Interest</Text>
        </View>

        {/* Min and Max Cards */}
        <View className="flex-row gap-4 mb-4">
          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="arrow-down-outline" size={20} color="#4caf50" />
              <Text className="text-gray-500 text-xs">Minimum Payment</Text>
            </View>
            <Text className="text-green-600 text-lg font-bold">{formatCurrency(stats.minPayment)}</Text>
            <Text className="text-gray-400 text-xs mt-1">Lowest total to pay</Text>
          </View>

          <View className="flex-1 bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name="arrow-up-outline" size={20} color="#ff9800" />
              <Text className="text-gray-500 text-xs">Maximum Payment</Text>
            </View>
            <Text className="text-orange-600 text-lg font-bold">{formatCurrency(stats.maxPayment)}</Text>
            <Text className="text-gray-400 text-xs mt-1">Highest total to pay</Text>
          </View>
        </View>

        {/* Average Payment Card */}
        <View className="bg-white rounded-xl p-5 mb-6 shadow-sm">
          <View className="flex-row items-center gap-3 mb-2">
            <Ionicons name="stats-chart-outline" size={24} color="#568259" />
            <Text className="text-gray-500 text-sm">Average Payment per Loan</Text>
          </View>
          <Text className="text-bank-05 text-2xl font-bold">{formatCurrency(stats.averagePayment)}</Text>
          <Text className="text-gray-400 text-xs mt-1">Average of Principal + Interest</Text>
        </View>
      </View>

      {/* Chart Type Selector */}
      <View className="px-4 mb-4">
        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setChartType('pie')}
            className={`flex-1 py-3 rounded-lg ${chartType === 'pie' ? 'bg-bank-05' : 'bg-gray-200'}`}
          >
            <Text className={`text-center font-semibold ${chartType === 'pie' ? 'text-bank-01' : 'text-gray-600'}`}>
              Pie Chart
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setChartType('bar')}
            className={`flex-1 py-3 rounded-lg ${chartType === 'bar' ? 'bg-bank-05' : 'bg-gray-200'}`}
          >
            <Text className={`text-center font-semibold ${chartType === 'bar' ? 'text-bank-01' : 'text-gray-600'}`}>
              Bar Chart
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Chart Display */}
      {loans.length > 0 ? (
        <View className="bg-white rounded-xl mx-4 p-4 mb-6 shadow-sm">
          <Text className="text-center text-bank-05 font-bold text-base mb-4">
            Top 5 Clients by Total Payment (Principal + Interest)
          </Text>
          {chartType === 'pie' ? (
            <PieChart
              data={getPieChartData()}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(86, 130, 89, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          ) : (
            <BarChart
              data={getBarChartData()}
              width={screenWidth - 32}
              height={300}
              yAxisLabel="Ar "
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(86, 130, 89, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                barPercentage: 0.7,
              }}
              verticalLabelRotation={45}
              showValuesOnTopOfBars
              fromZero
            />
          )}
        </View>
      ) : (
        <View className="bg-white rounded-xl mx-4 p-8 mb-6 items-center">
          <Ionicons name="bar-chart-outline" size={48} color="#d1d5db" />
          <Text className="text-gray-400 text-center mt-2">No loan data available</Text>
        </View>
      )}

      {/* Client List Summary */}
      <View className="bg-white rounded-xl mx-4 p-4 mb-8 shadow-sm">
        <Text className="text-bank-05 font-bold text-base mb-3">Top 5 Clients by Total Payment</Text>
        {loans
          .sort((a, b) => {
            const paymentA = calculateTotalPayment(a.amount, a.loan);
            const paymentB = calculateTotalPayment(b.amount, b.loan);
            return paymentB - paymentA;
          })
          .slice(0, 5)
          .map((loan, index) => {
            const totalToPay = calculateTotalPayment(loan.amount, loan.loan);
            return (
              <View key={loan.id} className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <View className="flex-1">
                  <Text className="text-gray-700">{index + 1}. {loan.client}</Text>
                  <Text className="text-gray-400 text-xs">Loan: Ar {Number(loan.amount).toLocaleString()} at {loan.loan}%</Text>
                </View>
                <Text className="text-red-500 font-semibold">{formatCurrency(totalToPay)}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Histogram;