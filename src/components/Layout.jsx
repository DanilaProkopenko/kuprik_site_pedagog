import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NavMenu from './NavMenu';
import '../styles/main.css';
import Banner from '../assets/banner.jpg';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main">
        <section className="section">
          <NavMenu />
          <div className="banner-placeholder">
            {/* Баннер */}
            <img src={Banner} alt="Banner" className="banner__source" />
          </div>
        </section>
        <article className="article">
          {children}
        </article>
        <aside className="aside">
          <div className="tag-cloud">
            <h3>Облако тегов</h3>
            <div className="tag-cloud_row">
              <div>#образование</div>
              <div>#педагогика</div>
              <div>#обучение</div>
            </div>
          </div>
          <div className="banner-placeholder">
            {/* Баннер */}
            <img src={Banner} alt="Banner" className="banner__source" />
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;