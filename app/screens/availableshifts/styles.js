import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerBg: {
        backgroundColor: COLORS.WHITE,
        padding: 20
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15
    },
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})

export default styles