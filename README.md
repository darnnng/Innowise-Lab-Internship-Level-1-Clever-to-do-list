# Innowise-Lab-Internship-Level-1-Clever-to-do-list

## 1.TASK

https://drive.google.com/file/d/18_BhhruPPw4hHlwD58uAXq7d5Y89k0UX/view?usp=sharing

## 2.HOW TO RUN THE APP

### npm i

To get all the dependencies installed.

### npm start

To start the app in browser

## 3.DATABASE SNAPSHOT

The authentication of users is done via email/password.
The firestore scheme:

users -- [uid] -- todos -- [id] - title,description,isDone,time <br/>
| -------[uid2]--todos ... <br/>
| -------[uid3]--todos ...

## 4.APPLICATION STACK

**react-router-dom** was used for routing <br/>
**date-fns** was used for manipulations with data <br/>
**react-toastify** was used for creating "toasts" with errors <br/>
**react-icons** was used for update/delete/arrow icons <br/>

## 5.FOLDER STRUCTURE

**Public** folder stores html-file. <br/>
In **src** folder there are: <br/> -**assets** which stores png-images <br/> -**context** which stores context for authentication and theme changing <br/> -**components** which stores the main logic of the app. <br/>
**main** folder contains the main todo logic and calendar. <br/>
**signin** and **signup** folders contain the logic for authentication

## ADDITIONAL

To change the theme go to src/context/ThemeContext.js. In line 28 you can change <br/>
'themes.light' to 'themes.dark' and vice versa
