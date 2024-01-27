const Product = require("../models/product")
const Cart = require("../models/cart")
const product = require("../models/product")

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      })
    })
    .catch(err => console.log(err))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      })
    })
    .catch(err => console.log(err))
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      })
    })
    .catch(err => console.log(err))
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}
controllers / Shop.js
cart.ejs
app.js
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  req.user.getCart().then(cart => {
    return cart
      .getProducts({ where: { id: prodId } })
      .then(products => {
        let product
        if (products.length > 0) {
          product = products[0]
        }
      })
      .catch(err => console.log(err))
      .catch(err => console.log(err))
  })
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect("/cart")
  })
}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders"
  })
}

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  })
}
