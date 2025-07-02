import { React, useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteDish } from '../redux/slices/dishesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../helpers/category';

function DishList({ editingDish, setEditingDish }) {

  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const allDishes = useSelector(state => state.dishes);
  const categoryList = getCategories();

  const categoryMap = categoryList.reduce((map, cat) => {
    map[cat.id] = cat.title;
    return map;
  }, {});

  const handleEdit = (dish) => {
    setEditingDish(dish);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dish?')) {
      dispatch(deleteDish(id));
    }
  };

  const dishes = allDishes.filter(dish => {
    if (category && dish.category !== category)
      return false;
    if (productName && !dish.name.toLowerCase().includes(productName.toLowerCase()))
      return false;
    return true;
  });

  return (
    <>
     <h5 className="text-center">Dishes List</h5>
      <div className='row mt-4 mb-2'>
        <div className="col-5 col-md">
          <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} >
            <option value="">Search Products With Category</option>
            {categoryList.map((category, index) => {
              return (
                <option value={category.id} key={index}>{category.title}</option>
              )
            })
            }
          </select>
        </div>
        <div className="col-5 col-md">
          <input type="text" className="form-control" placeholder="Search Products..." value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="col-2 col-md">
          <button className="btn btn-success mb-3" onClick={() => {
            setCategory('');
            setProductName('');
          } }>
            Reset
          </button>
        </div>
      </div>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Top Pick</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No dishes found</td>
            </tr>
          ) : (
            dishes.map((dish, index) => (

              <tr key={index}>
                <td><img src={dish.image} alt={dish.name} width="60" /></td>
                <td>{dish.name}</td>
                <td>{dish.price}</td>
                <td>{categoryMap[dish.category] || "Unknown"}</td>
                <td>{dish.isTopPick ? "Yes" : "No"}</td>
                <td>{dish.details}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(dish)} title="Edit"><FaEdit /></button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dish.id)} title="Delete"><FaTrash /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default DishList;
