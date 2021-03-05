import React from 'react'

export default class ProductPage extends React.Component{
    render(){
        return(
            <div>
                <div className="container">
                    <div className ='row'>
                        <div className='col-12 col-md-6'>
                            {/* gambar */}
                            <div className='bg-secondary col-12 mt-3 ml-2' style={{height:'300px'}}>

                            </div>
                            <div className='d-flex col-12 mt-3' style={{height:'200px'}}>
                                <div className='bg-secondary col-4 ml-n2 mr-2' style={{height:'100px'}}>

                                </div>
                                <div className='bg-secondary col-4 mx-2' style={{height:'100px'}}>

                                </div>
                                <div className='bg-secondary col-4 mx-2' style={{height:'100px'}}>

                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 mb-4'>
                            {/* Konten Kanan */}
                            {/* Produk */}
                            <div className='mt-md-3 mt-n3'>
                                <h3>Nama Product</h3>
                                <p className='mt-n2'>Sold: 1 Product</p>
                            </div>
                            <div>
                                <h3>Price</h3>
                            </div>
                            <hr />
                            {/* stock */}
                            <div>
                                Stock: 10 item
                            </div>
                            <div>
                                Weight: 3 Kilogram
                            </div>
                            <hr />
                            {/* Description */}
                            <div>
                                <h5>Description:</h5>
                                <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nesciunt, atque nihil mollitia tenetur incidunt repellendus minus deleniti omnis officiis cum nam culpa sequi, veritatis fugiat veniam, quis officia velit.</h6>
                            </div>
                            <div className='mt-4 d-block d-sm-none d-md-none d-lg-none d-xl-block'>
                                <input type='button' value='Add To Cart' className ='btn btn-warning'style={{width: '220px'}} />
                                <input type='button' value='Beli Langsung' className ='btn btn-success ml-3' style={{width: '220px'}} />
                            </div>
                            <div className='mt-4 d-none d-sm-block d-md-block d-lg-block d-xl-none'>
                                <input type='button' value='Add To Cart' className ='btn btn-warning'style={{width: '155px'}} />
                                <input type='button' value='Beli Langsung' className ='btn btn-success ml-3' style={{width: '155px'}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}