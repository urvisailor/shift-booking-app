import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../styles'
import { COLORS } from '../../../constants/colors'

const Header = ({ shifts }) => {
    const [currentIndex, setcurrentIndex] = useState(0)

    return (
        <View style={[styles.row, styles.headerBg]}>
            {
                shifts?.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => setcurrentIndex(index)}>
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