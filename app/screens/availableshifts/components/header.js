import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import { COLORS } from '../../../constants/colors'

const Header = ({ shifts, onTap, currentIndex, setcurrentIndex }) => {

    useEffect(() => {
        onTap(shifts[0])
    }, [])

    const onTapChange = (index, item) => {
        setcurrentIndex(index)
        onTap(item)
    }

    return (
        <View style={[styles.row, styles.headerBg]}>
            {
                shifts?.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => onTapChange(index, item)}>
                        <Text style={[styles.headerText, { color: currentIndex === index ? COLORS.BLUE : COLORS.LINK_WATER }]}>
                            {item.area} ({item.totalShifts})
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

export default Header