import { useState, useEffect } from 'react';
import { useStates } from './utilities/states';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



//function when seat is clicked
function selectAction(index, row, selectedSeats, setSelectedSeats, totalSelectedSeats, setTotalSelectedSeats, totalTickets) {
  let newSelectedSeats = selectedSeats.slice();

  let seatnr = Number(index) + 1
  seatnr = (seatnr < 10) ? `0${seatnr}` : seatnr;
  row = (row < 10) ? `0${row}` : row;
  let seatId = `r${row}s${seatnr}`

  //deselect
  if (selectedSeats[index] === "red") {
    newSelectedSeats[index] = "grey";

    //remove seatid from array
    let newSeatSelection = totalSelectedSeats.filter((x) => { return x !== seatId })
    setTotalSelectedSeats(newSeatSelection);

    //select
  } else {

    //all tickets selected
    if (totalSelectedSeats.length === totalTickets) {
      return
    }

    //add seatid to array
    let newSeatSelection = totalSelectedSeats.slice();
    newSeatSelection.push(seatId);
    setTotalSelectedSeats(newSeatSelection);
    newSelectedSeats[index] = "red";
  }

  setSelectedSeats(newSelectedSeats);
}

//show row of seats
function ShowRow({ row, seats, booked, selectedSeats, setSelectedSeats, totalSelectedSeats, setTotalSelectedSeats, totalTickets }) {
  let htmlRows = [];
  let index;
  booked = booked.split(", ")
  for (let seat of seats) {
    index = seat[0] - 1;

    if (booked.includes(String(seat[0]))) {
      htmlRows.push(
        <button
          key={seat[0]}
          className="bookedSeat"
          disabled={true}
        >x
        </button>);
    } else {
      htmlRows.push(
        <button
          key={seat[0]}
          className="freeSeat"
          name={index}
          style={{ backgroundColor: selectedSeats[index] }}
          onClick={(e) => selectAction(e.target.name, row, selectedSeats, setSelectedSeats, totalSelectedSeats, setTotalSelectedSeats, totalTickets)}
        > {seat[0]}
        </button >);
    }
  }

  return <>
    <div className="board-row">{htmlRows}</div>
  </>;
}

//generate a booking nr
function generateBookingNr() {
  const letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const lr = letter[Math.floor(Math.random() * 26) + 1];
  const nr = Math.floor(Math.random() * 899) + 100;
  let bookingNr = `${lr}${nr}`

  return bookingNr
}

export default function SeatSelection({ urlString, days, auditoriumInfo, occupiedSeats, ticketChoice }) {
  const s = useStates('main');


  //retrieve screening informatie
  let idArray = urlString.split("_")
  let day = idArray[0] + "-" + idArray[1] + "-" + idArray[2]
  let screeningId = idArray[3]
  let screening = days[day].find(item => item.id == screeningId)

  //retrieve auditorium information
  let auditoriumId = screening["auditoriumId"]
  let seats = auditoriumInfo[auditoriumId]["rows"]

  //create usestate variable to register seat choice
  const [selectedSeats, setSelectedSeats] = useState(Array(occupiedSeats[0]["total"]).fill("grey"));


  //count number of tickets selected
  const totalTickets = ticketChoice.reduce((a, b) => Number(a) + Number(b))
  const [totalSelectedSeats, setTotalSelectedSeats] = useState([]); //useState(totalTickets);
  let bookingNr = totalSelectedSeats.toString().substring(0, 6) + "=" + generateBookingNr()

  let htmlRows = [];
  let rows = Object.keys(seats);
  rows.sort()

  for (let row of rows) {
    htmlRows.push(
      <ShowRow
        key={row}
        row={row}
        seats={seats[row]}
        booked={occupiedSeats[0]["occupiedSeats"]}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        totalSelectedSeats={totalSelectedSeats}
        setTotalSelectedSeats={setTotalSelectedSeats}
        totalTickets={totalTickets}
      />
    );
  }

  return <>
    <Container style={{ textAlign: "center" }}>
      <h5>screen</h5>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12} >
          {htmlRows}
        </Col>
      </Row>
      <br></br>
      <p>{totalTickets - totalSelectedSeats.length} seats left to pick, click to select</p>
      {(totalSelectedSeats.length !== totalTickets) ? null :
        <Link to={"/booking/" + bookingNr} state={{ ticketSelection: ticketChoice, seatSelection: totalSelectedSeats, screeningId: screeningId }}>
          <Button variant="primary">
            Confirm Booking!
          </Button>
        </Link>
      }
    </Container>
  </>
}