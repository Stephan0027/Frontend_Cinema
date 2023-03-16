# FRONTEND_CINEMA
Assignment 2 of frontend course

# Background
This repository contains a basic website to explore and learn the functionality of the react framework. The goal was to create a website for a cinema. The page needed to show all the movies that were playing and state some basic information about each movie. 

Some basic features needed to be implemented to get a feeling for the useState concepts and other specific react features. A visitor can:
```
> select a movie to view details
> filter screenings by category or day
> select tickets
> select seats
> make a booking and receive a summary of his choices
> view the webpage on different screens
```

# Code explanation
In this section the various components are discussed of the react website.

### Interaction Rest API
This site uses data fetched from a REST API (created by the course instructor). The data was fetched using the fetch-function and was converted from the JSON format. The most important data was fetched when the page was first loaded. This was done in the **App.jsx**. By using *useEffect* it was possible to execute a await/async function correctly. This was needed to properly load the data from the rest API before running any other features/elements. 

### JSX files
The project contains of a set of jsx files that are responsible for different parts of the webpage. This is a distinctive react feature that makes it possible to create a webpage in a more modular way. Below the various jsx files are explained.

##### Main.jsx
This is the **Main.jsx** file the is run and wherin all other components are included. 

##### App.jsx
The **App.jsx** is called inside the **Main.jsx**. It includes the main "skeleton" of the webpage which can be seen in the return statement. This is made up of the header and the body. The last one mentioned include route paths to various parts of the webpage. Each one of them is linked to a specific jsx file. 

In the **App.jsx** the most important data is fetched from the rest API. This includes the information about all screenings, the movies, tickettypes and the auditoriums. 

##### Movielist.jsx


