import {View, Text, SectionList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DateTime} from 'luxon';
import {isToday, isTomorrow} from '../../../constants/utils';
import {TEXTS} from '../../../constants/texts';
import styles from '../styles';
import Button from '../../../components/button';
import {useSelector} from 'react-redux';
import {calculateTotalHrs} from '../../../constants/dataresolver';
export interface Shift {
  id: string;
  startTime: number;
  endTime: number;
  formattedStartTime: string;
  formattedEndTime: string;
  booked?: boolean;
  area?: string; 
}

interface ShiftData {
  title: {
    date: string;
    shiftduration: string;
  };
  data: any;
}

interface Props {
  shifts: any | null;
  onShiftClick: (shift: Shift) => void;
}

const ShiftLists: React.FC<Props> = ({shifts, onShiftClick}) => {
  const [shiftData, setshiftData] = useState<ShiftData[]>([]);
  const isloading = useSelector((state: any) => state.shift.isupdating);
  const [showloading, setshowloading] = useState<Shift>();

  useEffect(() => {
    let mutatedData: ShiftData[] = [];
    for (const [key, value] of Object.entries(
      shifts as {[key: string]: Shift[]},
    )) {
      const stringToDate = DateTime.fromFormat(key, 'dd MMM yyyy');
      const today = isToday(stringToDate);
      const tomorrow = isTomorrow(stringToDate);
      const numberOfShifts = value.length;
      const totalHrs = calculateTotalHrs(value);
      let titleTxt = today
        ? TEXTS.constants.TODAY
        : tomorrow
        ? TEXTS.constants.TOMORROW
        : key;
      mutatedData.push({
        title: {
          date: titleTxt,
          shiftduration: ` ${numberOfShifts} ${
            numberOfShifts == 1 ? TEXTS.constants.SHIFT : TEXTS.constants.SHIFTS
          }, ${totalHrs} h`,
        },
        data: value,
      });
    }
    setshiftData(mutatedData);
  }, [shifts]);

  const onPress = (selectedItem: Shift) => {
    setshowloading(selectedItem);
    onShiftClick(selectedItem);
  };

  return (
    <View>
      <SectionList
        sections={shiftData || []}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, section}) => {
          return (
            <View style={[styles.row, styles.shiftZoneView]}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.time}>{item.formattedStartTime} - </Text>
                  <Text style={styles.time}>{item.formattedEndTime}</Text>
                </View>
                <Text style={styles.areaTxt}>{item.area}</Text>
              </View>
              <Button
                isLoading={showloading?.id === item?.id ? isloading : false}
                disable={false}
                isCancelable={item.booked}
                onClick={() => onPress(item)}
                title={TEXTS.constants.CANCEL}
              />
            </View>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.titleView}>
            <Text style={styles.title}>{title?.date}</Text>
            <Text style={styles.duration}>{'  ' + title?.shiftduration}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ShiftLists;
