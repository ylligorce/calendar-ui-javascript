/*
Title: Calendar UI - Javascript
Author: Ylli Gorce
GitHub: https://github.com/ylligorce
Version: 1.0
 */

(function () {

    //Global
    let date, currentMonth, currentYear;

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    //Elements
    let monthYearElem, calendarDataElem;

    init();

    function init() {

        date = new Date();
        currentMonth = date.getMonth();
        currentYear = date.getFullYear();

        monthYearElem = document.getElementById('month-year-label');
        calendarDataElem = document.getElementById('calendar-data');

        //Events
        document.getElementById('prev-month').addEventListener('click', prevMonth);
        document.getElementById('next-month').addEventListener('click', nextMonth);


        //Calendar init
        showCalendar(currentYear, currentMonth);
    }

    function showCalendar(year, month) {

        //get first day of month
        let firstDay = (new Date(year, month)).getDay();

        let daysOfMonth = 32 - new Date(year, month, 32).getDate();

        //fill month/year label
        monthYearElem.innerHTML = `${months[month]} ${year}`;

        //Generate calendar dates
        let outputRow = '';

        let dateNr = 1;

        for (let i = 0; i < 5; i++) {

            outputRow += '<div>';

            for (let j = 0; j < 7; j++) {

                let outputDay = '';

                if (i === 0 && j < firstDay) {
                    outputDay += '<span class="prev-month">';
                } else if (dateNr > daysOfMonth) {
                    outputDay += '<span class="next-month">';
                    //break;
                } else {
                    let classList = [];

                    //today date class
                    if (dateNr === date.getDate() &&
                        year === date.getFullYear() &&
                        month === date.getMonth()) {
                        classList.push("today");
                    }

                    let classNames = classList.join(' ');

                    outputDay += "<span class='" + classNames + "'>";

                    outputDay += dateNr;

                    dateNr++;
                }

                outputDay += "</span>";

                outputRow += outputDay;
            }

            outputRow += '</div>';

        }

        calendarDataElem.innerHTML = outputRow;

    }

    function prevMonth() {
        currentYear = (currentMonth === 0) ? currentYear : currentYear - 1;
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;

        showCalendar(currentYear, currentMonth);
    }

    function nextMonth() {
        currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;

        showCalendar(currentYear, currentMonth);

    }

})();
