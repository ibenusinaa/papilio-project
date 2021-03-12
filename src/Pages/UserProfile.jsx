import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import TransactionHistory from './UserProfile/TransactionHistory'
import Address from './UserProfile/Address'
import Profile from './UserProfile/Profile'

export default class UserProfile extends React.Component{
    render(){
        return(
            <>
                <BrowserRouter>
                    <div className="container">  
                        <div className='p-5 row border-border-black'>
                            <div className='mx-2'>
                                <Link to ='/userprofile'>
                                    <button className='btn btn-warning'>
                                        Profile
                                    </button>
                                </Link>
                            </div>
                            <div className='mx-2'>
                                <Link to ='/userprofile/transactionhistory'>
                                    <button className='btn btn-warning'>
                                        Transaction History
                                    </button>
                                </Link>
                            </div>
                            <div className='mx-2'>
                                <Link to ='/userprofile/address'>
                                <button className='btn btn-warning'>
                                    Address
                                </button>
                                </Link>
                            </div>
                        </div>
                        <hr className='mt-n4' />
                        <div className='col-12'>
                            <Switch>
                                <Route exact path='/userprofile' component={Profile} />
                                <Route path='/userprofile/transactionhistory' component={TransactionHistory} />
                                <Route path='/userprofile/address' component={Address} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </>
        )
    }
}