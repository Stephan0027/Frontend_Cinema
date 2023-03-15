import { useStates } from './utilities/states';
import { useState } from 'react';
import { Link } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";

import FilterBar from './FilterBar';


//Variables to retrieve correct day and month name
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

//function to visualise screening
function Screening({ id, day, time, title, description }) {
  let posterImage = 'https://cinema-rest.nodehill.se/' + description.posterImage;

  let categories = []
  for (let cat of description["categories"]) {
    categories.push(<p className="category" key={cat}> {cat}</p >)
  }

  //get screening time
  time = new Date(time);
  let minute = time.getMinutes()
  let hour = time.getHours()
  minute = (minute < 10) ? `0${minute}` : minute;
  hour = (hour < 10) ? `0${hour}` : hour;

  return (
    <Col lg={2} md={3} sm={6} xs={6} key={id} >
      <h3>{hour}:{minute}</h3>
      <Link to={'/screening/' + day.replaceAll("-", "_") + "_" + id}>
        <div className="screeningContainer">
          <Image src={posterImage} className="screeningImg" />
          <div className="overlay">
            <h5>{title}</h5>
            <p>({description.length}min)</p>
            {categories}

          </div>
        </div>
      </Link>
    </Col>)

}

//function to visualise a day
function DayContainer({ days, movies, selectedCategory, selectedDay }) {
  let rows = [];
  let value;

  for (let day in days) {
    let d = new Date(day)
    let dayName = dayNames[d.getDay()]
    let dayString = `${dayName}, ${d.getDate()}-${monthNames[d.getMonth()]}`

    //check if day matches filter
    if ((dayName === selectedDay) || (selectedDay === "All")) {
      //loop through screening of this day
      let cols = [];
      let screenings = days[day];
      for (let s = 0; s < screenings.length; s++) {
        //get movie and screening info
        let { time, id, movieId } = screenings[s];
        let { description, title } = movies[movieId];

        //create categories
        let categoriesString = ""
        for (let cat of description["categories"]) {
          categoriesString += cat
        }

        //check if movies matches filter category
        if ((categoriesString.includes(selectedCategory)) || (selectedCategory === "All")) {
          cols.push(
            <Screening
              key={id}
              id={id}
              day={day}
              time={time}
              title={title}
              description={description}
            />
          )
        }

      }

      //only add when day has 1 or more screenings
      if (cols.length !== 0) {
        rows.push(
          <Container key={day} >
            <h2>{dayString}</h2>
            <Container>
              <Row>
                {cols}
              </Row>
            </Container>
          </Container>
        )
      }
    }
  }
  return (<>{rows}</>)
}


export default function MovieList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');
  const s = useStates('main');

  return ((s.movies.length === 0) || (s.screeningDays.length === 0)) ? null : <>
    <Container>
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />
    </Container>
    <DayContainer
      days={s.screeningDays}
      movies={s.movies}
      selectedCategory={selectedCategory}
      selectedDay={selectedDay}
    />
  </>
}