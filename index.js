// Your code here

function createEmployeeRecord(employeeArr) {
    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

/* take arrOfEmployees = [[Nick, Brown, dancer, 10], [Mark, Bacon, Singer, 12], [Brian, Lego, Programmer, 14]]  */
function createEmployeeRecords(arrOfEmployees) {
    return arrOfEmployees.map(arr => createEmployeeRecord(arr))
}

/*  Add an Object with keys to the timeInEvents Array on the record Object:
type: Set to "TimeIn"
hour: Derived from the argument
date: Derived from the argument */
function createTimeInEvent(empObj, date) {
    const dateArr = date.split(" ")
    const empDate = dateArr[0]
    const empHour = parseInt(dateArr[1])
    empObj.timeInEvents.push({ type: "TimeIn", date: empDate, hour: empHour })
    return empObj
}

function createTimeOutEvent(empObj, date) {
    const dateArr = date.split(" ")
    const empDate = dateArr[0]
    const empHour = Number(dateArr[1])
    empObj.timeOutEvents.push({ type: "TimeOut", hour: empHour, date: empDate })
    return empObj
}

// function hoursWorkedOnDate(empObj, date){
//     let hoursWorked = (empObj.timeOutEvents[0].hour - empObj.timeInEvents[0].hour)/100
//     return hoursWorked
// }

let hoursWorkedOnDate = function (employee, soughtDate) {
    let inEvent = employee.timeInEvents.find(function (e) {
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function (e) {
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(empObj, date) {
    let payOwed = (hoursWorkedOnDate(empObj, date) * empObj.payPerHour)
    console.log(payOwed)
    return payOwed
}

/*Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow... */

// function allWagesFor(employee) {
//     let eligibleDates = employee.timeInEvents.map(e => e.date)

//     let payable = eligibleDates.reduce((memo, d) =>
//         memo + wagesEarnedOnDate(employee, d), 0)

//     return payable
// }

function allWagesFor(empObj) {
    let availableDates = empObj.timeInEvents.map((timecard) => timecard.date)
    console.log(availableDates)

    let payWages = availableDates.reduce((allDaysworked, date) => allDaysworked + wagesEarnedOnDate(empObj, date), 0)
    return payWages
}

function calculatePayroll(allEmpsArr) {
    // let arrSoloWagesOwed = allEmpsArr.map(empObj => wagesEarnedOnDate(empObj))
    // console.log(arrSoloWagesOwed)
    let payroll = allEmpsArr.reduce((prev, empObj) =>  prev + allWagesFor(empObj), 0)
        // console.log('prev', prev);
        // console.log('current total', allWagesFor(empObj));
        // console.log('each total', prev + allWagesFor(empObj))
    return payroll
}