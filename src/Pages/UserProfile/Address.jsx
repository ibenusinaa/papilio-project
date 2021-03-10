import React from 'react'

export default class Address extends React.Component{
    render(){
        return(
           <>
                
                    <div className="container">
                        <div className='d-flex'>
                            <div className='bg-white mt-1 col-12 rounded'>
                                <div className='mt-2 ml-3'>
                                    <h3>Address</h3>
                                </div>
                                <hr />
                                <div className='col-12'>
                                    <p className='mt-4'>Please enter your delivery address below:</p>
                                    <h6 className='mt-n2'>Full Name</h6>
                                    <input type='text' placeholder='Enter your full name' className='w-50 form form-control' />
                                    <h6 className='mt-4'>Phone Number</h6>
                                    <input type='text' placeholder='Enter your phone number' className='w-50 form form-control'/>
                                    <h6 className='mt-4'>Address</h6>
                                    <textarea rows='4' cols='50' placeholder='Province, City, Postal Code, Street name, house number etc' className ='rounded'></textarea>
                                </div>
                                <div className='d-flex justify-content-center my-5'>
                                    <input type='button' className='btn btn-success w-50' value='Save' />
                                </div>
                            </div>
                        </div>
                    </div>
               

           </>
        )
    }
}