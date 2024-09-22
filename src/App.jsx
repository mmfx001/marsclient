import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Componitent/Navbar';
import Login from './Componitent/Login';
import LoggedInStudentInfo from './Componitent/grups';
import Display from './Componitent/Display';
import Post from './Componitent/Post';
import { Provider } from 'react-redux';
import ShopPage from './Page/ShopPage';
import ProductPage from './Page/ProductPage';
import PurchasedProducts from './components/PurchasedProduct';
import Calendar from './components/Calendar';
import store from './store';
import Upladeimg from './components/upladeimage';
import ImageGallery from './Componitent/Home';
import Home from './components/Home';
import RatingPage from './components/reating';
import TypeGame from './components/TypeGame';
import QuetionGame from './components/QuetionGame';
import Learning from './Learning';
import Admin from './AdminForcheck';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <Provider store={store}>
      <Router>
        <Navbar setLoggedInUser={setLoggedInUser} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login onLoginSuccess={setLoggedInUser} />} />
          <Route path='/l' element={<LoggedInStudentInfo />} />
          <Route path='/display' element={<Display loggedInUser={loggedInUser} />} />
          <Route path='/post' element={<Post />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/purchased" element={<PurchasedProducts />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/uplade' element={<Upladeimg />} />
          <Route path='/img' element={<ImageGallery />} />
          <Route path='/TypeGame' element={<TypeGame />} />
          <Route path='/QuetionGame' element={<QuetionGame />} />
          <Route path='/learning' element={<Learning />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;
