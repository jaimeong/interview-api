import React, { useState, useRef, useEffect } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import moment from 'moment';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import axios from 'axios';

const Schedule = () => {
    const [view, setView] = useState('month');
    const [isToday, setIsToday] = useState('false');
    const [schedule, setSchedule] = useState([]);
    const [date, setDate] = useState('');
    const calendar = useRef(null);
    const selectView = useRef(null);

    useEffect(() => {
        setDate(calendar.current.getInstance().getDate()._date)
        axios.get('https://horsefields.wl.r.appspot.com/api/schedule')
        .then((res) => {
            setSchedule(res.data);
        })
    }, [])


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
        setDate(calendar.current.getInstance().getDate()._date)
    }

    function handleNext() {
        calendar.current.getInstance().next();
        setDate(calendar.current.getInstance().getDate()._date)
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

        const newSchedule = {
            id: String(Math.random()),
            title: scheduleData.title,
            start: scheduleData.start.toDate(),
            calendarId: "0",
            end: scheduleData.end.toDate(),
            bgColor: "purple",
            isVisible: true,
            category: scheduleData.isAllDay ? "allday" : "time",
            location: scheduleData.location,
        }
        console.log(newSchedule)

        axios.post('https://horsefields.wl.r.appspot.com/api/schedule', newSchedule)
        .then((res) => {
            console.log(res.data);
        })
        calendar.current.getInstance().createSchedules([newSchedule]);

        // if(schedule) {
        //     setSchedule([...schedule, newSchedule])
        // } else {
        //     setSchedule([schedule])
        // }
    }

    function onBeforeDeleteSchedule(res) {
        console.log(res.schedule);
        const {id, calendarId} = res.schedule;
        calendar.current.getInstance().deleteSchedule(id, calendarId);
    }

    return (
        <div>
        <div class='interview-nav'>
            <a className='home-btn' href='/dashboard'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
            </a>
            <a href='create-btn' href='/interviews/'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </a>
        </div>
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
        <p id="current-date">{date.toString().slice(0, 15)}</p>
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