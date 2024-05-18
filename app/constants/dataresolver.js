import { DateTime } from 'luxon'
export const availableShiftData = (shifts) => {
    const areaArray = shifts.map((item) => item.area)
    //Get Areas
    const distinctArea = areaArray.filter((item, index) => areaArray.indexOf(item) === index)
    // get grouped data
    const data = distinctArea.map((item) => {
        // filter and mutate data to get readable date and time
        const groupByArea = shifts.filter((s) => item === s.area).map((s) => {
            const formattedStartDate = DateTime.fromMillis(s.startTime).toLocaleString(DateTime.DATE_MED);
            const formattedStartTime = DateTime.fromMillis(s.startTime).toLocaleString(DateTime.TIME_24_SIMPLE);
            const formattedEndDate = DateTime.fromMillis(s.startTime).toLocaleString(DateTime.DATE_MED);
            const formattedEndTime = DateTime.fromMillis(s.endTime).toLocaleString(DateTime.TIME_24_SIMPLE);
            return {
                ...s,
                formattedStartDate,
                formattedStartTime,
                formattedEndDate,
                formattedEndTime
            }
        })
        // group shifts with dates
        const groupByDate = groupByArea.reduce((grpByDate, shift) => {
            const { formattedStartDate } = shift
            if (!grpByDate[formattedStartDate]) {
                grpByDate[formattedStartDate] = []
            }
            grpByDate[formattedStartDate].push(shift)
            return grpByDate
        }, {})
        return {
            area: item,
            item: [groupByDate],
            totalShifts: groupByArea.length
        }
    })
    console.log("data grp by====>", JSON.stringify(data))
    return data
}

export const isDisabled = (startTime, endTime, status, shifts) => {
    const now = DateTime.now();
    const isPassed = endTime <= now
    const [_, isOverLapping] = isOverLapped(startTime, endTime, shifts)
    console.log("isPassed ? isPassed : isOverLapping", isPassed ? isPassed : isOverLapping)
    return isPassed
}

const isOverLapped = (startTime, endTime, shifts) => {
    const overLappedData = shifts.map((item) => {
        const date = DateTime.fromMillis(startTime)
        const itemDate = DateTime.fromMillis(item.startTime)
        console.log("date === itemDate==>", date.equals(itemDate))
        const isOverLapping = date.equals(itemDate) ? (startTime < item.endTime) && (endTime > item.startTime) : false;
        return {
            ...item,
            isOverLapping: isOverLapping
        }
    })
    const hadAnyOfDataOverLapped = overLappedData.filter((item) => item.isOverLapping).length > 0 ? true : false
    console.log("overlapped==>", overLappedData)
    return [overLappedData, hadAnyOfDataOverLapped]
}