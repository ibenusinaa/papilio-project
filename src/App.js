import React from 'react'
import Navbar from './Components/navbar'
import Footer from './Components/footer'
import Register from './Pages/Register'
import LandingPage from './Pages/LandingPage'
import RegisterPassword from './Pages/RegisterPassword'
import ProductPage from './Pages/ProductPage'
import KatalogProduk from './Pages/KatalogProduk'
import CartPage from './Pages/CartPage'
// css
import './Supports/Stylesheets/Utils.css'
import './Supports/Stylesheets/LandingPage.css'
import './Supports/Stylesheets/KatalogProduk.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'



export default class App extends React.Component{
  render(){
    return (
      <>  
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/register' component={Register} />
            <Route path='/register-password' component={RegisterPassword} />
            <Route path='/productpage/:idProduct' component={ProductPage} />
            <Route path='/katalogproduk' component={KatalogProduk} />
            <Route path='/cartpage' component={CartPage} />
          </Switch>
          <Footer />       
        </BrowserRouter>
      </>
    )
  }
}


