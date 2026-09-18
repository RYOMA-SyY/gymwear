import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { I18nProvider } from './context/I18nContext';
import { useCartStore } from './context/CartContext';
import Nav from './components/Nav';
import CartDrawer from './components/CartDrawer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Story from './pages/Story';
import Athletes from './pages/Athletes';
import Contact from './pages/Contact';
import './styles/global.css';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <I18nProvider>
      <BrowserRouter>
        <Nav onCartClick={openCart} />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/all" element={<Catalog />} />
            <Route path="/products/:handle" element={<ProductDetail />} />
            <Route path="/story" element={<Story />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <CartDrawer />
      </BrowserRouter>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
    </I18nProvider>
  );
}

export default App;