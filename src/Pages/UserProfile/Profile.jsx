import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone} from '@fortawesome/free-solid-svg-icons';

export default class Profile extends React.Component{
    render(){
        return(
                <div className="container">
                    <div className="d-flex">
                        <div className='bg-white rounded col-12 rounded mt-1 mb-5'>
                            <div className='mt-2 ml-3'>
                                <h3>
                                    My Profile
                                </h3>
                            </div>
                            <hr />
                            <div className='mt-5 ml-3'>
                                <h5>Basic Information</h5>
                            </div>
                            <div className='row mt-4 ml-3'>
                                <div className= 'col-3'>
                                    <img src='https://www.jakartanotebook.com/images/new/sample-profile.png' />
                                </div>
                                <div className= 'col-9'>
                                    <div>
                                       <h5> Ibenusina </h5>
                                    </div>
                                    <div>
                                        <span>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </span>
                                        <span className ='ml-3'>
                                            ibenu.sina@gmail.com
                                        </span>
                                        
                                    </div>
                                    <div>
                                        <span>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        <span className='ml-3'>
                                            08111195818
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        </span>
                                        <span className='ml-3'>
                                            Bogor, Jawa Barat
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='mt-3 ml-3'>
                                <h5>Security</h5>

                                <div className = 'row'>
                                    <div className='col-2'>
                                        Password
                                    </div>
                                    <div className='col-2'>
                                        *******
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                       
                    </div>
                </div>

        )
    }
}