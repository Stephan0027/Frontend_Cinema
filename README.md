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


## Interaction Rest API
This site uses data fetched from a REST API (created by the course instructor). The data was fetched using the fetch-function and was converted from the JSON format. The most important data was fetched when the page was first loaded. This was done in the **App.jsx**. By using *useEffect* it was possible to execute a await/async function correctly. This was needed to properly load the data from the rest API before running any other features/elements. 


## JSX files
The project contains of a set of jsx files that are responsible for different parts of the webpage. This is a distinctive react feature that makes it possible to create a webpage in a more modular way. Below the various jsx files are explained.


### Main.jsx
This is the **Main.jsx** file that is run and wherin all other components are included. 


### App.jsx
The **App.jsx** is called inside the **Main.jsx**. It includes the main "skeleton" of the webpage which can be seen in the return statement. This is made up of the header and the body. The last one mentioned include route paths to various parts of the webpage. Each one of them is linked to a specific jsx file. 

In the **App.jsx** the most important data is fetched from the rest API. This includes the information about all screenings, the movies, tickettypes and the auditoriums. 


### Movielist.jsx
The movielist is activated when the visitor first visits the site. Its goal is to visualise all screenings. They are grouped by day (screenings are orderd beforehand when fetching the data from the rest API). 

The **Movielist.js** uses two other react functions to visualise the data. The first is the *DayContainer* which is used for each screening day and contains all the movies that are shown that day. The second function is the *FilterBar* which is used to organise the screenings (filter on different conditions). This one was copied to a seperate file **FilterBar**.jsx. This function uses a useState for the day and one for the category. The DayContainer uses these two attributes to select relevant movies. 


### ScreeningDetail.jsx
This function is activated when the visitor clicks on one of the movies in the movielist. The visitor is redirected to a specific page containg details of the movie. This page is made up of three seperate components:


#### ScreeningInformation.jsx
This contains general information about the screening. It uses the urlString to retrieve the correct screening information and visualises this in a frame component.


#### TicketSelection.jsx
The **TicketSelection.jsx** contains a form wherein the user can specify the tickets he want to purchase. It is dynamically created based on the number of ticket types that are present in the database. It furthermore checks if the requested number of tickets does not exceed the available ones


#### SeatSelection.jsx
Finally the **SeatSelection.jsx** can be run when the user has selected one or more tickets. The user can press a button that will trigger an offcanvas widget containing the **SeatSelection.jsx**. This jsx visualises the auditorium relevant for the screening. Each row and seat is generated using the function *ShowRow*. Each seat has been given a seperate useState that changes based on the action of the user. When a seat is clicked the function *selectAction* is triggered. This will either activate or deactivate a seat. 

When all seats are selected a button appears where the user can confirm his booking. 


### Booking.jsx
When the user presses the confirm button in the **SeatSelection.jsx** function he will be redirected to the booking page. This is generate using the **Booking.jsx**. The *UseLocation* functionality was used to get access to the selection choices of the user on the previous page. Some specific screening data was read from the Rest API to create and print all relevant information. 


### Header.jsx
This contains the header of the webpage. Given this is a basic webpage limited styling and funtionality was added. The only feature implemented was a link to the home page (when clicking on the header title). 

