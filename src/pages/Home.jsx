import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { getCategories } from '../helpers/category';

function Home() {

  const categories = getCategories();

  const topPicks = useSelector(state => state.dishes.filter(dishes => dishes.isTopPick));

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100 img-fluid" src="banner1.jpg" alt="First slide" />
          <Carousel.Caption>
            <h2 className='text-white'>Delicious Meals Delivered</h2>
            <p className='text-white'>Get your favorite dishes delivered hot & fresh to your door.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 h-30 img-fluid" src="banner2.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h2 className='text-white'>Lightning-Fast Delivery</h2>
            <p className='text-white'>Enjoy food from local restaurants in under 30 minutes.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 h-30 img-fluid" src="banner3.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h2 className='text-white'>Explore 100+ Food Options</h2>
            <p className='text-white'>From pizza to biryani – there’s something for everyone on Tastique.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className='mt-4'>
        <h1 className='text-center pb-3 fst-italic'> - Why you'll love Tastique -</h1>
        <Row>
          <Col className='mb-5'>
            <Card style={{ width: '20rem', height: '23rem ' }}>
              <Card.Img variant="top" src="card1.webp" />
              <Card.Body>
                <Card.Title>🍽️ Delicious Variety</Card.Title>
                <Card.Text>
                  From sizzling street food to gourmet delights, Tastique serves every craving with a rich menu across multiple cuisines.
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
          <Col className='mb-5'>
            <Card style={{ width: '20rem', height: '23rem ' }}>
              <Card.Img variant="top" src="card2.jpeg" />
              <Card.Body>
                <Card.Title>🕒 Fast & Fresh Delivery</Card.Title>
                <Card.Text>
                  We ensure your food reaches you piping hot and on time, every single time.
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
          <Col className='mb-5'>
            <Card style={{ width: '20rem', height: '23rem ' }}>
              <Card.Img variant="top" src="card3.webp" />
              <Card.Body>
                <Card.Title>👨‍🍳 Curated by Food Experts</Card.Title>
                <Card.Text>
                  Every dish is quality-checked and chef-approved to deliver consistent taste and hygiene.
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
      <Container>
        <Row>
          <h3 className='pb-3 text-center'>Explore Our Categories</h3>
          {categories.map((cat, index) => (
            <Col key={index} md={1} className='m-2'>
              <Card className="text-center border-0 shadow-sm" style={{ width: '100px' }}>
                <Card.Img variant="top" src={cat.image} style={{ height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <Card.Body className="p-2">
                  <Card.Title as="h6" className="mb-0" style={{ fontSize: '0.9rem' }}>
                    <Link to={`/category/${cat.id}`} className="text-decoration-none text-dark">
                      {cat.title}
                    </Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="mt-3 mb-5">
        <h3 className="pb-3 text-center">Top Picks Near You</h3>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {topPicks.length ? (
            topPicks.map(dish => (
              <Col key={dish.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={dish.image}
                    style={{ height: '160px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{dish.name}</Card.Title>
                    <Card.Text>
                      {dish.details}
                    </Card.Text>
                    <Card.Text>₹{dish.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No top picks available right now.</p>
          )}
        </Row>
      </Container>
    </>

  )
}

export default Home