import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';


function ProductsScreen(props){

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;
    const productSave = useSelector((state) => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
      setModalVisible(true);
      setId(product._id);
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(saveProduct({ _id: id, name, price, image, category, countInStock, description })
        );
    };

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return <div className="content content-margin">
        <div className="product-header">
            <h3>Products</h3>
            <button className="button" onClick={() => openModal({}) }>Create Product</button>
        </div>

        {modalVisible && 
         <div className="form">
          <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                  <h2>Create Product</h2>
              </li>
              <li>
                  { loadingSave && <div>Loading...</div> }
                  { errorSave && <div>{ errorSave }</div> }
              </li>
              <li>
                  <label htmlFor="name">
                    Name
                  </label>
                  <input type="text" name="name" value={name} id="name" onChange={ (event) => setName(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="price">
                    Price
                  </label>
                  <input type="text" name="price" value={price} id="price" onChange={ (event) => setPrice(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="image">
                    Image
                  </label>
                  <input type="text" name="image" value={image} id="image" onChange={ (event) => setImage(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="category">
                    Category
                  </label>
                  <input type="text" name="category" value={category} id="category" onChange={ (event) => setCategory(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="countInStock">
                    CountInStock
                  </label>
                  <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={ (event) => setCountInStock(event.target.value) }>
                  </input>
              </li>
              <li>
                  <label htmlFor="description">
                    Description
                  </label>
                  <textarea name="description" value={description} id="description" onChange={ (event) => setDescription(event.target.value) }>
                  </textarea>
              </li>
              <li>
                  <button type="submit" className="button">
                     { id ? "Update" : "Create" } Create
                  </button>
              </li>
              <li>
                  <button type="button" className="button secondary" onClick={() => setModalVisible(false)}>
                      Back
                  </button>
              </li>
            </ul>
        </form>
    </div>
}

        <div className="product-list">
            <table className="table">
                <thead>
                 <tr>
                     <th>Id</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Category</th>
                     <th>Action</th>
                 </tr>
                </thead>
                <tbody>
                 {products.map(product => (<tr key={ product._id }>
                     <td>{ product._id }</td>
                     <td>{ product._name }</td>
                     <td>{ product._price }</td>
                     <td>{ product.category }</td>
                     <td>
                         <button className="button" onClick={() => openModal(product)}>Edit</button>
                         {' '}
                         <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                     </td>
                 </tr>))}
                </tbody>
            </table>
        </div>
    </div>
    
    
}


export default ProductsScreen;