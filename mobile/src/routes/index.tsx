import React, { useContext } from "react";
import { View } from "react-native";

import { AuthContext } from "../contexts/AuthContext";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { Spinner } from "../components/Spinner";

function Routes() {
    const { isAuthenticated, loading } = useContext(AuthContext)

    if(loading){
        return (
            <View 
                style={{
                    flex: 1, 
                    backgroundColor: "#1D1D2E",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                <Spinner size={60}/>

            </View>
        )
    }
    return (
        isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes