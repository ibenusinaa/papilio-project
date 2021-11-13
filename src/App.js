import React from 'react'
import Navbar from './Components/navbar'
import Footer from './Components/footer'
import Register from './Pages/Register'
import LandingPage from './Pages/LandingPage'
import RegisterPassword from './Pages/RegisterPassword'
import ProductPage from './Pages/ProductPage'
import KatalogProduk from './Pages/KatalogProduk'
import CartPage from './Pages/CartPage'
import Payment from './Pages/payment'
import UserProfile from './Pages/UserProfile'

// css
import './Supports/Stylesheets/Utils.css'
import './Supports/Stylesheets/LandingPage.css'
import './Supports/Stylesheets/KatalogProduk.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import allReducer from './redux/reducers/index'

// ADMIN
import ProductManagement from './Pages/admin/ProductManagement'
import ProductManagementDetail from './Pages/admin/ProductManagementDetail'

const store = createStore(allReducer, applyMiddleware(thunk))

export default class App extends React.Component{
  render(){
    return (
      <> 
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/register' component={Register} />
              <Route path='/register-password' component={RegisterPassword} />
              <Route path='/productpage/:idProduct' component={ProductPage} />
              <Route path='/katalogproduk/' component={KatalogProduk} />
              <Route path='/cartpage' component={CartPage} />
              <Route path='/payment/:idTransaction' component={Payment} />
              <Route path='/userprofile' component={UserProfile} />
              <Route path='/product-management' component={ProductManagement} />
              <Route path='/product-management-detail/:idProduct' component={ProductManagementDetail} />
            </Switch>
            <Footer />       
          </BrowserRouter>
        </Provider> 
      </>
    )
  }
}


