import { useEffect, useState } from 'react';
import '../Calendar/Calendar.scss';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  addWeeks,
  subWeeks,
  getISODay,
} from 'date-fns';
import { UserAuth } from '../../../context/AuthContext';
import { onSnapshot } from 'firebase/firestore';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { todosService } from '../../../API/TodosService';

const Calendar = ({ showDetailsHandle, todos, date }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [undone, setUndone] = useState([]);
  const [done, setDone] = useState([]);

  const { isDarkTheme } = useContext(ThemeContext);
  const { user } = UserAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      todosService.getUndoneTodos(user.uid, date),
      (querySnapshot) => {
        let undoneArr = [];
        querySnapshot.forEach((doc) => {
          undoneArr.push(doc.data().time);
        });
        setUndone(undoneArr);
      }
    );
    return () => unsubscribe();
  }, [date]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      todosService.getDoneTodos(user.uid, date),
      (querySnapshot) => {
        let doneArr = [];
        querySnapshot.forEach((doc) => {
          doneArr.push(doc.data().time);
        });
        setDone(doneArr);
      }
    );
    return () => unsubscribe();
  }, [date]);

  const changeWeekHandle = (btnType) => {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1));
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1));
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
          <span className={isDarkTheme === true ? 'spandate' : 'spandate dark'}>
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
    const startDate = startOfWeek(currentMonth, {
      weekStartsOn: getISODay(new Date()),
    });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={
            isDarkTheme === true ? 'col col-center' : 'col col-center dark'
          }
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
    const startDate = startOfWeek(currentMonth, {
      weekStartsOn: getISODay(new Date()),
    });
    const endDate = lastDayOfWeek(currentMonth, {
      weekStartsOn: getISODay(new Date()),
    });

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

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
            <span className={isDarkTheme === true ? 'number' : 'number dark'}>
              {formattedDate}
            </span>

            {undone.includes(format(cloneDay, 'dd.MM.yyyy')) ? (
              <div className="circle"></div>
            ) : (
              ''
            )}

            {done.includes(format(cloneDay, 'dd.MM.yyyy')) ? (
              <div className="circle circle2"></div>
            ) : (
              ''
            )}
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
        className={
          isDarkTheme === true
            ? 'calendar-container'
            : 'calendar-container dark'
        }
      >
        <div className="header cal-row flex-middle">
          <div className="col col-start">
            <div
              className={isDarkTheme === true ? 'icon' : 'icon dark'}
              onClick={() => changeWeekHandle('prev')}
            >
              <FaArrowAltCircleLeft />
            </div>
          </div>

          <div className="col col-end" onClick={() => changeWeekHandle('next')}>
            <div className={isDarkTheme === true ? 'icon' : 'icon dark'}>
              <FaArrowAltCircleRight />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={isDarkTheme === true ? 'calendar' : 'calendar dark'}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
  );
};

export { Calendar };
