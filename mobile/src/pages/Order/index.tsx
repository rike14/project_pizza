import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { ListItem } from "../../components/ListItem";
import { ModalPicker } from "../../components/ModalPicker";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams = {
    Order: {
        table: number
        order_id: string
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

type CategoryProps = {
    id: string
    name: string
}

type ProductProps = {
    id: string
    name: string
    banner?: string
}

type ItemProps = {
    id: string
    product_id: string
    name: string
    amount: string | number
}

export default function Order(){
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
    
    const [products, setProducts] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [ amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemProps[]>([])

    useEffect(() => {
        async function loadCategory() {
            const response = await api.get('/category')

            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadCategory()
    }, [])

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id
                }
            })

            setProducts(response.data)
            setProductSelected(response.data[0])
        }

        loadProducts()
    }, [categorySelected])

    async function handleCloseOrder() {
        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack()
            Toast.show({
                type: 'success',
                text1: 'Table closed!',
                text2: 'The table was closed ✅',
                text1Style: {
                    fontSize: 18
                },
                text2Style: {
                    fontSize: 16
                }
            });

        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error to delete order! ❌',
                text1Style: {
                    fontSize: 18
                },
                text2Style: {
                    fontSize: 16
                }
            });
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item)
    }

    function handleChangeProducts(item: ProductProps) {
        setProductSelected(item)
    }

    async function handleAdd() {
        const response = await api.post('/order/add', {
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
        setAmount('1')
        Toast.show({
            type: 'success',
            text1: productSelected?.name,
            text2: 'Product added to order 📜',
            text1Style: {
                fontSize: 18
            },
            text2Style: {
                fontSize: 16
            }
        });

    }

    async function handleDeleteItem(item_id: string) {
        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        })

        let removeItem = items.filter( item => {
            return (item.id != item_id)
        })
        
        setItems(removeItem)
        Toast.show({
            type: 'success',
            text1: productSelected?.name,
            text2: 'Product removed from order 📜',
            text1Style: {
                fontSize: 18
            },
            text2Style: {
                fontSize: 16
            }
        });
    }

    function handleFinishOrder() {
        navigation.navigate("FinishOrder", { 
            table: route.params?.table, 
            order_id: route.params?.order_id 
        })
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Table - {route.params.table} </Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color="#FF3F4b"/>
                    </TouchableOpacity>
                )}
            </View>

            { category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{color: "#FFF"}}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            { products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{color: "#FFF"}}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtyContainer}>
                <Text style={styles.qtyText}>Quantity</Text>
                <TextInput 
                    style={[ styles.input, { width: '50%', textAlign: "center" }]}
                    value={amount}
                    onChangeText={setAmount}
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric" 
                />
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={[styles.buttonText, {color: "#FFF", fontSize: 24}]}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

            <View style={styles.actions}>
                <TouchableOpacity 
                    style={[styles.button, {opacity: items.length === 0 ? 0.5 : 1}]} 
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Finish order</Text>
                </TouchableOpacity>
            </View>

            <Modal 
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPicker 
                    options={category}
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal 
                transparent={true}
                visible={modalProductVisible}
                animationType="fade"
            >
                <ModalPicker 
                    options={products}
                    handleCloseModal={() => setModalProductVisible(false)}
                    selectedItem={handleChangeProducts}
                />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: "row",
        marginTop:24,
        marginBottom: 12,
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#FFF",
        marginRight: 14
    },
    input: {
        backgroundColor: "#101026",
        color: "#FFF",
        fontSize: 20,
        borderRadius: 4,
        width: "100%",
        height: 40,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    qtyContainer: {
        marginBottom: 12,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    qtyText: {
        marginBottom: 12,
        fontSize: 20,
        marginLeft: 12,
        fontWeight: "bold",
        color: "#FFF"
    },
    actions: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    buttonAdd: {
        width: "20%",
        marginBottom: 12,
        backgroundColor: "#3fd1ff",
        borderRadius: 4,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
        
    },
    buttonText: {
        color: "#101026",
        fontSize: 18,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        height: 40,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
})