import React from 'react'
import axios from 'axios'
import swal from 'sweetalert';

export default class CartPage extends React.Component{

    state = {
        dataProducts: null,
        dataCarts: null,
        totalItem: 0,
        totalPrice: 0
    }

    componentDidMount(){
        this.getDataCarts()
    }

    getDataCarts = () =>{
        let id = localStorage.getItem('id')

        axios.get(`http://localhost:2000/carts?idUser=${id}`)
        .then((res)=>{
            let linkURL = ''
            res.data.forEach((value, index)=>{
                linkURL += `id=${value.idProduct}&`
            })
            
            res.data.sort((a,b) => {
                return a.idProduct - b.idProduct
            })

            this.setState({dataCarts: res.data})
            console.log(this.state.dataCarts)

            axios.get(`http://localhost:2000/products?${linkURL}`)
            .then((res) =>{
                this.setState({dataProducts: res.data})
                console.log(this.state.dataProducts)
                this.getOrderSummary()
            })
            .catch((err) => {
                console.log(err)
            })
        

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    getOrderSummary = () =>{
        let totalItem = 0
        let totalPrice = 0

        this.state.dataCarts.forEach((value, index) => {
            totalItem += value.quantity
            if(this.state.dataProducts[index].diskon === 0){
                totalPrice += (this.state.dataProducts[index].price * value.quantity)
            }else{
                totalPrice += (this.state.dataProducts[index].price - ((this.state.dataProducts[index].price * this.state.dataProducts[index].diskon)/100))
            }
        })
        this.setState({totalItem: totalItem, totalPrice: totalPrice})
    }

    updateQuantityProduct = (button, idCart, quantity) =>{
        let quantitySebelumnya = quantity
        let quantityTerbaru = 0

        if(button === 'Plus'){
            quantityTerbaru = quantitySebelumnya + 1
        }else{
            quantityTerbaru = quantitySebelumnya - 1
        }

        // lanjut diupdate pake patch, ingat kalau patch dan delete butuh idProductnya
        axios.patch(`http://localhost:2000/carts/${idCart}`, {quantity: quantityTerbaru})
        .then((res)=>{
            console.log(res)
            if(res.status === 200){
                this.getDataCarts()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    deleteProduct = (idCart) => {
        swal({
            title: "Are you sure want to delete this product?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if(willDelete){
                axios.delete(`http://localhost:2000/carts/${idCart}`)
                .then((res) => {
                    swal({
                        title: "Product delete succesfull!",
                        icon: "success",
                        button: "Ok",
                    });

                    this.getDataCarts()
                    window.location='http://localhost:3000/cartpage'
                    
                })
                .catch((err) => {
                    swal({
                        title: {err},
                        icon: "cancel",
                        button: "Ok",
                    });
                })
            } else {
              
            }
          });
    }

    createTransaction = () =>{
        // 1. push ke db array transaction
        // get id user dulu
        let idUser = localStorage.getItem('id')

        // get date
        let date = new Date() //buat nyari tanggal
        date = date.toString()

        let newDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-'  + date.split(' ')[3] + '-' + date.split(' ')[4]
        //split pertama ambil tanggal, split kedua ambil bulan, split ketiga ambil tahu, split ke empat ambil jam

        // get total price dari state, karena sudah disetstate ketika di function order summary
        let totalPrice = this.state.totalPrice

        // get detail items, mapping state dataCarts
        let detailItems = this.state.dataCarts.map((value, index)=> {
            return{
                productName: this.state.dataProducts[index].nama,
                productBrand: this.state.dataProducts[index].brand,
                productPrice: this.state.dataProducts[index].price,
                productDiscount: this.state.dataProducts[index].diskon,
                productQuantity: value.quantity,
                productImage: this.state.dataProducts[index].image1
            }
        })

        const dataToSend = {
            idUser: idUser,
            status: "unpaid",
            createdAt: newDate,
            total: totalPrice,
            detail: detailItems
        }

        axios.post('http://localhost:2000/transactions', dataToSend)
        .then((res) => {
            // setelah ngepost, lanjut kita update stocknya, stok awal dikurangi stok yang dibel
            let idTransaction = res.data.id //ini buat redirect kalo udah pencet checkout

            // update stok, butuh stok awal sama quantity yang dibeli
            this.state.dataCarts.forEach((value, index) => {
                let stokSebelumnya = this.state.dataProducts[index].stock
                let stokTerbaru = stokSebelumnya - value.quantity

                axios.patch(`http://localhost:2000/products/${value.idProduct}`, {stock: stokTerbaru})
                .then((res) =>{
                    // udah berhasil update stock hapus carts
                    axios.delete(`http://localhost:2000/carts/${value.id}`)
                    .then((res) =>{
                        window.location = '/payment/' + idTransaction
                    })
                    .catch((err) =>{
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            })  
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // showProduct = () =>{
    //     console.log('masuk')
    //     if(this.state.dataCarts !== null || this.state.dataProducts !== null){
    //         this.state.dataCarts.map((value, index)=>{
    //             return(
    //                 <div key={index} className='row my-2'>
    //                     <div className ='col-4 '>
    //                         <img src={this.state.dataProducts[index].image1} className='ml-3' style={{height:'100%', width:'100%'}} />
    //                     </div>
    //                     <div className ='col-8'>
    //                         <div className='ml-3'>
    //                             <h4>{this.state.dataProducts[index].brand}</h4>
    //                             <h6 className='mt-n2'>{this.state.dataProducts[index].nama}</h6>
    //                             <p>Jumlah item: 1</p>
    //                             <h5>Rp{this.state.dataProducts[index].price.toLocaleString()}</h5>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //         })
    //     }

    // }

    render(){
        if(this.state.dataCarts === null || this.state.dataProducts === null){
            return(
                null
            )
        }
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
                                    {
                                        this.state.dataCarts.map((value, index)=>{
                                            return(
                                                <div key={index} className='row my-2'>
                                                    <div className ='col-4 '>
                                                        <img src={this.state.dataProducts[index].image1} className='ml-3' style={{height:'100%', width:'100%'}} />
                                                    </div>
                                                    <div className ='col-8'>
                                                        <div className='ml-3'>
                                                            <h4>{this.state.dataProducts[index].brand}</h4>
                                                            <h6 className='mt-n2'>{this.state.dataProducts[index].nama}</h6>
                                                
                                                            <h5>{
                                                                    this.state.dataProducts[index].diskon === 0?
                                                                        `Rp${this.state.dataProducts[index].price.toLocaleString()}`
                                                                    :
                                                                        `Rp${(this.state.dataProducts[index].price - ((this.state.dataProducts[index].price * this.state.dataProducts[index].diskon)/100)).toLocaleString()}`
                                                                
                                                                }
                                                            </h5>
                                                        </div>
                                                        <div className='ml-3 d-flex align-items-center'>
                                                        Jumlah item: 
                                                        
                                                        <button disabled={value.quantity === 1? true : false} className='btn btn-warning ml-2 d-flex align-items-center' style={{height: '25px'}} onClick={() => this.updateQuantityProduct('Minus', value.id, value.quantity)}>
                                                            -
                                                        </button> 
                                                        
                                                        <span className='mx-3'>
                                                                {value.quantity}
                                                        </span>
                                                        <button disabled={value.quantity === this.state.dataProducts[index].stock? true : false} className='btn btn-warning d-flex align-items-center' style={{height: '25px'}} onClick={() => this.updateQuantityProduct('Plus', value.id, value.quantity)}>
                                                                +
                                                        </button>
                                                        </div>
                                                        <div className='mt-3 ml-3'>
                                                            <button className='btn btn-danger' onClick={() => this.deleteProduct(value.id)}>
                                                                Delete
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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
                                                    {this.state.totalItem}
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
                                                <h5>Rp{this.state.totalPrice.toLocaleString()}</h5>
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
                                            {/* <Link to ='/payment'> */}
                                                <input type='button' value='Checkout' className ='btn btn-warning' onClick={this.createTransaction} />
                                            {/* </Link> */}
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