import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="luxe-app">
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Navbar onSearch={setSearchQuery} />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  <Route path="/order-confirmed" element={<div className="container vast-space text-center"><h1 className="display-lg">Order Received.</h1><p className="body-md">Your artifacts are being prepared for shipment.</p></div>} />
                </Routes>
              </main>
              <Footer />
              <Toaster position="bottom-right" />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
