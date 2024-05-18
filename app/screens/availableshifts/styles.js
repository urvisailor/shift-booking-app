import { StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import { getFontSize, isAndroid } from "../../constants/utils";

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerBg: {
        backgroundColor: COLORS.WHITE,
        padding: 20,
        borderBottomColor: COLORS.GREY,
        borderBottomWidth: 2,
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: 1,
            height: 4,
        },
        elevation: 5,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: getFontSize(15)
    },
    safeArea: {
        backgroundColor: COLORS.WHITE,
        flex: 0.0001,
        paddingTop: isAndroid ? StatusBar.currentHeight : 0
    },
    container: {
        backgroundColor: COLORS.WHITE,
        flex: 1
    },
    titleView: {
        backgroundColor: COLORS.LIGHT_GREY,
        padding: 10,
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
    disableButton: {
        borderColor: COLORS.LINK_WATER
    },
    cancelButton: {
        borderColor: COLORS.DARK_PINK
    },
    bookButton: {
        borderColor: COLORS.DARK_GREEN
    },
    btnTxt: {
        fontSize: getFontSize(12),
        fontWeight: '500'
    },
    disableTxt: {
        color: COLORS.LINK_WATER
    },
    cancelTxt: {
        color: COLORS.DARK_PINK
    },
    bookTxt: {
        color: COLORS.DARK_GREEN
    },
    statusLabel: {
        fontWeight: '700'
    }
})

export default styles