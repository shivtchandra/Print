'use client';

import Image from 'next/image';
import { useCart } from '@/components/providers/CartContext';
import { useConfig } from '@/components/providers/ConfigProvider';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, isDrawerOpen, closeDrawer } = useCart();
  const { businessInfo } = useConfig();

  function buildWhatsAppMessage(): string {
    let msg = '🛒 *Order from Foto Palace Website*\n\n';
    items.forEach((item, i) => {
      const p = item.product;
      msg += `*${i + 1}. ${p.title}*\n`;
      msg += `   Brand: ${p.brand}\n`;
      msg += `   Category: ${p.category}\n`;
      msg += `   Specs: ${p.specs.join(', ')}\n`;
      if (p.features.length > 0) {
        msg += `   Features: ${p.features.join(', ')}\n`;
      }
      msg += `   Price Range: ${p.priceRange}\n`;
      msg += `   Qty: ${item.quantity}\n\n`;
    });
    msg += `📦 Total Items: ${totalItems}\n`;
    msg += `\nPlease share the best price and availability. Thank you!`;
    return encodeURIComponent(msg);
  }

  function handleCheckout() {
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${businessInfo.whatsapp}?text=${message}`;
    window.open(url, '_blank');
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isDrawerOpen ? 'cart-backdrop-visible' : ''}`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isDrawerOpen ? 'cart-drawer-open' : ''}`}>
        <div className="cart-drawer-header">
          <h2>Shopping Cart</h2>
          <span className="cart-drawer-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          <button onClick={closeDrawer} className="cart-drawer-close" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              <p>Your cart is empty</p>
              <button onClick={closeDrawer} className="secondary-btn">Continue Shopping</button>
            </div>
          ) : (
            <ul className="cart-items-list">
              {items.map((item) => {
                const key = item.product.id || item.product.title;
                return (
                  <li key={key} className="cart-item">
                    <div className="cart-item-image">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          width={72}
                          height={72}
                          style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                      )}
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.product.title}</h4>
                      <p className="cart-item-specs">{item.product.specs.slice(0, 2).join(' • ')}</p>
                      <p className="cart-item-price">{item.product.priceRange}</p>
                      <div className="cart-item-controls">
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="cart-qty-value">{item.quantity}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeItem(key)}
                          aria-label="Remove item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <button onClick={clearCart} className="cart-clear-btn">Clear All</button>
            <button onClick={handleCheckout} className="cart-checkout-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
