import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ParentDashboardScreen from './screens/ParentDashboardScreen';
import AssignTaskScreen from './screens/AssignTaskScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import ManageTasksScreen from './screens/ManageTasksScreen';
import TaskProgressScreen from './screens/TaskProgressScreen';
import ManageChildScreen from './screens/ManageChildScreen';
import AddChildScreen from './screens/AddChildScreen';
import ChildProgressScreen from './screens/ChildProgressScreen'; 
import TrophiesScreen from './screens/TrophiesScreen';
import TasksDetailsScreen from './screens/TasksDetailsScreen';
import ManageStoreScreen from './screens/ManageStoreScreen';
import RewardApprovalScreen from './screens/RewardApprovalScreen';
import AddAddressScreen from './screens/AddAddressScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import StoreScreen from './screens/StoreScreen';
import CheckoutScreen from './screens/CheckoutScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
        <Stack.Screen name="AssignTask" component={AssignTaskScreen} />
        <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        <Stack.Screen name="ManageTasks" component={ManageTasksScreen} />
        <Stack.Screen name="TaskProgress" component={TaskProgressScreen} />
        <Stack.Screen name="ManageChild" component={ManageChildScreen} />
        <Stack.Screen name="AddChild" component={AddChildScreen} />
        <Stack.Screen name="ChildProgress" component={ChildProgressScreen} /> 
        <Stack.Screen name="Trophies" component={TrophiesScreen} />
        <Stack.Screen name="TasksDetails" component={TasksDetailsScreen} />
        <Stack.Screen name="ManageStore" component={ManageStoreScreen} />
        <Stack.Screen name="RewardApproval" component={RewardApprovalScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
