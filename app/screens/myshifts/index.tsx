import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {myShifts} from '../../constants/dataresolver';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/colors';
import ShiftLists, {Shift} from './components/shiftlist';
import {cancelShifts} from '../../redux/slice';

const MyShifts: React.FC = () => {
  const dispatch = useDispatch<any>();
  const allShift = useSelector((state: any) => state.shift.shiftsData);
  const [shifts, setshifts] = useState([]);

  useEffect(() => {
    const formattedData = myShifts(allShift);
    setshifts(formattedData);
  }, [allShift]);

  const shiftClick = (item: Shift) => {
    dispatch(cancelShifts(item?.id));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <View style={{backgroundColor: COLORS.WHITE, flex: 1}}>
        <ShiftLists shifts={shifts} onShiftClick={shiftClick} />
      </View>
    </View>
  );
};

export default MyShifts;
