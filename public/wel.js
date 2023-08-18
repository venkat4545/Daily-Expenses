const eventDay = document.querySelector(".event-day"),
      eventDate = document.querySelector(".event-date"),
      date = document.querySelector(".date");
      
const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
};
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
 
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    
    let currentDate = new Date();
    
    month_picker.innerHTML = month_names[month];
    
    calendar_header_year.innerHTML = year;
    
    let first_day = new Date(year, month).getDay();
  
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < first_day; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("day");
      calendar_days.appendChild(emptyDay);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    let day = document.createElement('div');
    day.classList.add("day");
    day.textContent = i;
    if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      const currentDate= document.getElementById("event-date");
      const todaydatee=document.getElementById("today-datee");
      const todaydate=document.getElementById("today-date");
      day.classList.add("current-date");
      const formattedDate = `${month_names[month]} ${i}, ${year}`;
      todaydate.value=`${formattedDate}`;
      todaydatee.value=`${formattedDate}`;
      currentDate.value=`${formattedDate}`;
    }
      day.addEventListener("click", () => {
        displayDate(year, month, i);
    });
      calendar_days.appendChild(day);
    }

  };
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });
  
  (function () {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');

  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);

  function displayDate(year,month,day){
  const dateDisplay = document.getElementById("event-date");
  const formattedDate = `${month_names[month]} ${day}, ${year}`;
  dateDisplay.value =  `${formattedDate}`;
  }
const openPopup = document.getElementById("openPopup");
const popup=document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

openPopup.addEventListener("click", () => {
    popup.style.display = "flex";
});

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

const openPopupTask = document.getElementById("openPopupTask");
const popupTask=document.getElementById("popupTask");
const closePopupTask = document.getElementById("closePopupTask");

openPopupTask.addEventListener("click", () => {
    popupTask.style.display = "flex";
});

closePopupTask.addEventListener("click", () => {
    popupTask.style.display = "none";
});

const avatar = document.getElementById('avatar');
const dropdown=document.getElementById('dropdown');
    avatar.addEventListener('click', () => {
      if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    });
