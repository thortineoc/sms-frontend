const isAfterDeadline = (date) => {
    let [month, day, year] = new Date().toLocaleDateString("en-US").split("/")
    let [deadlineYear, deadlineMonth, deadlineDay] = date.substr(0,10).split("-");

    month = parseInt(month); day = parseInt(day); year = parseInt(year);
    deadlineMonth = parseInt(deadlineMonth); deadlineDay = parseInt(deadlineDay); deadlineYear = parseInt(deadlineYear);

    if( deadlineYear < year ||
        deadlineYear === year && deadlineMonth < month ||
        deadlineYear === year && deadlineMonth === month && deadlineDay < day) {
        return ['#EEEEEE', '#BFBFBF', '#BFBFBF'];
    } else {
        return ['#FAFAFA', 'black', 'gray'];
    }
}

export default isAfterDeadline;