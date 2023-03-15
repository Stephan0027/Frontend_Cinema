import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from "react-bootstrap/Image";


function Categories({ categories }) {
  let listItems = []
  for (let cat of categories) {
    listItems.push(
      <h5 key={cat} style={{ textAlign: 'right', lineHeight: '80%' }}> {cat}</h5>)
  }

  return (
    <>
      <p style={{ textAlign: 'left', lineHeight: '80%' }} > Category:</p>
      {listItems}
    </>
  );

}

export default function ScreeningInformation({ urlString, movies, days, occupiedSeats }) {
  let idArray = urlString.split("_")
  let day = idArray[0] + "-" + idArray[1] + "-" + idArray[2]
  let screeningId = idArray[3]

  //retrieve screening
  let screening = days[day].find(item => item.id == screeningId)
  let { time, id, movieId } = screening;
  let { description, title } = movies[movieId];
  let posterImage = 'https://cinema-rest.nodehill.se/' + description.posterImage;

  time = new Date(time);
  let minute = time.getMinutes()
  let hour = time.getHours()
  let dayDate = time.getDate()
  let month = time.getMonth()

  minute = (minute < 10) ? `0${minute}` : minute;
  hour = (hour < 10) ? `0${hour}` : hour;


  return <>
    <h2>{title}</h2>
    <h3 style={{ color: 'grey' }}>{hour}:{minute} | {month + 1}/{dayDate}</h3>
    <Col lg={6} md={6} sm={12} xs={12} style={{ padding: '5px' }}>
      <div style={{ border: '1px solid grey', padding: '20px' }}>
        <Row>
          <Col><Image src={posterImage} className='img-fluid' /></Col>
          <Col style={{ padding: '20px' }} >
            <p style={{ textAlign: 'left', lineHeight: '80%' }} > Length:</p>
            <h5 style={{ textAlign: 'right', lineHeight: '80%' }}> {description.length}min</h5>
            <Categories categories={description["categories"]} />
            <p style={{ textAlign: 'left', lineHeight: '80%' }} > Booked seats:</p>
            <h5 style={{ textAlign: 'right', lineHeight: '80%' }}> {occupiedSeats[0]["occupied"]} of {occupiedSeats[0]["total"]} seats booked</h5>
            <p style={{ textAlign: 'left', lineHeight: '80%' }} > Auditorium:</p>
            <h5 style={{ textAlign: 'right', lineHeight: '80%' }}> {occupiedSeats[0]["auditorium"]}</h5>
          </Col >
        </Row>
      </div>
    </Col>
  </>

}