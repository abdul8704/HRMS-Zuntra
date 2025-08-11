import React, { useState, useEffect } from 'react'
import { TimeCard } from '../../dashboard/components/TimeCard'
import { AttendanceCalendar } from '../../attendance/components/AttendanceCalendar'
import { AttendanceCard } from '../../attendance/components/AttendanceCard'
import { WorkBreakComposition } from '../../dashboard/components/WorkBreakComposititon'
import { getFirstOfMonth, getEndOfDay, getToday } from "../../../utils/dateUtils";
import api from '../../../api/axios'
import LeaveTable from '../../attendance/components/LeaveTable'

export const EmployeeDetailsAssignment = ({ userid }) => {
  const [today, setToday] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [calendarData, setCalendarData] = useState([])
  const [loginTime, setLoginTime] = useState('N/A');
  const [logoutTime, setLogoutTime] = useState('N/A');
  const [workTime, setWorkTime] = useState('N/A');
  const [breakTime, setBreakTime] = useState('N/A');
  const [attendanceData, setAttendanceData] = useState({
    "attendanceData": [],
    "stats": {}
  });
  const [workBreakData, setWorkBreakData] = useState({
    "last7Days": [],
    "last30Days": [],
  });


  useEffect(() => {
    fetchCalendarData(new Date().getFullYear(), new Date().getMonth() + 1)
  }, [userid])

  useEffect(() => {
    setToday(getToday());
    setStartDate(getFirstOfMonth(today));
    setEndDate(getEndOfDay(today));
    
    try {
      const getTimeCards = async () => {
        const response = await api.get('api/employee/attendace/time-cards', {
          params: {
            userid: String(userid),
            date: today
          }
        })

        if (response.data.success) {
          setLoginTime(response.data.timeCards.login)
          setLogoutTime(response.data.timeCards.logout)
          setWorkTime(response.data.timeCards.work)
          setBreakTime(response.data.timeCards.break)
        }
      }

      const getWorkBreakData = async () => {
        const res = await api.get("/api/employee/attendance/work-break", {
          params: {
            todayDate: today,
            userid: userid
          }
        })

        setWorkBreakData(res.data.workBreakData)
      }

      const getAttendanceData = async () => {
        const res = await api.get("/api/employee/attendance/attendance-data", {
          params: {
            startDate,
            endDate,
            userid
          }
        }
        )

        setAttendanceData(res.data.attendanceData);
      }

      getWorkBreakData();
      getTimeCards();
      getAttendanceData();
    } catch (error) {
      console.log(error)
    }

  }, [])

  const fetchCalendarData = async (year, month) => {
    if (!userid) return

    const startDate = new Date(
      Date.UTC(year, month - 1, 1, 0, 0, 0)
    ).toISOString()
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59)).toISOString()

    try {
      const response = await api.get('/api/employee/attendance/calendar', {
        params: {
          startDate,
          endDate,
          userid
        }
      })

      setCalendarData(response.data.calendarData)
      console.log(
        `Fetched data for ${month}/${year}:`,
        response.data.calendarData
      )
    } catch (err) {
      console.error('Error fetching calendar data:', err)
    }
  }

  const handleMonthYearChange = (year, month) => {
    fetchCalendarData(year, month)
  }

  return (
    <div className='flex-1 grid grid-cols-8 grid-rows-12 gap-2 h-full w-full'>
      <div className='col-start-1 row-start-1 row-end-3'>
        <TimeCard state='in' time={loginTime} showLabel={true} color={true} />
      </div>

      <div className='col-start-1 row-start-3 row-end-5'>
        <TimeCard state='out' time={logoutTime} showLabel={true} color={true} />
      </div>

      <div className='col-start-2 row-start-1 row-end-3'>
        <TimeCard state='work' time={workTime} showLabel={true} color={true} />
      </div>

      <div className='col-start-2 row-start-3 row-end-5'>
        <TimeCard state='break' time={breakTime} showLabel={true} color={true} />
      </div>

      <div className='bg-black/10 col-start-3 col-end-6 row-start-1 row-end-5 rounded-lg overflow-hidden'>
        <WorkBreakComposition data={workBreakData} />
      </div>

      <div className='col-start-6 col-end-10 row-start-1 row-end-7 rounded-lg '>
        <AttendanceCard data={{userid, startDate, endDate}} />
      </div>

      <div className='bg-black/20 col-start-6 col-end-10 row-start-7 row-end-12 min-h-0 rounded-lg'>
        <LeaveTable />
      </div>

      <div className='col-start-1 col-end-6 row-start-5 row-end-12 rounded-lg'>
        <AttendanceCalendar
          calendarData={calendarData}
          onMonthYearChange={handleMonthYearChange}
        />
      </div>
    </div>
  )
}