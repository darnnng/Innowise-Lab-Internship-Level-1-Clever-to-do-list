import { useEffect, useState } from "react";
import '../Calendar/Calendar.scss'
import {FaArrowAltCircleLeft,FaArrowAltCircleRight} from "react-icons/fa"
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";
import { UserAuth } from "../../../context/AuthContext";
import {  collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from "../../../firebase";

const Calendar = ({ showDetailsHandle, todos,data }) => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [undone,setUndone]=useState([])
  const [done,setDone]=useState([])


  const {user}=UserAuth()
  const todosRef=collection(db,'users',`${user.uid}`,'todos')


  useEffect(()=>{
    const q=query(todosRef, where ('isDone','==',false),where ('time','==',data))
    const unsubscribe=onSnapshot(q,(querySnapshot)=>{
        let undoneArr=[];
        querySnapshot.forEach((doc)=>{
            undoneArr.push(doc.data().time)
        })

    setUndone(undoneArr)
    console.log(undoneArr)
    })
    return ()=> unsubscribe;
},[user.uid,todos,data])


useEffect(()=>{
  const q=query(todosRef, where ('isDone','==',true),where ('time','==',data))
  const unsubscribe=onSnapshot(q,(querySnapshot)=>{
      let doneArr=[];
      querySnapshot.forEach((doc)=>{
          doneArr.push({...doc.data(),id:doc.id})
      })
console.log(done)
  setDone(doneArr)
  })
  return ()=> unsubscribe;
},[user.uid,todos,data])

  

  const changeWeekHandle = (btnType) => {
   
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
   
    return (
      <div className="header cal-row flex-middle">
        <div className="col col-start"></div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end"></div>
      </div>
    );
  };


  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days cal-row">{days}</div>;
  };


  const renderCells = () => {

    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push (
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => {
              const dayStr = format(cloneDay, "dd.MM.yyyy");
              onDateClickHandle(cloneDay, dayStr);
            }}

          >
            <span className="number">{formattedDate}</span>
            {undone.length<1 ? "": <div className="circle"></div>}
            {done.length<1 ? "": <div className="circle circle2"></div>}
            {/* <div className=" circle circle2"></div> */}
          </div>
        );
        
        day = addDays(day, 1);
      }

      rows.push(
        <div className="cal-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };


  const renderFooter = () => {
    return (
        <div className="calendar-container">
            <div className="header cal-row flex-middle">
                <div className="col col-start">
                  <div className="icon" onClick={() => changeWeekHandle("prev")}>
                      <FaArrowAltCircleLeft/>
                  </div>
                </div>
                
                <div className="col col-end" onClick={() => changeWeekHandle("next")}>
                  <div className="icon"><FaArrowAltCircleRight/></div>
                </div>
            </div>
      </div>
    );
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells() }
      {renderFooter()}
    </div>
  );
};

export default Calendar;
