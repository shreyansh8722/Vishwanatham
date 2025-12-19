import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './context/CartContext';
import { LoginModalProvider } from './context/LoginModalContext';
import { ProductProvider } from './context/ProductContext';
import { AppSkeleton } from './components/skeletons/AppSkeleton';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { AnalyticsTracker } from './components/utils/AnalyticsTracker';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// --- COMPONENTS ---
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { NewsletterPopup } from './components/common/NewsletterPopup';
import { CartModal } from './components/shop/CartModal'; 

// --- LAZY LOAD PAGES ---
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AnalyticsTracker />
        <ScrollToTop />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#333', color: '#fff', fontSize: '12px',
              borderRadius: '2px', padding: '12px 24px',
              textTransform: 'uppercase', letterSpacing: '1px',
            },
            success: { iconTheme: { primary: '#B08D55', secondary: '#fff' } }
          }}
        />

        <AuthProvider>
          <LoginModalProvider>
            <CartProvider>
              <ProductProvider>
                <Suspense fallback={<AppSkeleton />}>
                  <NewsletterPopup />
                  <CartModal /> 
                  
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:productId" element={<ProductDetailsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/track-order" element={<TrackOrderPage />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/returns" element={<ReturnPolicy />} />
                    <Route path="/terms" element={<TermsPage />} />
                    
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>

                  <WhatsAppButton />
                </Suspense>
              </ProductProvider>
            </CartProvider>
          </LoginModalProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;