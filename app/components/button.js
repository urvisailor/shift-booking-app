import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors'
import { getFontSize } from '../constants/utils'

const Button = ({ disable, onClick, title, isCancelable, isloading }) => {
    return (
        <TouchableOpacity onPress={onClick} style={[disable ? styles.disableButton : isCancelable ? styles.cancelButton : styles.bookButton, styles.button]}>
            {isloading ? <ActivityIndicator size={'small'} color={isCancelable ? COLORS.DARK_PINK : COLORS.DARK_GREEN} /> : <Text style={[disable ? styles.disableTxt : isCancelable ? styles.cancelTxt : styles.bookTxt, styles.btnTxt]}>{title}</Text>}
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
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
    }
})

export default Button