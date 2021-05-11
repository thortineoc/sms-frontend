const isAfterDeadline = (date) => {
    let [month, day, year] = new Date().toLocaleDateString("en-US").split("/")
    let [deadlineDay, deadlineMonth, deadlineYear] = date.split("-");
    if( deadlineYear < year ||
        deadlineYear === year && deadlineMonth < month ||
        deadlineYear === year && deadlineMonth === month && deadlineDay < day) {
        return ['#EEEEEE', '#BFBFBF'];
    } else {
        return ['#FAFAFA', 'black'];
    }
}

export default isAfterDeadline;