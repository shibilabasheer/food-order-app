import { React, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import DishForm from '/src/components/DishForm'
import DishList from '/src/components/DishList'
import { useSelector } from 'react-redux';

function AdminDashboard() {

  const dishes = useSelector(state => state.dishes);
  const [editingDish, setEditingDish] = useState(null);

  return (
    <>
      <Container className="mt-5">
        <DishForm editingDish={editingDish} setEditingDish={setEditingDish} />
        <DishList editingDish={editingDish} setEditingDish={setEditingDish} />
      </Container>
    </>
  )
}

export default AdminDashboard