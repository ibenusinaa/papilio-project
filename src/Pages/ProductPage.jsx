import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import LinkAPI from './../Supports/Constants/LinkAPI'

// Action Redux
import { getDataCart } from './../redux/Actions/CartAction' 

class ProductPage extends React.Component{

    state = {
        dataProduct: null,
        mainImage: null,
        showModal: false,
    }

    componentDidMount(){
        let idProduct = this.props.location.pathname.split('/')[2]
        // console.log(idProduct) buat ngecek urlnya, nanti kita split buat ambil idnya nanti biar tau barang yang mana
        axios.get(`http://localhost:2000/products/${idProduct}`)
        .then((res) => {
            this.setState({dataProduct: res.data})
            this.setState({mainImage: res.data.image1})
            
        })
        .catch((err)=>{
            
        })
        
        if(!this.state.ref) return;
    }
    
    addToCart = () => {
    //     let idProduct = this.props.location.pathname.split('/')[2]
    //     let idUser = localStorage.getItem('id')
    //     console.log(idProduct)
    //     console.log(idUser)
    //     // idUSer buat nyari tau user mana yang pesen item tersebut
    //     let dataToSend = {
    //         idProduct: idProduct,
    //         idUser: idUser,
    //         quantity: 1
    //     }
    //     // cek dulu pakai get
    //     axios.get(`http://localhost:2000/carts?idProduct=${idProduct}`)
    //     .then((res) => {
    //         if(res.data.length === 0){ //kalau ga ada post     
    //             axios.post('http://localhost:2000/carts/', dataToSend)
    //             .then((res)=> {
    //                 window.location =`http://localhost:3000/productpage/${idProduct}`
    //             })
    //             .catch((err) => {

    //             })
    //         }else{ // kalau ada kita patch ajaa
    //             let qtyOnDb = res.data[0].quantity //buat nyari tau qty item yang di db ada berapa
    //             let idProdOnDb = res.data[0].id //buat nyari tau dia id nomer berapa di db carts
    //             axios.patch(`http://localhost:2000/carts/${idProdOnDb}`, {quantity: qtyOnDb + 1 }) //cara patch harus ada idnya
    //             .then((res)=>{
    //                 window.location =`http://localhost:3000/productpage/${idProduct}`
    //             })
    //             .catch((err)=>{

    //             })
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })

            let idProduct = this.props.location.pathname.split('/')[2]
            let idUser = localStorage.getItem('id')
            let quantity = 1
            if(idUser === null){
                this.setState({showModal: true})
            }else{
                this.props.getDataCart(idProduct, idUser, quantity)
            }
    }

    onLogin = () => {
        let inputUsername = this.refs.loginUsername.value
        let inputPassword = this.refs.loginPassword.value

        if(inputUsername === '' || inputPassword === ''){
            this.setState({error: 'Username/Password belum diisi'})
        }else{
            axios.get(LinkAPI + '?username=' + inputUsername + '&password=' + inputPassword)
            .then((res) => {
                if(res.data.length === 1){
                    console.log(res.data)
                    localStorage.setItem('id', res.data[0].id)
                    this.setState({showModal: false})
                    window.location = this.props.location.pathname
                }else{
                    this.setState({error: 'Username atau Password salah'})
                }
            })
            .catch((err) =>{
                console.log(err)
            })
        }
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
                                    <img src= {this.state.mainImage} alt='' style={{width: '80%', height: '300px'}} />
                                </div>
                                <div className='d-flex col-12 mt-3' style={{height:'200px'}}>
                                    <div className='col-4 ml-n2 mr-2 funniture-cursor-image' style={{height:'130px'}}>
                                        <img src= {this.state.dataProduct.image1} alt='' className={this.state.mainImage === this.state.dataProduct.image1? 'border border-warning' : ''} style={{width: '100%', height: '100%'}} onClick ={() => this.setState({mainImage: this.state.dataProduct.image1})} />
                                    </div>
                                    <div className='col-4 mx-2 funniture-cursor-image' style={{height:'130px'}}>
                                        <img src= {this.state.dataProduct.image2} className={this.state.mainImage === this.state.dataProduct.image2? 'border border-warning' : ''} alt ='' style={{width: '100%', height: '100%'}} onClick ={() => this.setState({mainImage: this.state.dataProduct.image2})} />
                                    </div>
                                    <div className='col-4 mx-2 funniture-cursor-image' style={{height:'130px'}}>
                                        <img src= {this.state.dataProduct.image3} className={this.state.mainImage === this.state.dataProduct.image3? 'border border-warning' : ''} alt='' style={{width: '100%', height: '100%'}} onClick ={() => this.setState({mainImage: this.state.dataProduct.image3})} />
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


                    {/* MODAL */}
                    <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalHeader className='d-flex justify-content-center'>Login</ModalHeader>
                        <ModalBody>
                            <div>
                                <h6>username</h6>
                                <input type='text' ref='loginUsername' placeholder='Masukan username' className='form form-control' />
                            </div>
                            <div className='mt-2'>
                                <h6>password</h6>
                                <input 
                                    type={this.state.showPassword? 'text' : 'password'} ref='loginPassword' placeholder='Masukan password' className='form form-control'  />                            
                                <div className ='d-flex justify-content-end'>
                                    <button 
                                        className='btn shadow-none mt-n3' 
                                        onClick={() => this.setState({showPassword: !this.state.showPassword})} 
                                        style={{position: 'relative', bottom:'25px'}}>
                                        <FontAwesomeIcon icon={this.state.showPassword? faEyeSlash : faEye}  /> 
                                    </button>
                                </div>
                                <p className='text-danger mt-n3'>
                                    {
                                        this.state.error?
                                            this.state.error
                                        :
                                            null
                                    }
                                </p>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <input type='button' value='Login' className='btn btn-success mt-3' onClick={this.onLogin} />
                            </div>
                        </ModalBody>
                    <ModalFooter>
                            ©Papilio 2021
                    </ModalFooter>
                </Modal>
                </div>
                
            :
                null

            
        )
    }
}

const mapDispatchToProps = {getDataCart}

export default connect('', mapDispatchToProps)(ProductPage)