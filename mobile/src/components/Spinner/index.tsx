import { useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

type Props = {
    size: number 
}

export function Spinner({size}: Props) {
    const [color, setColor] = useState('#FFF')

    setTimeout(() => {
        handleColor(color)
    }, 1400)

    function handleColor(color: string) {
        switch(color) {
            case '#FFF':
                setColor('#3fffa3')
                break;
            case '#3fffa3':
                setColor('#FF3F4b')
                break;
            default:
            setColor('#FFF')
        }
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator color={color} size={size}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }
})