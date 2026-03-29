import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Heart, ArrowLeft, Star, Shield, Truck, RefreshCw, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, isInCart, items } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div className="not-found-luxe vast-space">
      <h2 className="display-sm">Product not found.</h2>
      <Link to="/shop" className="btn-tertiary">Return to Collection</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    for (let i = 0; i < qty; i++) addToCart(product);
    toast.success('Added to collection', { className: 'hot-toast' });
  };

  const handleBuyNow = () => { handleAddToCart(); navigate('/cart'); };

  return (
    <div className="pd-luxe page-enter">
      <div className="container">
        {/* Editorial Breadcrumb */}
        <div className="breadcrumb-luxe label-md">
          <button onClick={() => navigate(-1)} className="back-link-luxe">
            <ArrowLeft size={14} /> Back
          </button>
          <span>/ {product.category} / {product.name}</span>
        </div>

        <div className="pd-layout-luxe">
          {/* 1. Large Imagery with Tonal Background */}
          <div className="pd-visual-luxe product-image-bg">
            <img src={product.image} alt={product.name} className="pd-main-img" />
            {product.badge && <span className="pd-badge-luxe label-md">{product.badge}</span>}
          </div>

          {/* 2. Focused Info Column */}
          <div className="pd-info-luxe">
            <div className="pd-header-luxe">
              <span className="label-md pd-cat-luxe">{product.category}</span>
              <h1 className="display-lg pd-title-luxe">{product.name}</h1>
              
              <div className="pd-price-row-luxe">
                <span className="pd-price-luxe">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className="pd-price-old-luxe">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <div className="pd-description-luxe body-md">
              <p>{product.description}</p>
            </div>

            {/* Tags - Minimal */}
            <div className="pd-tags-luxe">
              {product.tags.map(t => <span key={t} className="pd-tag-luxe label-md">{t}</span>)}
            </div>

            {/* Selection & Actions */}
            <div className="pd-controls-luxe">
              <div className="pd-qty-wrap-luxe">
                <span className="label-md">Quantity</span>
                <div className="qty-picker-luxe">
                  <button onClick={() => setQty(v => Math.max(1, v - 1))} disabled={qty <= 1}><Minus size={14} /></button>
                  <span className="qty-val">{qty}</span>
                  <button onClick={() => setQty(v => v + 1)}><Plus size={14} /></button>
                </div>
              </div>

              <div className="pd-action-grid-luxe">
                <button className="btn btn-primary pd-btn-luxe" onClick={handleAddToCart} disabled={!product.inStock}>
                  {inCart ? 'ADD MORE' : 'ADD TO CARt'}
                </button>
                <button className="btn btn-secondary pd-btn-luxe" onClick={handleBuyNow} disabled={!product.inStock}>
                  BUY NOW
                </button>
                <button className={`pd-wishlist-luxe ${wishlisted ? 'active' : ''}`} onClick={() => toggle(product)}>
                  <Heart size={20} strokeWidth={1} fill={wishlisted ? 'var(--error)' : 'none'} />
                </button>
              </div>
            </div>

            {/* Editorial Assurances */}
            <div className="pd-perks-luxe">
              <div className="perk-item-luxe">
                <Truck size={16} strokeWidth={1} />
                <span className="label-md">FREE SHIPPING</span>
              </div>
              <div className="perk-item-luxe">
                <Shield size={16} strokeWidth={1} />
                <span className="label-md">AUTHENTICITY GUARANTEED</span>
              </div>
              <div className="perk-item-luxe">
                <RefreshCw size={16} strokeWidth={1} />
                <span className="label-md">CURATED RETURNS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Artifacts - Asymmetric Grid */}
        {related.length > 0 && (
          <section className="pd-related-luxe vast-space">
            <h2 className="display-sm">Similar Artifacts</h2>
            <div className="related-grid-luxe">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
