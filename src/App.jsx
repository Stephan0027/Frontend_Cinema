import { useState, useEffect } from 'react';
import { useStates } from './utilities/states';
import { Routes, Route } from 'react-router-dom';

//page elements
import MovieList from './MovieList';
import ScreeningDetail from './ScreeningDetail';
import Booking from './Booking';
import Header from './Header';


//retrieve movies from database
async function fetchMovies() {
  const movies = await (await (fetch('/api/movies'))).json();

  //redefine with key
  let moviesId = {};
  for (let movie of movies) {
    moviesId[movie.id] = movie;
  }
  return moviesId;
}

//retrieve start data from database
async function fetchScreeningDays() {
  let screenings = await (await (fetch('/api/screenings?sort=time'))).json();

  //group in screening days
  let screeningDays = {};
  for (let id in screenings) {
    if (id !== "_mapNoAutoKey") {
      let day = String(screenings[id]["time"]).split("T")[0];

      //new or existing day
      if (!Object.keys(screeningDays).includes(day)) {
        screeningDays[day] = [screenings[id]];
      } else {
        screeningDays[day] = screeningDays[day].concat([screenings[id]]);
      }
    }
  }

  return screeningDays;
}


//retrieve seats of all the salloons
async function fetchSeats() {
  //fetch data from rest api
  let auditoriums = await (await (fetch('/api/auditoriums'))).json();
  let seats = await (await (fetch('/api/seats?sort=-seatNumber'))).json();

  //redefine salloons with key
  let auditoriumsId = {};
  for (let auditorium of auditoriums) {
    auditoriumsId[auditorium.id] = auditorium;
    auditoriumsId[auditorium.id]["rows"] = {}
  }

  //loop through seats
  let row, auditoriumId;
  for (let seat of seats) {
    row = String(seat.rowNumber);
    auditoriumId = seat["auditoriumId"];

    //add to correct row
    if (!Object.keys(auditoriumsId[auditoriumId]["rows"]).includes(row)) {
      auditoriumsId[auditoriumId]["rows"][row] = [[seat.seatNumber, seat.id]]
    } else {
      auditoriumsId[auditoriumId]["rows"][row].push([seat.seatNumber, seat.id])
    }
  }

  return auditoriumsId

}

export default function App() {
  //define main variables
  const s = useStates('main', {
    screeningDays: [],
    movies: [],
    ticketTypes: [],
    auditoriumInfo: [],
    occupiedSeats: [],
    bookings: []
  });

  //read some records on page load
  useEffect(() => {
    (async () => {
      s.screeningDays = await (fetchScreeningDays());
      s.movies = await (fetchMovies());
      s.auditoriumInfo = await (fetchSeats());
      s.ticketTypes = await (await (fetch('/api/ticketTypes'))).json();

    })();
  }, []);


  return ((s.movies.length === 0) || (s.screeningDays.length === 0) || (s.ticketTypes.length === 0) || (s.auditoriumInfo.length === 0)) ? null : <>
    <header>
      <Header />
      <hr className="hr" />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<MovieList />}></Route>
        <Route path="/screening/:id" element={<ScreeningDetail />} />
        <Route path="/booking/:id" element={<Booking />} />
      </Routes>
    </main>
  </>;
}