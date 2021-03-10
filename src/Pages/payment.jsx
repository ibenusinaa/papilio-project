import axios from 'axios'
import React from 'react'

export default class Payment extends React.Component{

    state = {
        dataTransaction: null,
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction = () =>{
        let idTransaction = this.props.location.pathname.split('/')[2]

        axios.get(`http://localhost:2000/transactions/${idTransaction}`)
        .then((res)=>{
            this.setState({dataTransaction: res.data})
            console.log(this.state.dataTransaction)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    payment = () => {
        // get id
        let idTransaction = this.props.location.pathname.split('/')[2]

        // getDate buat createAt dia bayar di jam berapa
        let date = new Date()
        date = date.toString()

        let newDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-'  + date.split(' ')[3] + '-' + date.split(' ')[4]

        // diupdate ke transactionnya
        axios.patch(`http://localhost:2000/transactions/${idTransaction}`, {status: 'paid', createdAt: newDate})
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        if(this.state.dataTransaction === null){
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
                            <div className='col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7'>
                                <div className='p-2 bg-white my-5'>
                                    <div className='col-12 mt-3'>
                                        <h3>
                                            Order Details
                                        </h3>
                                        <hr />
                                    </div>
                                    <div className = 'col-12'>
                                        <p>The order confirmation will be sent to your email.</p>
                                        <input type='text' placeholder='Enter your email address' className='w-50 form form-control' />
                                        <p className='mt-4'>Please enter your delivery address below:</p>
                                        <h6 className='mt-n2'>Full Name</h6>
                                        <input type='text' placeholder='Enter your full name' className='w-50 form form-control' />
                                        <h6 className='mt-4'>Phone Number</h6>
                                        <input type='text' placeholder='Enter your phone number' className='w-50 form form-control'/>
                                        <h6 className='mt-4'>Address</h6>
                                        <textarea rows='4' cols='44' placeholder='Province, City, Postal Code, Street name, house number etc' className ='rounded'></textarea>
                                    </div>
                                </div>
                            </div>
                            {/* ROW KANAN */}
                            <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mb-3'>
                                <div className='p-2 bg-white mt-5'>
                                    <div className='col-12 mt-3'>
                                            <h3>
                                                Items Summary
                                            </h3>
                                            <hr/>
                                    </div>
                                    {       
                                            this.state.dataTransaction.detail.map((value, index) => {
                                                return(
                                                    <div key={index} className='row col-12' >
                                                        <div className='col-4'>
                                                            <img src={value.productImage} style={{width:'100%'}} />
                                                        </div>
                                                        <div className='col-8'>
                                                            <p className='font-weight-bold'>{value.productBrand}</p>
                                                            <p className='mt-n3'>{value.productName}</p>
                                                            <p className='mt-n3'>jumlah item: {value.productQuantity}</p>
                                                            <p className='mt-n3'>
                                                                {
                                                                    value.productDiscount > 0?
                                                                        `Rp${(value.productPrice - ((value.productPrice * value.productDiscount)/100)).toLocaleString()}`
                                                                    :
                                                                        `Rp${value.productPrice.toLocaleString()}`
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                )
                                            })
                                        
                                    }
                                    <hr />
                                    <div className='col-12 d-flex justify-content-between'>
                                        <h5>Order Total</h5>
                                        <p>Rp{this.state.dataTransaction.total.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className='p-2 bg-white mt-1'>
                                    <div className='col-12 mt-3'>
                                            <h3>
                                                Payment Method
                                            </h3>
                                            <hr/>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div className='mx-2'>
                                            <button className='btn'>
                                                <img src='https://cdn3.xsolla.com/paymentoptions/paystation/theme_33/60x44/3590.1592809756.png' alt='' />
                                            </button>
                                        </div>
                                        <div className='mx-2'>
                                            <button className='btn'>
                                            <img src='https://cdn3.xsolla.com/paymentoptions/paystation/theme_33/60x44/3547.1589911095.png' alt=''  />
                                            </button>
                                        </div>
                                        <div className='mx-2'>
                                            <button className='btn'>
                                            <img src='https://cdn3.xsolla.com/paymentoptions/paystation/theme_33/60x44/3584.1589347357.png' alt=''  />
                                            </button>
                                        </div>
                                        <div className='mx-2'>
                                            <button className='btn'>
                                            <img src='https://cdn3.xsolla.com/paymentoptions/paystation/theme_33/60x44/24.1587646395.png' alt=''  />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <div className='mt-2 col-12'>
                                        <input type='button' value='Bayar' className ='btn btn-outline-dark w-100' onClick={this.payment} />
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