import React from "react";
import { ActivityIndicator, View } from "react-native";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

function Routes() {
    const isAuthenticated = false
    const loading = false

    if(loading){
        return (
            <View 
                style={{
                    flex: 1, 
                    backgroundColor: "#1D1D2E",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <ActivityIndicator size={60} color="#F5f7fb" />

            </View>
        )
    }
    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes