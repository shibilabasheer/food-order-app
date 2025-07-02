import { React, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addDish, updateDish } from '../redux/slices/dishesSlice';
import { getCategories } from '../helpers/category';

function DishForm({ editingDish, setEditingDish }) {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState("");
    const [isTopPick, setIsTopPick] = useState(false);

    
    const categoryList = getCategories();
    const [categories, setCategories] = useState(categoryList)

    useEffect(() => {

        if (editingDish) {

            setName(editingDish.name);
            setPrice(editingDish.price);
            setCategory(editingDish.category);
            setDetails(editingDish.details);
            setImage(editingDish.image);
            setIsTopPick(!!editingDish.isTopPick);

        } else {

            setName('');
            setPrice('');
            setCategory('');
            setDetails('');
            setImage('');
            setIsTopPick(false);
        }

    }, [editingDish]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !price || !category || !details || !image) {
            alert('All fields are required');
            return;
        }

        const dishData = {
            id: editingDish ? editingDish.id : Date.now(),
            name,
            price,
            category,
            details,
            image,
            isTopPick
        };

        if (editingDish) {
            dispatch(updateDish(dishData));
            setEditingDish(null);
        } else {
            dispatch(addDish(dishData));
        }

        setName(''); setPrice(''); setCategory(''); setDetails(''); setImage(''); setIsTopPick(false);
    };

    return (
        <>
        <h5 className="pb-3 text-center">Add Dishes</h5>
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="row g-2">
                <div className="col-12 col-md">
                    <input type="text" placeholder="Enter Dish Name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-12 col-md">
                    <input type="number" placeholder="Enter Dish Price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="col-12 col-md">
                    <select placeholder="Choose Dish Category" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} >
                        <option value="">Choose Dish Category</option>
                        {categories.map((category, index) => {
                            return (
                                <option value={category.id} key={index}>{category.title}</option>
                            )
                        })
                        }
                    </select>
                </div>
                <div className="col-12 col-md">
                    <textarea placeholder="Enter Dish details" className="form-control" value={details} onChange={(e) => setDetails(e.target.value)} />
                </div>
                <div className="col-12 col-md">
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="col-12 col-md-auto form-check">
                    <input type="checkbox" id="topPick" className="form-check-input" checked={isTopPick} onChange={e => setIsTopPick(e.target.checked)} />
                    <label htmlFor="topPick" className="form-check-label">
                        Top Pick
                    </label>
                </div>
                {image && <img src={image} alt="Preview" style={{ height: '100px', width: '100px' }} className="mb-2" />}
                <div className="col-12 col-md-auto">
                    <button type="submit" className={`btn ${editingDish ? 'btn-warning' : 'btn-success'}`}>
                        {editingDish ? 'Update' : 'Add'} Dish
                    </button>
                </div>
            </div>
        </form>
<hr />
</>
    )
}

export default DishForm