import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { addCart, updateCart } from '../redux/slices/cartSlice';
import { FaConciergeBell } from 'react-icons/fa';

function Category() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const allDishes = useSelector(state => state.dishes);
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const userId = loggedUser.id;

  let [categoryDishes, setCategoryDishes] = useState([]);

  useEffect(() => {
    if (id) {
      const filtered = allDishes.filter(dishes => dishes.category == id);
      setCategoryDishes(filtered);
    }
  }, [id])

  const cartDishes = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

  const handleCart = (dishId, dishPrice, dishName, dishImage) => {

    const existing = cartDishes.find(cart => cart.dish == dishId);

    if (existing) {

      dispatch(updateCart({ id: existing.id, user: userId, dish: dishId, price: dishPrice, name: dishName, image: dishImage, quantity: existing.quantity + 1 }));
      return;
    }

    const cartData = {
      id: Date.now(),
      user: loggedUser.id,
      dish: dishId,
      price: dishPrice,
      name: dishName,
      image: dishImage,
      price: dishPrice,
      quantity: 1
    }

    dispatch(addCart(cartData));
  }

  categoryDishes = categoryDishes.filter(dish => {
    if (productName && !dish.name.toLowerCase().includes(productName.toLowerCase()))
      return false;
    return true;
  });

  //localStorage.removeItem(`cart_${userId}`);
  //console.log(cartDishes)

  return (
    <Container className="mt-3 mb-2">
      <h3 className="pb-3 text-center">Explore Our Dishes</h3>
      <hr />
      <Row className="mb-4 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <input
            type="text"
            className="form-control text-center"
            placeholder="Search Products..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Col>
      </Row>

      {categoryDishes.length === 0 ? (
        <div className='text-center'>
          <FaConciergeBell size={80} color="gray" className="mb-4" />
          <h3 className="text-muted">No Dishes Available</h3>
          <p className="text-secondary">We’re curating the best dishes for you. Check back soon!</p>
        </div>

      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {
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

                    <Button variant="danger" onClick={() => handleCart(dish.id, dish.price, dish.name, dish.image)}>Add To Cart</Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}


    </Container>
  )
}

export default Category