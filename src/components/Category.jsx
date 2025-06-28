import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addCart , updateCart} from '../redux/slices/cartSlice';

function Category() {

  const dispatch = useDispatch();
  const { id } = useParams()
  const allDishes = useSelector(state => state.dishes);
  const loggedUser = useSelector(state => state.user);
 
  const [categoryDishes, setCategoryDishes] = useState([]);

  useEffect(() => {
    if (id) {
      const filtered = allDishes.filter(dishes => dishes.category == id);
      setCategoryDishes(filtered);
    }
  }, [id])


  const cartDishes = useSelector(state => state.cart);

  const handleCart = (dishId) => {

    const existing = cartDishes.find(cart => cart.dish == dishId);

    if (existing) {
      dispatch(updateCart({ id:existing.id,user:loggedUser.user.id,dish: dishId, quantity: existing.quantity + 1 }));
      return;
    }

    const cartData = {
      id: Date.now(),
      user:loggedUser.user.id,
      dish: dishId,
      quantity: 1
    }

    dispatch(addCart(cartData));
  }

  console.log(cartDishes)
  


  return (
    <Container className="mt-3 mb-5">
      <h3 className="pb-3 text-center">Explore Our Dishes</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {categoryDishes.length ? (
          categoryDishes.map(dish => (
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

                  <Button variant="danger" onClick={()=>handleCart(dish.id)}>Add To Cart</Button>

                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No top picks available right now.</p>
        )}
      </Row>
    </Container>
  )
}

export default Category