import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components (Imports work with both named and default exports now)
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartModal } from './components/shop/CartModal';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { LoginPromptModal } from './components/LoginPromptModal';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import TrackOrderPage from './pages/TrackOrderPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchPage from './pages/SearchPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsPage from './pages/TermsPage';
import ReturnPolicy from './pages/ReturnPolicy';
import AdminPage from './pages/AdminPage';

// Auth Protection
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-heritage-paper text-heritage-grey font-montserrat">
      <ScrollToTop />
      
      {/* Global Modals */}
      <CartModal />
      <LoginPromptModal />
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      {/* Remove padding-top here if Navbar is handled differently, but generally needed for fixed/sticky nav */}
      <main className="flex-grow"> 
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/faq" element={<FAQPage />} />
          
          <Route path="/rituals" element={<ShopPage />} />
          <Route path="/challenge" element={<ShopPage />} />
          
          {/* Legal Pages */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/returns" element={<ReturnPolicy />} />

          {/* Protected Routes (User) */}
          <Route element={<ProtectedRoute />}>
             <Route path="/profile" element={<ProfilePage />} />
             <Route path="/checkout" element={<CheckoutPage />} />
             <Route path="/order-success" element={<OrderSuccessPage />} />
             <Route path="/favorites" element={<FavoritesPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;