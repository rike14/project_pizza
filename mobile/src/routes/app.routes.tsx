import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Dashboard from "../pages/Dashboard";
import FinishOrder from "../pages/FinishOrder";
import Order from "../pages/Order";

export type StackParamsList = {
    Dashboard: undefined
    Order: {
        table: number | string
        order_id: string
    }
    FinishOrder: {
        table: number
        order_id: string
    }
}
const Stack = createNativeStackNavigator<StackParamsList>()

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options={{headerShown: false}} 
            />

            <Stack.Screen 
                name="Order" 
                component={Order} 
                options={{headerShown: false}} 
            />

            <Stack.Screen 
                name="FinishOrder" 
                component={FinishOrder} 
                options={{
                    title: "Finish Order",
                    headerStyle: {
                        backgroundColor: "#1d1d2e"
                    },
                    headerTintColor: "#FFF"
                }} 
            />
        </Stack.Navigator>
    )
}

export default AppRoutes