import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onSearch, onNavigate, currentPage }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate('home');
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-emerald-200 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Logo />
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                PriceWISE
              </h1>
              <p className="text-xs text-emerald-600/70">Smart Shopping</p>
            </div>
          </motion.div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products to compare prices..."
                className="w-full px-6 py-3 bg-emerald-50/50 border border-emerald-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full transition-all shadow-lg hover:shadow-emerald-500/50"
              >
                Search
              </button>
            </div>
          </form>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-emerald-50 rounded-lg transition-colors ml-auto"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-emerald-50/50 border border-emerald-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm"
            >
              Go
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 border-t border-emerald-200 pt-4"
            >
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                  className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => { onNavigate('help'); setMobileMenuOpen(false); }}
                  className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                >
                  Help
                </button>
                <button
                  onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
                  className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                >
                  Contact
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}