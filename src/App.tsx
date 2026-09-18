import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HomePage } from './components/HomePage';
import { ProductComparison } from './components/ProductComparison';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { HelpPage } from './components/pages/HelpPage';
import { ContactPage } from './components/pages/ContactPage';
import { UserPolicyPage } from './components/pages/UserPolicyPage';
import { BibliographyPage } from './components/pages/BibliographyPage';
import { AboutPage } from './components/pages/AboutPage';

export type PageType = 
  | 'landing' 
  | 'home' 
  | 'terms' 
  | 'privacy' 
  | 'help' 
  | 'contact' 
  | 'user-policy' 
  | 'bibliography' 
  | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentProducts, setCurrentProducts] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentProducts([]);
    setIsSearching(true);
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/search/${encodeURIComponent(query)}`);
      const data = await response.json();
      setCurrentProducts(data.results || []);
    } catch (error) {
      console.error('Error searching products:', error);
      setCurrentProducts([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <HomePage onGetStarted={() => setCurrentPage('home')} />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'help':
        return <HelpPage />;
      case 'contact':
        return <ContactPage />;
      case 'user-policy':
        return <UserPolicyPage />;
      case 'bibliography':
        return <BibliographyPage />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <>
            <Hero />
            <ProductComparison
              searchQuery={searchQuery}
              products={currentProducts}
              loading={isSearching}
            />
          </>
        );
    }
  };

  const showHeaderFooter = currentPage !== 'landing';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50">
      {showHeaderFooter && (
        <Header
          onSearch={handleSearch}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}

      <main className="min-h-[calc(100vh-200px)]">
        {renderPage()}
      </main>

      {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}