import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function UpdateTicket(index, value, ticketChoice, setTicketChoice, availableTickets) {
  let newTicketChoice = ticketChoice.slice();
  newTicketChoice[index] = value;

  //calculate total tickets
  let totalTickets = 0;
  for (let i = 0; i < ticketChoice.length; i++) {
    totalTickets = Number(totalTickets) + Number(newTicketChoice[i])
  }

  //do nothing if maximum reached
  if (totalTickets > availableTickets) {
    return
  }

  //else update tickets
  setTicketChoice(newTicketChoice);
}


export default function TicketSelection({ handleShow, ticketChoice, ticketTypes, setTicketChoice, occupiedSeats }) {
  let options = [];

  let availableTickets = Number(occupiedSeats[0]["total"]) - Number(occupiedSeats[0]["occupied"])

  for (let i = 0; i < ticketTypes.length; i++) {
    options.push(
      <Form.Group controlId={i} key={i}>
        <Form.Label>{ticketTypes[i]["name"]} - {ticketTypes[i]["price"]}SEK</Form.Label>
        <Form.Control type="number" min="0" placeholder="0" value={ticketChoice[i]}
          onChange={e => UpdateTicket(i, e.target.value, ticketChoice, setTicketChoice, availableTickets)} />
      </Form.Group>
    );

  }

  let totalPrice = 0;
  let totalTickets = 0;

  for (let i = 0; i < ticketTypes.length; i++) {
    totalPrice = Number(totalPrice) + (ticketChoice[i] * ticketTypes[i]["price"])
    totalTickets = Number(totalTickets) + Number(ticketChoice[i])
  }

  return <>
    <Col lg={6} md={6} sm={12} xs={12} style={{ padding: '5px' }}>
      <Row>
        <Col>
          <div style={{ border: '1px solid grey', padding: '20px' }}>
            <h5>Select your Tickets</h5>
            <Form>
              {options}
            </Form>
            <h5 style={{ textAlign: 'right' }} >{totalTickets} tickets - total price: {totalPrice} SEK</h5>
            <p style={{ textAlign: 'right' }} >({availableTickets - totalTickets} tickets left)</p>
            <Button variant="primary" onClick={handleShow} disabled={(totalTickets > 0) ? false : true}>
              Confirm & pick seats!
            </Button>
          </div>
        </Col>
      </Row>
    </Col>
  </>

}
