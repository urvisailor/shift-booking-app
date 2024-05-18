import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from '../styles'
import { COLORS } from '../../../constants/colors'

const Button = ({ disable, onClick, title, isCancelable, isloading }) => {
    return (
        <TouchableOpacity onPress={onClick} style={[disable ? styles.disableButton : isCancelable ? styles.cancelButton : styles.bookButton, styles.button]}>
            {isloading ? <ActivityIndicator size={'small'} color={isCancelable ? COLORS.DARK_PINK : COLORS.DARK_GREEN} /> : <Text style={[disable ? styles.disableTxt : isCancelable ? styles.cancelTxt : styles.bookTxt, styles.btnTxt]}>{title}</Text>}
        </TouchableOpacity>
    )
}

export default Button