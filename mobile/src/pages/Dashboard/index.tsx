import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [table, setTable] = useState("")

    async function openOrder() {
        if(table === "") return

        const response = await api.post('/order', {
            table: Number(table)
        })

        navigation.navigate('Order', {table: table, order_id: response.data.id})

        setTable('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>New Order</Text>

            <TextInput 
                style={styles.input}
                placeholder="Table number"
                placeholderTextColor="#F0F0F0"
                value={table}
                onChangeText={setTable}
                keyboardType="numeric"
            />
            
            <TouchableOpacity 
                style={styles.button}
                onPress={openOrder}            
            >
                <Text style={styles.buttonText}>Open order</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: "#1d1d2e"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 24
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: "#101026",
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 22,
        color: "#FFF"
    },
    button: {
        width: "90%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#101026",
        fontWeight: "bold"
    }
})