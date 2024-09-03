import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

type RouteDetailParams = {
    FinishOrder: {
        table: string | number
        order_id: string
    }
}

type FinishOrderProp = RouteProp<RouteDetailParams, "FinishOrder">

export default function FinishOrder() {
    const route = useRoute<FinishOrderProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    async function handleFinish() {
        try {
            await api.put('/order/send', {
                order_id: route.params?.order_id
            })

            Toast.show({
                type: 'success',
                text1: 'Order finished!',
                text2: 'The order is being prepared ✅',
                text1Style: {
                    fontSize: 18
                },
                text2Style: {
                    fontSize: 16
                }
            });
            navigation.popToTop()
        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error to finish order, try again! ❌',
                text1Style: {
                    fontSize: 18
                },
                text2Style: {
                    fontSize: 16
                }
            });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.alert}>Do you want to complete this order?</Text>
            <Text style={styles.title}>Mesa {route.params?.table}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finish order</Text>
                <MaterialIcons name="shopping-cart" size={24} color="#1d1d2e" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        justifyContent: "center",
        alignItems: "center"
    },
    alert: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",
        marginBottom: 12
    },
    title: {
        fontSize: 30,
        color: "#FFF",
        fontWeight: "bold",
        marginBottom: 12
    },
    button: {
        backgroundColor: "#3fffa3",
        flexDirection: "row",
        width: "65%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: "#1d1d2e"
    }
})