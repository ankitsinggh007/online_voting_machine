# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Abot web app
there are total 2 pages in appication
->login/sigup page
->home page (little bit different for voter and admin)
as we register on app the data first varify and if all is good data will store in firebase auth for in future authentication and
all data that fill during registration is also stored in realtime firebase database except password with some additional 
attribute (i.e Vote)
#functions
->voter can vote for there candidtate.
->admin can create new contest only after completing current contest.
->admin can see who get how many vote.
->voter can only vote one time.
->admin can reset all the user at once make them eligible for vote again. 
->admin can set time duration

