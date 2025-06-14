import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AdminProvider } from './contexts/AdminContext';
import Layout from './components/Layout';
import News from './pages/News';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AdminProvider>
          <Layout>
            <Switch>
              <Route exact path="/" component={News} />
              <Route path="/news" component={News} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/products" component={Products} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </Layout>
        </AdminProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;