import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState('');
  const [quantity,setQuantity] = useState('');
  const [processor,setProcessor] = useState('');
  const [memory,setMemory] = useState('');
  const [photo,setPhoto] = useState('');

//create product

const handleCreate = async(e)=>{
  e.preventDefault();
  try {
    const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("memory",memory);
      productData.append("processor", processor);
    const res = await axios.post('https://mobile-backend-taxn.onrender.com/api/v1/product/create-product',productData)
    if(res.data.success)
    {
      toast.success("Product Created Successfully");
      navigate("/dashboard/admin/products");
    }
    
  } catch (error) {
    console.log(error)
    toast.error('something went wrong in creating product')
  }
}


  return (
    <Layout title={'Dashboard-Create Products'}>
        <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label  className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name :" Upload Photo" }
                  <input type="file" name="photo" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder='Write Name of Product' className='form-control' onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <textarea type='text' value={description} placeholder='Write Description of Product' className='form-control' onChange={(e)=>setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={price} placeholder='Enter Price Of Product' className='form-control' onChange={(e)=>setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={quantity} placeholder='Enter Quantity of Product' className='form-control' onChange={(e)=>setQuantity(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={processor} placeholder='Enter processor of Product' className='form-control' onChange={(e)=>setProcessor(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" value={memory} placeholder='Enter Memory of Product' className='form-control' onChange={(e)=>setMemory(e.target.value)} />
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleCreate} style={{marginLeft:'330px'}}>CREATE PRODUCT</button>
              </div>

            </div>
            
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct