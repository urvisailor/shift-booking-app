import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {cancelShifts, fetchShifts, updateShifts} from '../../redux/slice';
import {availableShiftData} from '../../constants/dataresolver';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './components/header';
import styles from './styles';
import {COLORS} from '../../constants/colors';
import ShiftLists from './components/shiftlist';

const AvailableShifts: React.FC = () => {
  const dispatch = useDispatch<any>();
  const allShift = useSelector((state: any) => state.shift.shiftsData);
  const [currentIndex, setcurrentIndex] = useState(0);
  const [shifts, setshifts] = useState([]);
  const [cityWiseShift, setcityWiseShift] = useState([]);

  useEffect(() => {
    const formattedData = availableShiftData(allShift);
    setshifts(formattedData);
    setcityWiseShift(formattedData[currentIndex]);
  }, [allShift]);

  useEffect(() => {
    dispatch(fetchShifts());
  }, []);

  const onTap = (data: any) => {
    setcityWiseShift(data);
  };

  const shiftClick = (item: any) => {
    if (item.booked) {
      dispatch(cancelShifts(item?.id));
    } else {
      dispatch(updateShifts(item?.id));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <Header
        shifts={shifts}
        onTap={onTap}
        currentIndex={currentIndex}
        setcurrentIndex={setcurrentIndex}
      />
      <View style={{backgroundColor: COLORS.WHITE, flex: 1}}>
        <ShiftLists shifts={cityWiseShift} onShiftClick={shiftClick} />
      </View>
    </View>
  );
};

export default AvailableShifts;
