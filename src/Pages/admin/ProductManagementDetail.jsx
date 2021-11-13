import axios from 'axios'
import React from 'react'

class ProductManagementDetail extends React.Component{

    state = {
        dataProduct: null,
        mainImage: null
    }

    componentDidMount(){
        this.getDetailProduct()
    }

    getDetailProduct = () => {
        let idProduct = this.props.location.pathname.split('/')[2]

        axios.get(`http://localhost:5000/product/${idProduct}`)
        .then((res) => {
            this.setState({dataProduct: res.data, mainImage: res.data[0].image1})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    render(){
        if(this.state.dataProduct === null){
            return(
                <div className='container'>
                    Loading...
                </div>
            )
        }
        return(
                <div className="container">
                    <div className ='row'>
                        <div className='col-12 col-md-6'>
                            {/* gambar */}
                            <div className='col-12 mt-3 ml-2 d-flex justify-content-center' style={{height:'300px'}}>
                                <img src= {this.state.mainImage} alt='main image' style={{width: '80%', height: '300px'}} />
                            </div>
                            <div className='d-flex col-12 mt-3' style={{height:'200px'}}>
                                <div className='col-4 ml-n2 mr-2' style={{height:'130px'}}>
                                    <img src= {this.state.dataProduct[0].image1} alt='image1' className={this.state.mainImage === this.state.dataProduct[0].image1? 'border border-warning' : ''} style={{width: '100%', height: '100%'}} onClick ={() => this.setState({mainImage: this.state.dataProduct[0].image1})} />
                                </div>
                                <div className='col-4 mx-2' style={{height:'130px'}}>
                                    <img src= {this.state.dataProduct[0].image2} alt='wawawa' className={this.state.mainImage === this.state.dataProduct[0].image2? 'border border-warning' : ''} alt ='' style={{width: '100%', height: '100%'}} onClick ={() => this.setState({mainImage: this.state.dataProduct[0].image2})} />
                                </div>
                                <div className='col-4 mx-2' style={{height:'130px'}}>
                                    <img src= {this.state.dataProduct[0].image3} alt='image3' className={this.state.mainImage === this.state.dataProduct[0].image3? 'border border-warning' : ''} alt='' style={{width: '100%', height: '100%'}} onClick ={() => this.setState({mainImage: this.state.dataProduct[0].image3})} />
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 mb-4 mt-4'>
                            {/* Konten Kanan */}
                            {/* Produk */}
                            <div className='mt-md-3 mt-n3 ml-3'>
                                <h3>{this.state.dataProduct[0].brand}</h3>
                                <p className='mt-n2 funniture-font-size-18'>{this.state.dataProduct[0].nama}</p>
                            </div>
                            <div className='ml-3'>
                                <h3>
                                    {
                                        this.state.dataProduct[0].discount > 0?
                                            `Rp${(this.state.dataProduct[0].price - ((this.state.dataProduct[0].price * this.state.dataProduct[0].discount)/100)).toLocaleString()}`
                                        :
                                            `Rp${this.state.dataProduct[0].price.toLocaleString()}`
                                    }
                                </h3>
                                <div className='input-group'>
                                    <h5 style={{textDecoration: 'line-through', color: '#6e7c7c'}}>
                                        {
                                            this.state.dataProduct[0].discount > 0?
                                                `Rp${this.state.dataProduct[0].price.toLocaleString()}`
                                            :
                                                null
                                        }
                                        
                                    </h5>
                                    {
                                        this.state.dataProduct[0].discount > 0?
                                            <span className='input-group-append ml-3 font-weight-bold d-flex justify-content-center text-white rounded' style={{backgroundColor: '#d9534f', width:'80px', height: '25px'}}>
                                                {this.state.dataProduct[0].discount}% OFF!
                                            </span>
                                        :
                                        null
                                    }
                                    
                                </div>
                                
                            </div>
                            <hr className = 'ml-3' />
                            {/* stock */}
                            <div className ='ml-3'>
                                {this.state.dataProduct[0].stock} Stok tersedia
                            </div>
                            <div className ='ml-3'>
                                Berat item: {this.state.dataProduct[0].weight} gram
                            </div>
                            <hr className ='ml-3' />
                            {/* Description */}
                            <div className ='ml-3'>
                                <h5>Description:</h5>
                                <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio nesciunt, atque nihil mollitia tenetur incidunt repellendus minus deleniti omnis officiis cum nam culpa sequi, veritatis fugiat veniam, quis officia velit.</h6>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default ProductManagementDetail