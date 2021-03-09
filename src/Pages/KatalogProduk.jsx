import React from 'react'
import Axios from 'axios'
import LinkAPIProducts from './../Supports/Constants/LinkAPIProducts'
import { Modal, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom'

export default class KatalogProduk extends React.Component{

    state = {
        dataProductBackup: null,
        dataProduct: null,
        showModalFilter: false,
        showModalSort: false,
        catergory: null,
        brand: null
    }

    componentDidMount(){
        this.onGetData()
        this.getCatAndBrand()
    }

    onGetData = () =>{
        Axios.get(LinkAPIProducts)
        .then((res) => {
            // console.log(res.data)
            this.setState({dataProduct: res.data, dataProductBackup: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getCatAndBrand = () =>{
        Axios.get(LinkAPIProducts)
        .then((res) => {
            console.log(res)

            // AMBIL CATEGORY
            let arrCategory = []
            res.data.forEach((value) => {
                if(arrCategory.includes(value.category)){

                }else{
                    arrCategory.push(value.category)
                }
            })
            // console.log(arrCategory)

            // ambil BRAND

            let arrBrand= []
            res.data.forEach((value) => {
                if(arrBrand.includes(value.brand)){

                }else{
                    arrBrand.push(value.brand)
                }
            })
            // console.log(arrBrand)
            this.setState({category: arrCategory, brand: arrBrand})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    filterData = () => {
        let category = this.refs.selectCategory.value
        let brand = this.refs.selectBrand.value

        let produkFilter = this.state.dataProductBackup.filter((value) =>{
            if(category === 'All' && brand === 'All'){
                return this.state.dataProductBackup
            }else if(category === 'All' && brand !== 'All'){
                return value.brand === brand
            }else if(category !== 'All' && brand === 'All'){
                return value.category === category
            }else if(category !== 'All' && brand !== 'All'){
                return value.category === category && value.brand === brand
            }
        })

        this.setState({dataProduct: produkFilter})
        this.setState({showModalFilter: false})
    }

    sortData = () => {
        let sort = this.refs.sortPrice.value
        let sortProduk

        if(sort === 'Low to High'){
            sortProduk = this.state.dataProduct.sort((a,b) => {
                return a.price - b.price
            })
        }else if(sort === 'High to Low'){
            sortProduk = this.state.dataProduct.sort((a,b) => {
                return b.price - a.price
            })
        }else{
            sortProduk = this.state.dataProduct.sort((a,b) => {
                return a.price - b.price
            })
        }
        this.setState({dataProduct: sortProduk})
        this.setState({showModalSort: false})
    }

    mapCategory = () => {
        return this.state.category.map((value, index) => {
            return (
                <option value={value} key={index}>{value}</option>
            )
        })
    }

    mapBrand = () => {
        return this.state.brand.map((value, index) => {
            return(
                <option value={value} key={index}>{value}</option>
            )
        })
    }

    mapImage = () => {
        if(this.state.dataProduct){
           return this.state.dataProduct.map((value, index) => {
               if(value.diskon > 0){
                   return(
                    <>
                        {/* Desktop */}
                        <div key={index} className='col-md-4 col-6 mb-4'>
                            <div className = 'mx-3' style={{height: '410px'}}>
                                <Link to = {`/productpage/${value.id}`}>
                                    <img className="card-img-top" src={value.image1} alt="foto" style={{height:'240px'}} />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{value.brand}</h5>
                                    <p className="card-text mt-n3">{value.nama}</p>
                                    <p className="card-text font-weight-bold mt-n2">Rp{(value.price - ((value.price * value.diskon)/100)).toLocaleString()}</p>
                                    <p className="card-text mt-n4" style={{textDecoration: 'line-through'}}> Rp{value.price.toLocaleString()}</p>
                                    <div className="card-text font-weight-bold mt-n3 rounded text-white d-flex justify-content-center" style={{backgroundColor: '#d9534f', width:'45px', position: 'relative', top: '-310px', left: '-12px'}}>
                                        {value.diskon}%
                                    </div>
                                    <span className="card-text">{value.stock} stok tersisa</span>
                                </div>
                            </div>
                        </div>
                    </>         
                   ) 
               }else{
                   return(
                    <>
                        <div key={index} className='col-md-4 col-6 mb-4'>
                            <div className = ' mx-3' style={{height: '410px'}}>
                                <Link to = {`/productpage/${value.id}`}>
                                    <img className="card-img-top" src={value.image1} alt="foto" style={{height:'240px'}} />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{value.brand}</h5>
                                    <p className="card-text mt-n3">{value.nama}</p>
                                    <p className="card-text"> Rp{value.price.toLocaleString()}</p>
                                    <p className="card-text">{value.stock} stok tersedia</p>
                                </div>
                            </div>
                        </div>
                    </>        
                   )
               }
           })
                   
               
       }
   }

    render(){
        return(
            <div>
                {/* Banner */}
                <div className='d-flex justify-content-center jumbotron-katalog-produk'>

                </div>
                {/* Filter */}
                <div className='container'>
                    <div className = 'row my-5'>
                        <div className ='col-12'>
                            <input type='button' value='Filter' className='btn btn-outline-secondary' style={{width:'70px'}} onClick ={() => this.setState({showModalFilter: true})} />
                            <input type='button' value='Sort' className ='btn btn-outline-secondary ml-3' style={{width:'70px'}} onClick ={() => this.setState({showModalSort: true})} />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className = 'papilio-garis' style={{width: '1130px', background: '#dddddd'}}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className ='container'>
                    <div className ='row'>
                        
                        {
                            this.state.dataProduct?
                                this.mapImage()
                            :
                                null
                        }
           
                    </div>

                </div>

                {/* Modal Filter */}
                <Modal toggle={() => this.setState({showModalFilter: false})} isOpen={this.state.showModalFilter}>
                        <ModalBody className='px-5 py-5'>
                            <div className='text-center'>
                                <h3>
                                    Filter Data
                                </h3>
                            </div>
                            <div className = 'mt-3'>
                                <label for="exampleFormControlSelect1">Category</label>
                                <select class="form-control" ref='selectCategory' id="exampleFormControlSelect1">
                                    <option value='All'>All</option>
                                    {
                                        this.state.category?
                                            this.mapCategory()
                                        :
                                            null
                                    }
                                </select>
                            </div>
                            <div className = 'mt-3'>
                                <label for="exampleFormControlSelect1">Brand</label>
                                <select class="form-control" ref='selectBrand' id="exampleFormControlSelect1">
                                    <option value='All'>All</option>
                                    {
                                        this.state.brand?
                                            this.mapBrand()
                                        :
                                            null
                                    }
                                </select>
                            </div>
                            <input type='button' value='Filter' className='btn btn-warning mt-4 w-100' onClick ={this.filterData} />
                        </ModalBody>
                </Modal>
                <Modal toggle={() => this.setState({showModalSort:false})} isOpen={this.state.showModalSort}>
                    <ModalBody className = 'px-5 py-5'>
                        <div className='text-center'>
                            <h3>Sort</h3>
                        </div>
                        <div className = 'mt-3'>
                            <label for="exampleFormControlSelect1">Sort Price</label>
                            <select class="form-control" ref='sortPrice' id="exampleFormControlSelect1">
                                <option value='Low to High'>Low to High</option>
                                <option value='High to Low'>High to Low</option>
                                <option value='Default'>Default</option>
                            </select>
                        </div>
                        <input type='button' value='Sort' className='btn btn-warning mt-4 w-100' onClick ={this.sortData} />
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}