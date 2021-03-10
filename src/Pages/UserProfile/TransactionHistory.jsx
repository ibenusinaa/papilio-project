import axios from 'axios'
import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class TransactionHistory extends React.Component{

    state = {
        dataTrans: null,
        transDetail: null,
        showModal: false
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction = () =>{
        let id = localStorage.getItem('id')

        if(id){
            axios.get(`http://localhost:2000/transactions?idUser=${id}`)
            .then((res)=>{
                this.setState({dataTrans: res.data})
                console.log(this.state.dataTrans[0].detail)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    render(){
        if(this.state.dataTrans === null){
            return(
                null
            )
        }
        return(
            <>
                <div className="container">
                    <div className = 'd-flex'>
                        <div className='bg-white mt-1 col-12 rounded'>
                            <div className='mt-2'>
                                <h3>Purchase History</h3>
                            </div>
                            <hr />
                            <div className='border border-black rounded my-3 mt-2 mb-5 col-12 bg-light'>
                                {  
                                    this.state.dataTrans.map((value, index) => {
                                        return(
                                            <div key={index} className='border border-black rounded my-3 shadow-sm bg-white'>
                                                <div className='row justify-content-between'>
                                                    <div className='p-3 d-flex'>
                                                        <div className='ml-4 mr-2'>Belanja tanggal:</div> 
                                                        <div className='mx-2'>{value.createdAt}</div>
                                                        {
                                                            value.status === 'paid'?
                                                                <div className='mx-2 bg-success rounded text-white d-flex justify-content-center' style={{width: '60px', height: '25px'}}>Selesai</div>
                                                            :
                                                                <div className='mx-2 bg-danger rounded text-white d-flex justify-content-center' style={{width: '120px', height: '25px'}}>Belum dibayar</div>
                                                        }
                                        
                                                    </div>
                                                    <div className='p-3 mr-4'>
                                                        <button className='btn btn-outline-dark' onClick={() => this.setState({showModal: true})}>
                                                            Detil Transaksi 
                                                        </button>
                                                    </div>
                                                </div>
                                                {
                                            
                                                        this.state.dataTrans[index].detail.map((value, i) => {
                                                            return(
                                                                <div className= 'mt-3'>
                                                                <div className='row'>
                                                                    <div className='col-2'>
                                                                        <img src={value.productImage} style={{width: '100%', height:'100%'}} />
                                                                    </div>
                                                                    <div className='col-8'>
                                                                        <h6>{value.productBrand}</h6>
                                                                        <p className='mt-n2'>{value.productName}</p>
                                                                        <p className='mt-n1'>
                                                                            {
                                                                                value.productDiscount === 0?
                                                                                    `Rp${value.productPrice.toLocaleString()} x ${value.productQuantity} item`
                                                                                :
                                                                                    <div>
                                                                                        <div>
                                                                                            Rp{(value.productPrice - ((value.productPrice * value.productDiscount)/100)).toLocaleString()} x {value.productQuantity} item
                                                                                        </div>
                                                                                        <div>
                                                                                            {value.productDiscount}% OFF from {value.productPrice.toLocaleString()}
                                                                                        </div>
                                                                                    </div>
                                                                                    
                                                                            }
                                                                            
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                            )
                                                        })
                                                    
                                                }                                                         
                                                <hr />
                                                <div className='d-flex justify-content-end mr-3'>
                                                    <div className='mx-5'>
                                                        <p className='font-weight-bold'>Total Belanja</p>
                                                    </div>
                                                    <div>
                                                        <p>Rp{value.total.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>   
                                        )
                                    })          
                                }
                            </div>
                        </div>
                    </div>
                </div>
                


                {/* MODAL */}
                <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalHeader className='d-flex justify-content-center'>Detil transaksi</ModalHeader>
                        <ModalBody>
                        <div>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    Nomor Invoice
                                </div>
                                <div>
                                    INV/20210226/XXI/II/763484228
                                </div>
                            </div>
                            {
                                
                            }
                        </div>
                        </ModalBody>
                    <ModalFooter>
                            ©Papilio 2021
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}