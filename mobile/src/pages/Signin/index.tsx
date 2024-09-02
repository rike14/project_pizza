import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../contexts/AuthContext";
import { Spinner } from "../../components/Spinner";

export default function SignIn(){
    const { signIn, loading, user } = useContext(AuthContext)
    const [email, setEmail] = useState(user?.email ?? '')
    const [password, setPassword] = useState('')

    async function handleLogin() {
        if(email === '' || password === '') return

        await signIn({email, password}) 

    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require("../../../assets/logo.png")}
            />

            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Write your email"
                    style={styles.input}
                    placeholderTextColor="#F0F0F0"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput 
                    placeholder="**********"
                    style={styles.input}
                    placeholderTextColor="#F0F0F0"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                
                {loading ? <Spinner size={35}/> :
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1d1d2e"
    },
    logo: {
        marginBottom: 18
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input: {
        height: 40,
        width: "95%",
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#FFF",
    },
    button: {
        width: "95%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
    }
})