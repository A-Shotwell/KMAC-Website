// From MM-DD-YYY 12:00 (PM/AM) format...
// Get parsed date from ISO 8601 format --> Example: '04 Dec 1995 00:12:00 GMT'
const getISO = (obj) => {
	// Convert date to ISO format
	const getDate = (date) => {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
		const curDateParts = date.split('-')
		return `${curDateParts[1]} ${months[parseInt(curDateParts[0]) - 1]} 20${curDateParts[2]}`
	}
	
	// Convert time to ISO format
	const getTime = (time) => {
		const timeParts = time.split(' ')
		const clock = timeParts[0].split(':')
		let hour
		if (timeParts[1] === 'PM'){
			clock[0] === '12'
			? hour = '12'
			: hour = String(parseInt(clock[0]) + 12)
		} else {
			hour = String(parseInt(clock[0]) % 12)
		}
	
		return `${hour}:${clock[1]}:00 GMT` 
	}

	return Date.parse(`${getDate(obj.date)} ${getTime(obj.time)}`)
}

// SORT WITH THIS COMPARE FUNCTION
// datesArr.sort((a,b) => {
// 	return getISO(a) > getISO(b) ? 1 : -1
// })

export default getISO

