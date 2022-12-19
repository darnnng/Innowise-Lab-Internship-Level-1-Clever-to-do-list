import { useEffect, useState } from 'react';
import '../Calendar/Calendar.scss';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { UserAuth } from '../../../context/AuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';

const Calendar = ({ showDetailsHandle, todos, date }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [undone, setUndone] = useState([]);
  const [done, setDone] = useState([]);
  const theme = useContext(ThemeContext);

  let undArr = [];
  let doneArr = [];

  const { user } = UserAuth();
  const todosCollection = collection(db, 'users', `${user.uid}`, 'todos');

  useEffect(() => {
    const queryTodosUndone = query(
      todosCollection,
      where('isDone', '==', false),
      where('time', '==', date)
    );
    const unsubscribe = onSnapshot(queryTodosUndone, (querySnapshot) => {
      let undoneArr = [];
      querySnapshot.forEach((doc) => {
        undoneArr.push(doc.data().time);
      });

      setUndone(undoneArr);
    });
    return () => unsubscribe();
  }, [date]);

  useEffect(() => {
    const queryTodosDone = query(
      todosCollection,
      where('isDone', '==', true),
      where('time', '==', date)
    );
    const unsubscribe = onSnapshot(queryTodosDone, (querySnapshot) => {
      let doneArr = [];
      querySnapshot.forEach((doc) => {
        doneArr.push(doc.data().time);
      });
      setDone(doneArr);
    });
    return () => unsubscribe();
  }, [date]);

  const changeWeekHandle = (btnType) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header cal-row flex-middle">
        <div className="col col-start"></div>
        <div className="col col-center">
          <span style={{ color: theme.maintextcolor }}>
            {format(currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end"></div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          style={{ color: theme.maintextcolor }}
          className="col col-center"
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days cal-row">{days}</div>;
  };

  const chooseDay = (cloneDay) => {
    const dayStr = format(cloneDay, 'dd.MM.yyyy');
    onDateClickHandle(cloneDay, dayStr);
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    if (undone[0] !== undefined && !undArr.includes(undone[0])) {
      undArr.push(undone[0]);
    }

    if (done[0] !== undefined && !doneArr.includes(done[0])) {
      doneArr.push(done[0]);
    }

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? 'today'
                : isSameDay(day, selectedDate)
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => chooseDay(cloneDay)}
          >
            <span style={{ color: theme.maintextcolor }} className="number">
              {formattedDate}
            </span>

            {undArr.includes(format(cloneDay, 'dd.MM.yyyy')) ? (
              <div className="circle"></div>
            ) : (
              ''
            )}

            {doneArr.includes(format(cloneDay, 'dd.MM.yyyy')) ? (
              <div className="circle circle2"></div>
            ) : (
              ''
            )}
            {/* {undone.length<1 ? "": <div className="circle"></div>}
            {done.length<1 ? "": <div className="circle circle2"></div>} */}
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
      <div
        style={{ background: theme.container }}
        className="calendar-container"
      >
        <div className="header cal-row flex-middle">
          <div className="col col-start">
            <div
              style={{ color: theme.maintextcolor }}
              className="icon"
              onClick={() => changeWeekHandle('prev')}
            >
              <FaArrowAltCircleLeft />
            </div>
          </div>

          <div className="col col-end" onClick={() => changeWeekHandle('next')}>
            <div style={{ color: theme.maintextcolor }} className="icon">
              <FaArrowAltCircleRight />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ background: theme.container }} className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
  );
};

export { Calendar };
