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
import { format, parseISO } from 'date-fns';

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
    // let newdate = new Date();
    // let dateWeekAfter=format(newdate.setDate(newdate.getDate() + 7), 'dd.MM.yyyy');
    const todosCollection = collection(db, 'users', `${userId}`, 'todos');
    const todosUndoneQuery = query(
      todosCollection,
      where('isDone', '==', false),
      where('time', '==', date)
    );
    return todosUndoneQuery;
  }

  getDoneTodos(userId, date) {
    const todosCollection = collection(db, 'users', `${userId}`, 'todos');
    const todosDoneQuery = query(
      todosCollection,
      where('isDone', '==', true),
      where('time', '==', date)
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

  updateTask(userId, taskId, description, title, date) {
    return updateDoc(doc(db, 'users', userId, 'todos', taskId), {
      description: description,
      title: title,
      time: format(parseISO(date), 'dd.MM.yyyy'),
    });
  }

  createTask(userId, description, title, date) {
    return addDoc(collection(db, 'users', userId, 'todos'), {
      title: title,
      isDone: false,
      description: description,
      time: format(parseISO(date), 'dd.MM.yyyy'),
    });
  }
}

export const todosService = new TodosService();
