import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const menuItems = [
    {
      id: 1,
      name: "Classic Burger",
      price: 8.99,
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "French Fries",
      price: 3.99,
      img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Cheese Pizza",
      price: 11.99,
      img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Creamy Pasta",
      price: 10.49,
      img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Chicken Sandwich",
      price: 7.49,
      img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Soft Drink",
      price: 2.49,
      img: "https://cdn.britannica.com/33/206333-050-598A0208/sodas-plastic-cups-ice-straws.jpg",
    },
  ];

  const slides = [
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.name === product.name);
      if (exists) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const clearCart = () => setCart([]);

  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <header>
        <div className="logo">Feane</div>
        <nav>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Fast Food Restaurant</h1>
          <p>
            Welcome to Feane Restaurant, where fresh ingredients, bold flavors,
            and a warm atmosphere come together
          </p>
          <button className="btn">Order Now</button>
        </div>
      </section>

      <section className="section" id="menu">
        <h2>Our Menu</h2>
        <div className="menu-cart-wrapper">
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div className="menu-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="price">${item.price}</p>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className="cart-box">
            <h3>Shopping Cart</h3>
            <div id="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.name}>
                    <div className="cart-item-top">
                      <span>{item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="cart-item-bottom">
                      <span>
                        Price: ${item.price} | Qty: {item.quantity}
                      </span>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.name)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total">Total: ${totalCost.toFixed(2)}</div>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </section>

      <section className="section" id="gallery">
        <h2>Gallery</h2>
        <div className="gallery-slider">
          <div
            className="slides"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((src, idx) => (
              <img key={idx} src={src} alt={`Food ${idx}`} />
            ))}
          </div>
        </div>
        <div className="slider-buttons">
          <button onClick={prevSlide}>Previous</button>
          <button onClick={nextSlide}>Next</button>
        </div>
      </section>

      <section className="section about" id="about">
        <h2>About Us</h2>
        <p>
          Feane Restaurant began as a small family-owned kitchen with a simple
          goal: to serve food that brings people together.
        </p>
      </section>

      <section className="section" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-grid">
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea rows="6" placeholder="Message" required></textarea>
            <button type="submit" className="btn">
              Send Message
            </button>
          </form>
          <iframe
            title="map"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: "12px" }}
            src="about:blank"
          ></iframe>
        </div>
      </section>

      <footer>
        <p>Follow us on Facebook | Instagram | Twitter</p>
        <p>Business Hours: Monday - Sunday, 10:00 AM - 11:00 PM</p>
      </footer>
    </div>
  );
};

export default App;
