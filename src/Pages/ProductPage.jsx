import axios from 'axios'
import React from 'react'

export default class ProductPage extends React.Component{

    state = {
        dataProduct: null,
    }

    componentDidMount(){
        let idProduct = this.props.location.pathname.split('/')[2]
        // console.log(idProduct) buat ngecek urlnya, nanti kita split buat ambil idnya nanti biar tau barang yang mana
        axios.get(`http://localhost:2000/products/${idProduct}`)
        .then((res) => {
            this.setState({dataProduct: res.data})
            
        })
        .catch((err)=>{
            
        })
        
    }
    
    addToCart = () => {
        let idProduct = this.props.location.pathname.split('/')[2]
        let idUser = localStorage.getItem('id')
        console.log(idProduct)
        console.log(idUser)
        // idUSer buat nyari tau user mana yang pesen item tersebut
        let dataToSend = {
            idProduct: idProduct,
            idUser: idUser,
            quantity: 1
        }
        // cek dulu pakai get
        axios.get(`http://localhost:2000/carts?idProduct=${idProduct}`)
        .then((res) => {
            if(res.data.length === 0){ //kalau ga ada post     
                axios.post('http://localhost:2000/carts/', dataToSend)
                .then((res)=> {
                    window.location =`http://localhost:3000/productpage/${idProduct}`
                })
                .catch((err) => {

                })
            }else{ // kalau ada kita patch ajaa
                let qtyOnDb = res.data[0].quantity //buat nyari tau qty item yang di db ada berapa
                let idProdOnDb = res.data[0].id //buat nyari tau dia id nomer berapa di db carts
                axios.patch(`http://localhost:2000/carts/${idProdOnDb}`, {quantity: qtyOnDb + 1 }) //cara patch harus ada idnya
                .then((res)=>{
                    window.location =`http://localhost:3000/productpage/${idProduct}`
                })
                .catch((err)=>{

                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }


    render(){
        return(
            this.state.dataProduct?

                <div>
                    <div className="container">
                        <div className ='row'>
                            <div className='col-12 col-md-6'>
                                {/* gambar */}
                                <div className='col-12 mt-3 ml-2 d-flex justify-content-center' style={{height:'300px'}}>
                                    <img src= {this.state.dataProduct.image1} alt='' style={{width: '80%', height: '300px'}} />
                                </div>
                                <div className='d-flex col-12 mt-3' style={{height:'200px'}}>
                                    <div className='col-4 ml-n2 mr-2' style={{height:'130px'}}>
                                        <img src= {this.state.dataProduct.image1} alt='' style={{width: '100%', height: '100%'}} />
                                    </div>
                                    <div className='col-4 mx-2' style={{height:'130px'}}>
                                        <img src= {this.state.dataProduct.image2} alt ='' style={{width: '100%', height: '100%'}} />
                                    </div>
                                    <div className='col-4 mx-2' style={{height:'130px'}}>
                                        <img src= {this.state.dataProduct.image3} alt='' style={{width: '100%', height: '100%'}} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 mb-4 mt-4'>
                                {/* Konten Kanan */}
                                {/* Produk */}
                                <div className='mt-md-3 mt-n3 ml-3'>
                                    <h3>{this.state.dataProduct.brand}</h3>
                                    <p className='mt-n2 funniture-font-size-18'>{this.state.dataProduct.nama}</p>
                                </div>
                                <div className='ml-3'>
                                    <h3>
                                        {
                                            this.state.dataProduct.diskon > 0?
                                                `Rp${(this.state.dataProduct.price - ((this.state.dataProduct.price * this.state.dataProduct.diskon)/100)).toLocaleString()}`
                                            :
                                                `Rp${this.state.dataProduct.price.toLocaleString()}`
                                        }
                                    </h3>
                                    <div className='input-group'>
                                        <h5 style={{textDecoration: 'line-through', color: '#6e7c7c'}}>
                                            {
                                                this.state.dataProduct.diskon > 0?
                                                    `Rp${this.state.dataProduct.price.toLocaleString()}`
                                                :
                                                    null
                                            }
                                            
                                        </h5>
                                        {
                                            this.state.dataProduct.diskon > 0?
                                                <span className='input-group-append ml-3 font-weight-bold d-flex justify-content-center text-white rounded' style={{backgroundColor: '#d9534f', width:'80px', height: '25px'}}>
                                                    {this.state.dataProduct.diskon}% OFF!
                                                </span>
                                            :
                                            null
                                        }
                                        
                                    </div>
                                    
                                </div>
                                <hr className = 'ml-3' />
                                {/* stock */}
                                <div className ='ml-3'>
                                    {this.state.dataProduct.stock} Stok tersedia
                                </div>
                                <div className ='ml-3'>
                                    Berat item: {this.state.dataProduct.weight} gram
                                </div>
                                <hr className ='ml-3' />
                                {/* Description */}
                                <div className ='ml-3'>
                                    <h5>Description:</h5>
                                    <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nesciunt, atque nihil mollitia tenetur incidunt repellendus minus deleniti omnis officiis cum nam culpa sequi, veritatis fugiat veniam, quis officia velit.</h6>
                                </div>
                                <div className='mt-4 d-block d-sm-none d-md-none d-lg-none d-xl-block ml-3'>
                                    <input type='button' value='Add To Cart' className ='btn btn-warning'style={{width: '220px'}} onClick={this.addToCart} />
                                    <input type='button' value='Beli Langsung' className ='btn btn-success ml-3' style={{width: '220px'}} />
                                </div>
                                <div className='mt-4 d-none d-sm-block d-md-block d-lg-block d-xl-none ml-3'>
                                    <input type='button' value='Add To Cart' className ='btn btn-warning'style={{width: '155px'}} onClick={this.addToCart} />
                                    <input type='button' value='Beli Langsung' className ='btn btn-success ml-3' style={{width: '155px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
                null
        )
    }
}