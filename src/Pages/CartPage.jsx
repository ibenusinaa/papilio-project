import React from 'react'
import axios from 'axios'

export default class CartPage extends React.Component{

    state = {
        productCart: null

    }

    componentDidMount(){
        // this.getCart()
    }

    // getCart = () => {
    //     let id = localStorage.getItem('id')
    //     if(id){
    //         axios.get(`http://localhost:2000/carts?idUser=${id}`)
    //         .then((res) => {
    //             console.log(res.data)
    //             this.setState({productCart: res.data})
    //             this.state.productCart.forEach((value, index) =>{
    //                 let idProduct = 
    //                 axios.get('')
                    
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }else{

    //     }
    // }

    showCart = () => {
        if(this.state.productCart){
            return(
                this.state.productCart.map((value, index) => {
                    <div key={index} className='row my-2'>
                        <div className ='col-4 '>
                            <img src='https://nodaheights.com/wp-content/uploads/2017/08/Furniture-Background-Image.jpg' className='ml-3' style={{height:'100%', width:'100%'}} />
                        </div>
                        <div className ='col-8'>
                            <div className='ml-3'>
                                <h4>Nama Brand</h4>
                                <h6 className='mt-n2'>Lampu lantai/ baca, aluminium</h6>
                                <p>Jumlah item: 1</p>
                                <h5>Rp800.000</h5>
                            </div>
                        </div>
                    </div>
                })
            )
        }
    }

    render(){
        return(
            <>
                <div className = 'bg-light'>
                    <div className ='container'>
                        <div className = 'row d-flex'>
                            {/* row kiri */}
                            <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8'>
                                <div className='p-2 bg-white my-5'>
                                    <div className='col-12 mt-3'>
                                        <h3>
                                            Shopping Cart
                                        </h3>
                                        <hr/>
                                    </div>
                                    <div className='row my-2'>
                                        <div className ='col-4 '>
                                            <img src='https://nodaheights.com/wp-content/uploads/2017/08/Furniture-Background-Image.jpg' className='ml-3' style={{height:'100%', width:'100%'}} />
                                        </div>
                                        <div className ='col-8'>
                                            <div className='ml-3'>
                                                <h4>Nama Brand</h4>
                                                <h6 className='mt-n2'>Lampu lantai/ baca, aluminium</h6>
                                                <p>Jumlah item: 1</p>
                                                <h5>Rp800.000</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row my-2'>
                                        <div className ='col-4'>
                                            <img src='https://nodaheights.com/wp-content/uploads/2017/08/Furniture-Background-Image.jpg' className='ml-3' style={{height:'100%', width:'100%'}} />
                                        </div>
                                        <div className ='col-8'>
                                            <div className='ml-3'>
                                                <h4>Nama Brand</h4>
                                                <h6 className='mt-n2'>Lampu lantai/ baca, aluminium</h6>
                                                <p>Jumlah item: 1</p>
                                                <h5>Rp800.000</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* row kanan */}
                            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ' style={{height: '400px'}}>
                                <div className='p-2 bg-white mt-5'>
                                    <div className='col-12 mt-3'>
                                            <h3>
                                                Order Summary
                                            </h3>
                                            <hr/>
                                            <div className ='d-flex justify-content-between my-2'>
                                                <div>
                                                    Items Total
                                                </div>
                                                <div>
                                                    Rp1.600.000
                                                </div>
                                            </div>
                                            <div className ='d-flex justify-content-between my-2'>
                                                <div>
                                                    Shipping
                                                </div>
                                                <div>
                                                    -
                                                </div>
                                            </div>
                                            <hr/>
                                    </div>
                                    <div className='col-12'>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h5>Order Total</h5>
                                            </div>
                                            <div>
                                                <h5>Rp1.600.000</h5>
                                            </div>
                                        </div> 
                                    </div> 
                                    
                                    {/* Button here */}
                                    
                                </div>
                                <div className ='d-flex justify-content-center mt-4'>
                                        <div>
                                            <input type='button' value='Continue Shopping' className ='btn btn-outline-dark' />
                                        </div>
                                        <div className = 'ml-3'>
                                            <input type='button' value='Checkout' className ='btn btn-warning' />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}