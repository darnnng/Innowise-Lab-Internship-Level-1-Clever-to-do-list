import {
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { format, getISODay, parseISO } from 'date-fns';

export let TodosObject;

export class TodosService {
  getTodos(userId, date) {
    const todosCollection = collection(db, 'users', `${userId}`, 'todos');
    const todosQuery = query(todosCollection, where('time', '==', date));
    return todosQuery;
  }

  setTodosList(querySnapshot) {
    let todosArr = [];
    querySnapshot.forEach((doc) => {
      todosArr.push({ ...doc.data(), id: doc.id });
    });
    return todosArr;
  }

  getUndoneTodos(userId, date) {
    const todosCollection = collection(db, 'users', `${userId}`, 'todos');
    // let year = +date.toString().slice(6, 10);
    // let month = +date.toString().slice(3, 5) - 1;
    // let day = +date.toString().slice(0, 2);
    // let seconds = new Date(year, month, day).getTime();
    let seconds = new Date().getTime() - 86400000;

    const todosUndoneQuery = query(
      todosCollection,
      where('isDone', '==', false),
      where('seconds', '>=', seconds)
    );
    return todosUndoneQuery;
  }

  getDoneTodos(userId, date) {
    const todosCollection = collection(db, 'users', `${userId}`, 'todos');
    let seconds = new Date().getTime() - 86400000;
    const todosDoneQuery = query(
      todosCollection,
      where('isDone', '==', true),
      where('seconds', '>=', seconds)
    );
    return todosDoneQuery;
  }

  deleteTask(userId, taskId) {
    return deleteDoc(doc(db, 'users', userId, 'todos', taskId));
  }

  updateIfDone(userId, todo) {
    return updateDoc(doc(db, 'users', userId, 'todos', todo.id), {
      isDone: !todo.isDone,
    });
  }

  updateTask(userId, taskId, description, title, date, time) {
    return updateDoc(doc(db, 'users', userId, 'todos', taskId), {
      description: description,
      title: title,
      time: format(parseISO(date), 'dd.MM.yyyy'),
      seconds: time,
    });
  }

  createTask(userId, description, title, date, time) {
    return addDoc(collection(db, 'users', userId, 'todos'), {
      title: title,
      isDone: false,
      description: description,
      time: format(parseISO(date), 'dd.MM.yyyy'),
      seconds: time,
    });
  }
}

export const todosService = new TodosService();
