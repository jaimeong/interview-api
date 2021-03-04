import React, { useState, useRef, useEffect } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import moment from 'moment';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const Schedule = () => {
    const [view, setView] = useState('month');
    const [isToday, setIsToday] = useState('false');
    const start = new Date();
    const end = new Date(new Date().setMinutes(start.getMinutes() + 30));
    const [schedule, setSchedule] = useState([
        {
            calendarId: "0",
            category: "time",
            isVisible: true,
            title: "Study",
            id: "1",
            body: "Test",
            bgColor: "purple",
            start,
            end,
            location: "",
          },
    ]);
    const calendar = useRef(null);
    const selectView = useRef(null);

    useEffect(() => {
        console.log(schedule);
    }, [schedule])

    function changeView() {
        let currentView = selectView.current.value;
        if(currentView === 'daily') {
            setView("day");
        } else if(currentView === 'weekly') {
            setView("week")
        } else {
            setView("month")
        }
    }

    function handlePrev() {
        calendar.current.getInstance().prev();
    }

    function handleNext() {
        calendar.current.getInstance().next();
    }

    function handleToday() {
        if(!isToday) {
            setView("day");
            calendar.current.getInstance().today();
            setIsToday(true);
        } else {
            setView("month");
            setIsToday(false);
        }
    }

    function onBeforeCreateSchedule(scheduleData) {
        console.log(scheduleData);

        const newSchedule = {
            id: String(Math.random()),
            title: scheduleData.title,
            start: scheduleData.start,
            calendarId: "0",
            end: scheduleData.end,
            bgColor: "purple",
            isVisible: true,
            category: scheduleData.isAllDay ? "allday" : "time",
            location: scheduleData.location,
        }

        calendar.current.getInstance().createSchedules([newSchedule]);

        setSchedule([...schedule, newSchedule])
    }

    function onBeforeDeleteSchedule(res) {
        console.log(res.schedule);
        const {id, calendarId} = res.schedule;
        calendar.current.getInstance().deleteSchedule(id, calendarId);
    }

    return (
        <div>
        <h1>Schedule</h1>
        <nav>
      <select id="view-select" ref={selectView} onChange={changeView}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly" selected="selected">Monthly</option>
      </select>
      <button id="today-btn" onClick={handleToday}>Today</button>
      <div class="nav-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-chevron-left"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          id="prev"
          onClick={handlePrev}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-chevron-right"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={handleNext}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </div>
      <p id="current-date"></p>
    </nav>
        <Calendar 
            height="900px"
            calendars={[
                {
                  id: '0',
                  name: 'Interviews',
                  color: '#ffffff',
                  bgColor: '#9e5fff',
                  dragBgColor: "#9e5fff",
                  borderColor: '#9e5fff'
                },
            ]}
            view={view}
            ref={calendar}
            useDetailPopup={true}
            useCreationPopup={true}
            onBeforeCreateSchedule={onBeforeCreateSchedule}
            onBeforeDeleteSchedule={onBeforeDeleteSchedule}
            schedules={schedule}
            timezones={[
                {
                  timezoneOffset: -420,
                  displayLabel: 'GMT-08:00',
                  tooltip: 'Los Angeles'
                }
            ]}
        />
        </div>
    )
}

export default Schedule;