import React from 'react'
import axios from 'axios';
import swal from 'sweetalert'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class ProductManagement extends React.Component{

    state = {
        data: null,
        showForm: null,
        showButton: true,
        idSelected: null,
        category: null
    }

    componentDidMount(){
        this.getData()
        this.getCategory()
    }

    getData = () => {
        axios.get('http://localhost:5000/products')
        .then((res) => {
            this.setState({data: res.data.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getCategory = () => {
        axios.get('http://localhost:5000/category-product')
        .then((res) => {
            this.setState({category: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onSubmitData = () => {
        let dataToSend = {
            name: this.name.value,
            brand: this.brand.value,
            category: this.category.value,
            stock: this.stock.value,
            price: this.price.value,
            discount: this.discount.value,
            weight: this.weight.value,
            image1: this.image1.value,
            image2: this.image2.value,
            image3: this.image3.value
        }
        axios.post('http://localhost:5000/post-data-product', dataToSend)
        .then((res) => {
            console.log(res)
            swal(`${res.data.message}`, "", "success");
            this.getData()
            this.name.value = ''
            this.brand.value = ''
            this.category.value = ''
            this.stock.value = ''
            this.price.value = ''
            this.discount.value = ''
            this.weight.value = ''
            this.image1.value = ''
            this.image2.value = ''
            this.image3.value = ''
            this.setState({showForm: false, showButton: true})
        })
        .catch((err) => {
            if(err.response.data.error === true){
                swal(`${err.response.data.message}`, "", "error");
            }
        })
    }

    onDeleteData = (idProduct) => {
        swal({
            title: "Yakin ingin menghapus data?",
            text: "",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:5000/product/${idProduct}`)
                .then((res) => {
                    swal(`${res.data.message}`, {
                        icon: "success",
                      });
                    this.getData()
                })
                .catch((err) => {
                    if(err.response.data.error === true){
                        swal(`${err.response.data.message}`, {
                            icon: "error",
                          });
                    }
                })
              
            } else {
              swal("Data tidak jadi dihapus");
            }
          });
        // let confirm = window.confirm('Anda yakin ingin menghapus data?')

        // if(confirm === true){
        //     axios.delete(`http://localhost:5000/product/${idProduct}`)
        //     .then((res) => {
        //         swal(`${res.data.message}`, "", "success")
        //         this.getData()
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // }

    }

    onUpdateData = (idProduct) =>{
        let dataToSend = {
            name: this.editName.value,
            brand: this.editBrand.value,
            category: this.editCategory.value,
            stock: this.editStock.value,
            price: this.editPrice.value,
            discount: this.editDiscount.value,
            weight: this.editWeight.value
        }
        if(dataToSend.name && dataToSend.brand && dataToSend.category && dataToSend.stock && dataToSend.price 
            && dataToSend.discount && dataToSend.weight){
                axios.patch(`http://localhost:5000/product/${idProduct}`, dataToSend)
                .then((res) => {
                    console.log(res)
                    this.setState({idSelected: null})
                    swal(`${res.data.message}`, "", "success");
                    this.getData()
                })
                .catch((err) => {
                    if(err.response.data.error === true){
                        swal(`${err.response.data.message}`, "", "error");
                    }
                })
            }
    }

    render(){
        if(this.state.data === null || this.state.category === null){
            return(
                <div className='container'>
                    Loading
                </div>
            )
        }
        return(
            <div className='container'>
                <table className="table table-striped my-5 ">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((value, index) => {
                                if(this.state.idSelected === value.id){
                                    return(
                                        <tr key={index}>
                                            <th scope="row" className='d-flex align-items-center'>{value.id}</th>
                                            <td>
                                                <input type="text" ref={(e) => this.editName = e} className='form-control' style={{width: 150}} defaultValue={value.name} />
                                            </td>
                                            <td>
                                                <input type="text" ref={(e) => this.editBrand = e} className='form-control' style={{width: 120}} defaultValue={value.brand} />
                                            </td>
                                            <td>
                                                <select ref={(e) => this.editCategory = e} className='form-control' style={{width: 100}} defaultValue={value.category}>
                                                    {
                                                        this.state.category.map((value, index) => {
                                                            return(
                                                                <option key={index} value={value.id}>{value.name}</option>
                                                                
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>
                                            <td>
                                                <input type="text" ref={(e) => this.editStock = e} className='form-control' style={{width: 100}} defaultValue={value.stock} />
                                            </td>
                                            <td>
                                                <input type="text" ref={(e) => this.editPrice = e} className='form-control' style={{width: 100}} defaultValue={value.price} />
                                            </td>
                                            <td>
                                                <input type="text" ref={(e) => this.editDiscount = e} className='form-control' style={{width: 100}} defaultValue={value.discount} />
                                            </td>
                                            <td>
                                                <input type="text" ref={(e) => this.editWeight = e} className='form-control' style={{width: 100}} defaultValue={value.weight} />
                                            </td>
                                            <td className='d-flex justify-content-center'>
                                                <input type="button" value="save" className="btn btn-success" onClick={() => this.onUpdateData(value.id)}/>
                                                <input type="button" value="cancel" className="btn btn-danger ml-2" onClick={() => this.setState({idSelected: null})} />
                                            </td>
                                        </tr>
                                    )
                                }else{
                                    return(
                                        <tr key={index}>
                                            <th scope="row">{value.id}</th>
                                            <td>{value.name}</td>
                                            <td>{value.brand}</td>
                                            <td>{value.category}</td>
                                            <td>{value.stock}</td>
                                            <td>{value.price}</td>
                                            <td>{value.discount}</td>
                                            <td>{value.weight}</td>
                                            <td>
                                                <Link to={`/product-management-detail/${value.id}`}>
                                                    <FontAwesomeIcon icon={faSearch} className='funniture-font-size-22' />
                                                </Link>
                                                <span onClick={() => this.onDeleteData(value.id)}>
                                                    <FontAwesomeIcon icon={faTrash} className='funniture-font-size-22 mx-3' />
                                                </span>
                                                <span onClick={() => this.setState({idSelected: value.id})}>
                                                    <FontAwesomeIcon icon={faEdit} className='funniture-font-size-22' />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        
                        }
                        
                    </tbody>
                </table>
                {
                    this.state.showForm?
                        <div>
                            <h3 className='my-3'>
                                Tambah data
                            </h3>
                            <form>
                            <div className='row'>
                                {/* kiri */}
                                <div className ='col-6'>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">name:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.name = e} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">brand:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.brand = e} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">category:</label>
                                        <select ref={(e) => this.category = e} className="form-control col-sm-4 ml-3" style={{width: 50}}>
                                        {
                                            this.state.category.map((value, index) => {
                                                return(
                                                    <option key={index} value={value.id}>{value.name}</option>
                                                    
                                                )
                                            })
                                        }
                                        </select>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">stock:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.stock = e} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">price:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.price = e} />
                                        </div>
                                    </div>

                                </div>
                                {/* kanan */}
                                <div className ='col-6'>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">discount:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.discount= e} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">weight:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.weight = e} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">image1 :</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.image1 = e} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">image2 :</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.image2 = e} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">image3 :</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control-50" ref={(e) => this.image3 = e} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                            <div className='my-3'>
                                <button onClick={this.onSubmitData} className='btn btn-info' style={{width: 150}}>
                                    Submit
                                </button>
                                <input type='button' value='Cancel' className= 'btn btn-danger ml-3' onClick={() => this.setState({showForm: !this.state.showForm, showButton: true})} />
                            </div>
                        </div>
                    :
                        null
                }
                {
                    this.state.showButton === true?
                        <div className='mb-3'>
                            <input type='button' value={this.state.showForm? 'Cancel' : 'Tambah Data'} className={this.state.showForm? 'btn btn-danger' : 'btn btn-warning' }  onClick={() => this.setState({showForm: !this.state.showForm, showButton: false})} />
                        </div>
                    :
                        null
                }
                

            </div>
        )
    }
}

export default ProductManagement