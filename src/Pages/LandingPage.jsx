import axios from 'axios';
import React from 'react';
import Slider from "react-slick";
import LinkAPIProducts from './../Supports/Constants/LinkAPIProducts'
import {Link} from 'react-router-dom'
export default class LandingPage extends React.Component{

    state = {
        dataProduct: null
    }

    componentDidMount(){
        this.onGetData()
    }

    onGetData = () =>{
        let sortProduct
        axios.get(LinkAPIProducts)
        .then((res) => {
            // console.log(res.data)
            this.setState({dataProduct: res.data})
            sortProduct = this.state.dataProduct.sort((a , b) => {
                return a.price - b.price
            })
            this.setState({dataProduct: sortProduct})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    mapImage = () => {
         if(this.state.dataProduct){
            return this.state.dataProduct.map((value, index) => {
                if(index < 10){
                    return(
     
                     <div key={index} className='mb-5' style={{width: '18rem'}}>
                         <div className = 'card mx-3' style={{height: '410px'}}>
                             <Link to = {`/productpage/${value.id}`}>
                                <img className="card-img-top" src={value.image1} alt="foto" style={{height:'200px'}} />
                             </Link>
                             <div className="card-body">
                                <h5 className="card-title">{value.brand}</h5>
                                <p className="card-text mt-n3">{value.nama}</p>
                                 <p className="card-text font-weight-bold">Rp{(value.price - ((value.price * value.diskon)/100)).toLocaleString()}</p>
                                 <p className="card-text mt-n4" style={{textDecoration: 'line-through'}}> Rp{value.price.toLocaleString()}</p>
                                 <div className="card-text font-weight-bold mt-n3 text-white d-flex justify-content-center" style={{backgroundColor: '#d9534f', width:'80px'}}>
                                     {value.diskon}% OFF!
                                 </div>
                                 <div className="card-text">{value.stock} stok tersisa</div>
                             </div>
                         </div>
                     </div>        
                    ) 
                }
            })
                    
                
        }
    }

    render() {
        const settingsDesktop = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
          };

        const settingsMedium = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
        };

        const settingsMobile = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2
        };
        return (
            
                <div>
                        {/* JUMBOTRON */}
                        <div className='d-flex align-items-center jumbotron-landing-page'>
                            <div className="container text-center text-md-left">
                                <h1 className='funniture-font-size-70'>
                                    Sale Up To 30%
                                </h1>
                                <input type='button' className='btn btn-warning' value='Shop Now!' />
                            </div>
                        </div>
                        <div>
                            <div className='container'>
                                <div className = 'mt-5 text-center'>
                                    <h1>Flash Sale</h1>
                                </div>
                                <div className='d-flex justify-content-center mt-n4'>
                                    <div className = 'papilio-garis'>

                                    </div>
                                </div>
            
                                {/* flash sale desktop */}
                                <div className='mb-5 d-none d-sm-none d-md-none d-lg-block d-xl-block'>
                                    <Slider {...settingsDesktop}>
                                    {
                                        this.state.dataProduct?

                                            this.mapImage()
                                        :
                                        
                                        <div className='container d-flex justify-content-center'>
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                    </Slider>
                                </div>
                                {/* flash sale mobile */}
                                <div className='mb-5 d-block d-sm-block d-md-none'>
                                    <Slider {...settingsMobile}>
                                    {
                                        this.state.dataProduct?

                                            this.mapImage()
                                        :
                                        
                                        <div className='container d-flex justify-content-center'>
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                    </Slider>
                                </div>
                                {/* flash sale medium */}
                                <div className='mb-5 d-none d-sm-none d-md-block d-lg-none d-xl-none'>
                                    <Slider {...settingsMedium}>
                                    {
                                        this.state.dataProduct?

                                            this.mapImage()
                                        :
                                        
                                        <div className='container d-flex justify-content-center'>
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                </div>
                 /* <div style={{width: '100%'}} className = 'container'>
                    <Slider {...settings} className='mb-5'>
                    {
                        this.mapImage()

                    }
                    </Slider>
                </div> */
           
        );
    }
    }