import {View, Text, SectionList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DateTime} from 'luxon';
import {isToday, isTomorrow} from '../../../constants/utils';
import {TEXTS} from '../../../constants/texts';
import styles from '../styles';
import Button from '../../../components/button';
import {useSelector} from 'react-redux';
import {hasOverLapped, isDisabled} from '../../../constants/dataresolver';
interface Shift {
  id: string; // Assuming each shift has a unique ID
  formattedStartTime: string;
  formattedEndTime: string;
  booked?: boolean; // Optional property for booked status
}

interface Props {
  shifts: any | null; // Allow shifts to be null initially
  onShiftClick: (shift: Shift) => void;
}

const ShiftLists: React.FC<Props> = ({shifts, onShiftClick}) => {
  const [shiftData, setshiftData] = useState([]);
  const isloading = useSelector((state: any) => state.shift.isupdating);
  const originalShiftData = useSelector((state: any) => state.shift.shiftsData);
  const [showloading, setshowloading] = useState<any>();

  useEffect(() => {
    let mutatedData:any = [];
    for (let i = 0; i < shifts?.item?.length; i++) {
      for (const [key, value] of Object.entries(shifts?.item[i])) {
        const stringToDate = DateTime.fromFormat(key, 'dd MMM yyyy');
        const today = isToday(stringToDate);
        const tomorrow = isTomorrow(stringToDate);
        let titleTxt = today
          ? TEXTS.constants.TODAY
          : tomorrow
          ? TEXTS.constants.TOMORROW
          : key;
        mutatedData.push({
          title: titleTxt,
          data: value,
        });
      }
    }
    setshiftData(mutatedData);
  }, [shifts]);

  const onPress = (selectedItem:any) => {
    setshowloading(selectedItem);
    onShiftClick(selectedItem);
  };

  return (
    <View>
      <SectionList
        sections={shiftData || []}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, section}) => {
          const isOverLapping = hasOverLapped(item, originalShiftData);
          const isDisable = isDisabled(item, originalShiftData);
          const isBooked = item.booked
            ? TEXTS.constants.BOOKED
            : isOverLapping
            ? TEXTS.constants.OVERLAP
            : '';
          const btnTxt = item.booked
            ? TEXTS.constants.CANCEL
            : TEXTS.constants.BOOK;
          return (
            <View style={[styles.row, styles.shiftZoneView]}>
              <View style={styles.row}>
                <Text style={styles.time}>{item.formattedStartTime} - </Text>
                <Text style={styles.time}>{item.formattedEndTime}</Text>
              </View>
              <View>
                <Text style={[styles.time, styles.statusLabel]}>
                  {isBooked}
                </Text>
              </View>
              <Button
                isLoading={showloading?.id === item?.id ? isloading : false}
                disable={isDisable}
                isCancelable={item.booked}
                onClick={() => onPress(item)}
                title={btnTxt}
              />
            </View>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.titleView}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ShiftLists;
