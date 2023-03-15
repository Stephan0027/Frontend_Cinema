import { useStates } from './utilities/states';
import { useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


//show ticket types
function ShowTicketTypes({ tickets, ticketTypes }) {
  let totalPrice = 0;

  let text = "";
  for (let i = 0; i < tickets.length; i++) {
    let price = Number(tickets[i]) * Number(ticketTypes[i]["price"])

    //add if ticketype is chosen
    if (price > 0) {

      if (text !== "") {
        text += ", "
      }
      text += `${tickets[i]} ${ticketTypes[i]["name"]}`
      totalPrice = Number(totalPrice) + price;
    }
  }

  return <>
    <tr>
      <td><p>Tickets:</p></td>
      <td><p style={{ textAlign: 'right' }}><b>{text}</b></p></td>
    </tr>
    <tr>
      <td><p>Total Price:</p></td>
      <td><p style={{ textAlign: 'right' }}><b>{totalPrice}SEK</b></p></td>
    </tr>
  </>

}

//show seat numbers
function ShowSeats({ seats }) {
  let list = [];

  //sort seats
  seats.sort((a, b) => a > b ? 1 : -1);

  let counter = 0;
  let text = "| ";
  for (let seat of seats) {
    counter += 1
    text += `${seat} | `

    if (counter == 6) {
      list.push(<p key={seat} style={{ textAlign: 'right' }}><b>{text}</b></p>)
      text = "| ";
      counter = 0;
    }

  }

  if (counter > 0) {
    list.push(<p key={counter} style={{ textAlign: 'right' }}><b>{text}</b></p>)
  }

  return <>
    <tr>
      <td><p>Seats:</p></td>
      <td>{list}</td>
    </tr>
  </>

}

//show screeninginfo
function ShowScreeningInfo({ info }) {

  let time = new Date(info["screeningTime"]);
  let minute = time.getMinutes()
  let hour = time.getHours()
  let dayDate = time.getDate()
  let month = time.getMonth()

  minute = (minute < 10) ? `0${minute}` : minute;
  hour = (hour < 10) ? `0${hour}` : hour;

  return <>
    <tr>
      <td><p>Title:</p></td>
      <td><p style={{ textAlign: 'right' }}><b>{info["movie"]}</b></p></td>
    </tr>
    <tr>
      <td><p>Date:</p></td>
      <td><p style={{ textAlign: 'right' }}><b>{hour}:{minute}, {month}/{dayDate}</b></p></td>
    </tr>
    <tr>
      <td><p>Auditorium:</p></td>
      <td><p style={{ textAlign: 'right' }}><b>{info["auditorium"]}</b></p></td>
    </tr>
  </>

}


export default function Booking() {
  const s = useStates('main');

  const { id } = useParams();
  const location = useLocation();
  const tickets = location.state.ticketSelection;
  const screeningId = location.state.screeningId;
  const seats = location.state.seatSelection;

  //read occupied seat data
  useEffect(() => {
    (async () => {
      s.occupiedSeats = await (await (fetch(`/api/occupied_seats?screeningId=${screeningId}`))).json();
    })();
  }, []);


  return ((s.ticketTypes.length === 0) || (s.occupiedSeats.length === 0)) ? null : <>
    <Container>
      <Row>
        <Col lg={10} >
          <h3>Thank you for your reservation!</h3>
          <p>A booking is made with reservation nr. <b>{id.replace("=", ".")}</b> for:</p>
          <Table>
            <tbody>
              <ShowScreeningInfo
                info={s.occupiedSeats[0]} />
              <ShowTicketTypes
                tickets={tickets}
                ticketTypes={s.ticketTypes} />
              <ShowSeats seats={seats} />
            </tbody>
          </Table>

          <p>(Please, pick up your tickets at the ticketcounter max. 1 hour before the screening starts.)</p>
        </Col>

      </Row>
    </Container>
  </>
}