import { useParams } from 'react-router-dom';
import { useStates } from './utilities/states';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import SeatSelection from './SeatSelection';
import TicketSelection from './TicketSelection';
import ScreeningInformation from './ScreeningInformation';


export default function ScreeningDetail() {
  const { id } = useParams();
  const s = useStates('main');

  //read occupied seat data
  useEffect(() => {
    (async () => {
      s.occupiedSeats = await (await (fetch(`/api/occupied_seats?screeningId=${id.split("_")[3]}`))).json();
    })();
  }, []);

  //registers how many tickets a customer chooses
  const [ticketChoice, setTicketChoice] = useState(Array(s.ticketTypes.length).fill(0));

  //controls off canvas widget
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return ((s.movies.length === 0) || (s.screeningDays.length === 0) || (s.ticketTypes.length === 0) || (s.auditoriumInfo.length === 0) || (s.occupiedSeats.length === 0)) ? null : <>
    <Container>
      <Row>
        <ScreeningInformation
          urlString={id}
          movies={s.movies}
          days={s.screeningDays}
          occupiedSeats={s.occupiedSeats}
        />
        <TicketSelection
          handleShow={handleShow}
          ticketChoice={ticketChoice}
          ticketTypes={s.ticketTypes}
          setTicketChoice={setTicketChoice}
          occupiedSeats={s.occupiedSeats}
        />
      </Row>
    </Container >

    <Offcanvas show={show} onHide={handleClose} placement={"right"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{s.occupiedSeats[0]["auditorium"]}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SeatSelection
          urlString={id}
          days={s.screeningDays}
          auditoriumInfo={s.auditoriumInfo}
          occupiedSeats={s.occupiedSeats}
          ticketChoice={ticketChoice}
        />
      </Offcanvas.Body>
    </Offcanvas>

  </>

}