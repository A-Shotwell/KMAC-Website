// covert props.params.date to format "year-month-day", call for date input default value
const dateConvert = (date) => {
    const dateArr = date.split('-')
    const year = dateArr.pop()
    dateArr.unshift(year)
    return dateArr.join('-')
}

// covert props.param.time to 24-hour format, call for time input default value
const timeConvert = (curTime) => {
    const timeArr = curTime.split(' ')
    const time = timeArr[0].split(":")
    if (timeArr[1] === 'PM')
        time[0] = ((parseInt(time[0])) + 12).toString()
    if (parseInt(time[0]) < 10)
        time[0] = "0" + time[0]
    return time.join(":")
}

export {dateConvert, timeConvert}