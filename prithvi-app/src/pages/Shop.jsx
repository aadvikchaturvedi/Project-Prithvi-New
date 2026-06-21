import React from 'react'
import './Shop.css'
import notebookImage from '../assets/notebook.jpg'
import bagImage from '../assets/cloth-bag.jpg'
import planterImage from '../assets/plastic-planter.jpg'
import bottleImage from '../assets/water-bottle.jpg'  

const products = [
  {
    id: 1,
    name: 'Recycled Plastic Planter',
    description: 'Eco-friendly planter made from recycled plastic waste.',
    price: 299,
    image: planterImage
  },
  {
    id: 2,
    name: 'Reusable Cloth Bag',
    description: 'Durable cloth bag to reduce single-use plastic.',
    price: 149,
    image: bagImage
  },
  {
    id: 3,
    name: 'Eco Water Bottle',
    description: 'Reusable water bottle made from recycled materials.',
    price: 399,
    image: bottleImage
  },
  {
    id: 4,
    name: 'Recycled Notebook',
    description: 'Notebook made using 100% recycled paper.',
    price: 199,
    image: notebookImage
  }
]

const Shop = () => {
  return (
    <div className="shop-page" data-testid="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1 className="page-title">Eco-Friendly Shop</h1>
          <p className="page-subtitle">
            Sustainable products made from recycled materials and eco-friendly alternatives
          </p>
        </div>

        <div className="products-grid" data-testid="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card card"
              data-testid={`product-card-${product.id}`}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <span className="product-price">₹{product.price}</span>
                  <button
                    className="btn btn-primary buy-btn"
                    data-testid={`buy-button-${product.id}`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="shop-info card">
          <h3>Why Shop With Us?</h3>
          <ul className="info-list">
            <li>✓ All products made from recycled or sustainable materials</li>
            <li>✓ Support local artisans and eco-friendly businesses</li>
            <li>✓ Every purchase contributes to plastic waste reduction</li>
            <li>✓ Quality products with environmental certification</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Shop