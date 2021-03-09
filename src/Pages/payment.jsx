import React from 'react'

export default class Payment extends React.Component{
    render(){
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
                                        <h6>Email Address</h6>
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

                            <div className='col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 ' style={{height: '400px'}}>
                                <div className='p-2 bg-white mt-5'>
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
                                    <div className='mt-2'>
                                        <input type='button' value='Bayar' className ='btn btn-outline-dark' />
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