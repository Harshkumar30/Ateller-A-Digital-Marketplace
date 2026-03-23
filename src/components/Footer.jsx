import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-luxe">
      <div className="container footer-inner-luxe">
        <div className="footer-brand-luxe">
          <Link to="/" className="footer-logo-luxe">
            <span className="logo-text">THE DIGITAL ATELIER</span>
          </Link>
          <p className="body-md footer-tagline-luxe">
            A curated space for the intentional collector. <br />
            Precision in design, poetry in everyday life.
          </p>
          <div className="footer-social-luxe">
            {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
              <a key={i} href="#" className="social-btn-luxe"><Icon size={16} strokeWidth={1.5} /></a>
            ))}
          </div>
        </div>

        <div className="footer-links-luxe">
          <div className="footer-col-luxe">
            <h4 className="label-md">Collection</h4>
            {['Electronics', 'Clothing', 'Footwear', 'Accessories'].map(c => (
              <Link key={c} to="/shop" className="footer-link-luxe">{c}</Link>
            ))}
          </div>
          <div className="footer-col-luxe">
            <h4 className="label-md">Atelier</h4>
            {['Our Story', 'Curated List', 'Shipping', 'Returns'].map(l => (
              <Link key={l} to="#" className="footer-link-luxe">{l}</Link>
            ))}
          </div>
          <div className="footer-col-luxe">
            <h4 className="label-md">Legal</h4>
            {['Privacy', 'Terms', 'Sustainability'].map(l => (
              <Link key={l} to="#" className="footer-link-luxe">{l}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom-luxe">
        <div className="container flex-between">
          <p className="label-md">© 2024 THE DIGITAL ATELIER</p>
          <p className="label-md">VOL. 01 ISSUE 04</p>
        </div>
      </div>
    </footer>
  );
}
