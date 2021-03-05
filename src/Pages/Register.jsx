import React from 'react';
import Axios from 'axios';
import LinkAPI from '../Supports/Constants/LinkAPI';
import PhoneNumberValidator from './../Supports/Functions/phoneNumber'
import EmailValidator from './../Supports/Functions/emailValidator'


export default class Register extends React.Component{

    state = {
        error: null,
        phoneNumber:  null,
        email: null
    }

    submitRegister = () => {
        let inputUser = this.refs.inputUser.value
        // masuk pakai nomor hp
        if(inputUser[0] >= 0){
            let resultPhoneValidator = PhoneNumberValidator(inputUser)
            console.log(resultPhoneValidator)

            if(resultPhoneValidator !== true){
                this.setState({error: resultPhoneValidator})
            }else{
                this.setState({error:null, phoneNumber: inputUser})
            }
        }else{
            // masuk pakai email
            let resultEmailValidator = EmailValidator(inputUser)
            console.log(resultEmailValidator)

            if(resultEmailValidator !== true){
                this.setState({error: 'Email Tidak Sesuai'})
            }else{
                this.setState({error:null, email: inputUser})
            }
        }
        if(inputUser === ''){
            this.setState({error:null})
        }

    }

    sendDataToAPI = () =>{
        // Apabila daftar memakai phone number
        if(this.state.phoneNumber !== null){
            Axios.get(LinkAPI + '?phone=' + this.state.phoneNumber)
            .then((res) => {
                if(res.data.length === 1){
                    this.setState({error: 'Nomor Sudah Terdaftar'})
                }else{
                    Axios.post(LinkAPI, {phone: this.state.phoneNumber, email: '', username: '', password: '', role: 'user'})
                    .then((res) => {
                        console.log(res.data.id)
                        window.location = `/register-password/${res.data.id}`
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else if(this.state.email !== null){
            // kalo email ada
            Axios.get(LinkAPI + '?email=' + this.state.email)
            .then((res) => {
                if(res.data.length === 1){
                    this.setState({error: 'Email Sudah Terdaftar'})
                }else{
                    Axios.post(LinkAPI, {phone: '', email: this.state.email, username: '', password: '', role: 'user'})
                    .then((res) => {
                        console.log(res.data.id)
                        window.location = `/register-password/${res.data.id}`
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }


    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div class="card my-5" style={{width:'500px'}}>
                        <div class="card-body">
                            <h5 class="card-title d-flex justify-content-center mb-4">Register Now</h5>
                            <p class="card-text">Please insert your phone number or email address:</p>
                            <div className ='input-group'>
                                <input type='text' ref='inputUser' placeholder='Enter your phone number / email' className='form form-control mt-n2' onChange={this.submitRegister} />
                                <input type='button' value='Register' className='ml-2 mt-n2 btn btn-success' onClick={this.sendDataToAPI} />
                            </div>
                            <div className='d-flex justify-content-start mt-2 text-danger'>
                                <p>
                                    {
                                        this.state.error?
                                            this.state.error
                                        :
                                            null
                                    }
                                
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

             
            </div>
        )
    }
}