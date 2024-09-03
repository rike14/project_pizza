import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";

type ItemProps = {
    id: string
    name: string
    banner?: string
}


type ModalPickerProps = {
    options: ItemProps[]
    handleCloseModal: () => void
    selectedItem: (item: ItemProps) => void
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get("window")

export function ModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps) {

    function onPressItem(item: ItemProps) {
        selectedItem(item)
        handleCloseModal()
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            {item?.banner ? 
                <>
                    <Image src={api.getUri() + `/files/${item?.banner}`} style={styles.banner}/>
                </>
                : ''
            }
            <Text style={styles.item}>{item?.name}</Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#8a8a8a",
        borderRadius: 4
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 0.8,
        borderTopColor: "#8a8a8a"
    },
    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: "bold",
        color: "#101026"
    },
    banner: {
        width: 100,
        height: 100,
        objectFit: "fill",
        borderRadius: 4,
        margin: 16,
        alignItems: "center",
        justifyContent: "center"
    }
})