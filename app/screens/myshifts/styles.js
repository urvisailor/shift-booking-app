import { StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { getFontSize, isAndroid } from "../../constants/utils";

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.WHITE,
        flex: 0.0001,
        paddingTop: isAndroid ? StatusBar.currentHeight : 0
    },
    container: {
        backgroundColor: COLORS.WHITE,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleView: {
        backgroundColor: COLORS.LIGHT_GREY,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: COLORS.LINK_WATER,
    },
    title: {
        color: COLORS.PRIMARY,
        fontWeight: 'bold',
        fontSize: getFontSize(14)
    },
    shiftZoneView: {
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: COLORS.LINK_WATER,
    },
    time: {
        color: COLORS.PRIMARY,
        fontSize: getFontSize(14),
        fontWeight: '500'
    },
    button: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    areaTxt: {
        fontSize: getFontSize(14),
        color: COLORS.LINK_WATER,
        fontWeight: '500',
        marginTop: 3
    },
    duration: {
        fontWeight: '500',
        color: COLORS.LINK_WATER,
        fontSize: getFontSize(14)
    }
})

export default styles