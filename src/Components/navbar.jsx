import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faHeart, faUser, faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LinkAPI from './../Supports/Constants/LinkAPI'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class Navbar extends React.Component{

    state = {
        username: null,
        error: null,
        showModal: false
    }

    componentDidMount(){
        this.getUsername()
    }

    getUsername = () => {
        // Ambil ID dari local storage
        let id = localStorage.getItem('id')

        if(id){
            axios.get(LinkAPI + `/${id}`) //ngambil di id berapa lewat page
            .then((res) => {
                console.log(res)
                this.setState({username: res.data.username})
            })
            .catch((err) => {
                console.log(err)
            })   
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
                    window.location = '/'
                }else{
                    this.setState({error: 'Username atau Password salah'})
                }
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        //  Kalau mau pakai email/phone
        // let inputLogin = this.refs.inputLogin.value
        // let inputPasswordLogin = this.refs.inputPasswordLogin.value
        // let inputLoginType = ''

        // if(inputLogin[0] >= 0){
        //     inputLoginType = 'phone'
        // }else{
        //     inputLoginType = 'email'
        // }

        // Axios.get(LinkAPI + `?${inputLoginType}=${inputLogin}&password=${inputPasswordLogin}`)
        // .then((res) => {
        //     if(res.data.length === 1){
        //         alert('Login Berhasil')
        //         localStorage.setItem('id', res.data[0].id)
        //         this.setState({showModal: false})
        //         window.location = '/'
        //     }else if(res.data.length !== 1){
        //         alert('User & Password Tidak Ditemukan')
        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
       
    }

    onLogout = () =>{
        let confirm = window.confirm('Anda Yakin Mau Logout?')

        if(confirm){
            localStorage.removeItem('id')
            window.location = '/'
        }
    }
    render(){
        return(
            <>
                {/* navbar putih atas */}
                <div className ='bg-light'>
                    <div className='container'>
                        <div className='row align-items-center' style={{height: '40px'}}>
                            <div className = 'col-6'>
                                <div>
                                    Lokasi Terdekat Dengan Anda
                                </div>
                            </div>
                            <div className= 'col-6 d-flex justify-content-end'>
                                {
                                    this.state.username?
                                        <>
                                            <div>
                                                Hello, {this.state.username}
                                            </div>
                                            <div className ='ml-1 funniture-clickable-element' onClick ={this.onLogout}>
                                                / Logout
                                            </div>
                                        </>
                                    :
                                    <>
                                        <div className='funniture-clickable-element' onClick ={() => this.setState({showModal: true})}>
                                            Login
                                        </div>
                                        <div className= 'ml-3'>
                                            <Link to ='/Register' className ='text-body'>Register</Link>
                                        </div>
                                    </>
                                }
  
                            </div>
                        </div>
                    </div>
                </div>
                {/* navbar kuning */}
                <div className='bg-warning'>
                    <div className='container d-none d-md-block d-sm-none'>
                        <div className='row align-items-center' style={{height: '70px'}}>
                            <div className = 'col-2'>
                                <span><Link to = '/' className ='text-body funniture-font-size-20 funniture-font-bold'>Papilio</Link></span>
                            </div>
                            <div className = 'col-5'>
                                <span className = 'mr-2'><Link to ='/katalogproduk' className = 'text-body'>Produk</Link></span>
                                <span className = 'mx-2'>Ruangan</span>
                                <span className = 'mx-2'>Dekorasi</span>
                                <span className = 'mx-2'>Sale</span>
                            </div>
                            <div className = 'col-5'>
                                <div className='d-flex align-items-center justify-content-end'>
                                    <span>
                                        <input type="text" className="form-control d-none d-md-block" placeholder="cari produk" />
                                    </span>
                                    <span className= 'mr-2'>
                                        <input type='button' value='Search' className='btn btn-light'></input>
                                    </span>
                                    <span className= 'mx-2'>
                                        <FontAwesomeIcon icon={faUser} className ='fa-lg' />
                                    </span>
                                    <span className= 'mx-2'>
                                        <FontAwesomeIcon icon={faHeart} className ='fa-lg' />
                                    </span>
                                    <span className= 'mx-2'>
                                        <FontAwesomeIcon icon={faShoppingBag} className ='fa-lg' />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* mobile version navbar kuning */}
                    <div className='d-md-none d-sm-flex d-flex align-items-center justify-content-between' style={{height: '70px'}}>
                        <div className = 'ml-2'>
                        <span><Link to = '/' className ='text-body funniture-font-size-20 funniture-font-bold'>Papilio</Link></span>
                        </div>
                        <div>
                            <div className='d-flex justify-content-end align-items-center'>
                                <span>
                                    <input type="email" className="form-control d-none d-md-block" placeholder="cari produk" />
                                </span>
                                <span className= 'mx-3 d-md-block d-none'>
                                    <FontAwesomeIcon icon={faUser} className ='fa-lg' />
                                </span>
                                <span className= 'mx-3'>
                                    <FontAwesomeIcon icon={faHeart} className ='fa-lg' />
                                </span>
                                <span className= 'mx-3'>
                                    <FontAwesomeIcon icon={faShoppingBag} className ='fa-lg' />
                                </span>
                                <span className= 'mx-3 d-block d-md-none'>
                                    <FontAwesomeIcon icon={faBars} className ='fa-lg' />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='d-block d-md-none mx-2' style={{height: '50px'}}>
                        <div className ="input-group">
                            <input type="text" placeholder="cari produk" className='form-control'/>
                            <div className = "input-group-append">
                                    <input type="button" value="search" className="btn btn-light" />
                            </div>
                        </div>
                    </div>
                </div>
                
                                {/* MODAL SECTION */}
                <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalHeader className='d-flex justify-content-center'>Login</ModalHeader>
                        <ModalBody>
                            <div>
                                <h6>username</h6>
                                <input type='text' ref='loginUsername' placeholder='Masukan username' className='form form-control' />
                            </div>
                            <div className='mt-2'>
                                <h6>password</h6>
                                <input type='password' ref='loginPassword' placeholder='Masukan password' className='form form-control' />
                                <p className='text-danger mt-1'>
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
            </>
        )
    }
}