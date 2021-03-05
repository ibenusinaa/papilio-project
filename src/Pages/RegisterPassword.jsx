import React from 'react'
import Axios from 'axios'
import LinkAPI from '../Supports/Constants/LinkAPI'


export default class RegisterPassword extends React.Component{

    state = {
        usernameAvailable: null,
        error: null,
        passwordMatch: null,
        inputUsername: null,
        inputPassword: null
    }

    componentDidMount(){
        console.log(this.props.location.pathname)
        console.log(this.props.location.pathname.split('/')[2])
    }

    componentWillUnmount(){
        let id = this.props.location.pathname.split('/')[2]
        
        Axios.delete(LinkAPI + `/${id}`)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    usernameValidation = (event) => {
        let inputUsername = event.target.value
        console.log(inputUsername)
        Axios.get(LinkAPI + '?username=' + inputUsername)
        .then((res) => {
            // Apabila datanya nggak ada, maka username available
            if(res.data.length === 0){
                this.setState({usernameAvailable: true , error: null, inputUsername: inputUsername})
            }else{
                // apabila datanya ada, maka username telah terpakai
                this.setState({error: 'Username Telah Digunakan'})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    passwordValidation = () => {
        let inputPassword = this.refs.inputPassword.value
        let inputConfirmPassword = this.refs.confirmPassword.value

        if(inputPassword === inputConfirmPassword){
            this.setState({passwordMatch: true, error: null, inputPassword: inputPassword})
        }else{
            this.setState({error: 'Password Tidak Sesuai'})
        }
    }

    submitRegister = () => {
        // Ambil Id dari url address
        let id = this.props.location.pathname.split('/')[2]

        // data yang akan dikirim ke API
        let dataToSend = {
            username: this.state.inputUsername,
            password: this.state.inputPassword
        }

        Axios.patch(LinkAPI + `/${id}`, dataToSend)
        .then((res) => {
            localStorage.setItem('id', res.data.id) // buat nyimpen data id di local storage
            window.location = '/'
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className = 'container'>
                <div>
                <div className='row justify-content-center align-items-center'>
                    <div className="card my-5" style={{width:'500px'}}>
                        <div className="card-body">
                            <h5 className="card-title d-flex justify-content-center mb-4">Register Now</h5>
                            <h6 className="card-title">Insert your username</h6>
                            <div>
                                <input type='text' placeholder='your username' className='form form-control' onChange={this.usernameValidation} />
                            </div>
                            <h6 className="card-title mt-3">Insert your password</h6>
                            <div>
                                <input type='password' ref='inputPassword' placeholder='password' className='form form-control' onChange={this.passwordValidation} />
                            </div>
                            <h6 className="card-title mt-3">Confirm your password</h6>
                            <div>
                                <input type='password' ref='confirmPassword' placeholder='confirm your password' className='form form-control' onChange={this.passwordValidation} />
                            </div>
                            <p className='text-danger mt-1'>
                                    {
                                        this.state.error?
                                            this.state.error
                                        :
                                            null
                                    }
                                </p>
                            <div className='mt-3 d-flex justify-content-end'>
                                <input type='button' value='Submit' className='btn btn-success' onClick = {this.submitRegister} />
                            </div>
                        </div>
                    </div>

                </div>
                </div>
                
            </div>
        )
    }
}