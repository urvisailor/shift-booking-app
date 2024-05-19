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

export const myShifts = (shifts) => {
    const bookedShifts = shifts.filter((shift) => shift.booked).map((s) => {
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
    const groupByDate = bookedShifts.reduce((grpByDate, shift) => {
        const { formattedStartDate } = shift
        if (!grpByDate[formattedStartDate]) {
            grpByDate[formattedStartDate] = []
        }
        grpByDate[formattedStartDate].push(shift)
        return grpByDate
    }, {})
    console.log("groupByDate===>", groupByDate)
    return groupByDate
}

export const isDisabled = (item, originalData) => {
    //Check if time is passed or not
    const isPassed = Date.now() >= item.endTime || Date.now() > item.startTime
    //Get Overlapping flag
    const isOverLapping = hasOverLapped(item, originalData)
    return isPassed ? isPassed : !item.booked ? isOverLapping : false
}

export const hasOverLapped = (currentItem, originalData) => {
    const isOverLapping = !!originalData.filter(s => s.booked).find(s => s.startTime < currentItem.endTime && s.endTime > currentItem.startTime)
    return isOverLapping
}