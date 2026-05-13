import Product from '../models/Product.js'

// =========================
// GET ALL PRODUCTS (TENANT BASED)
// =========================
export const getProducts = async (req, res) => {
  try {

    const products = await Product.find({
      tenantId: req.tenantId
    })

    res.json(products)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (req, res) => {
  try {

    const product = await Product.create({
      ...req.body,
      tenantId: req.tenantId
    })

    res.status(201).json(product)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (req, res) => {
  try {

    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        tenantId: req.tenantId
      },
      req.body,
      { new: true }
    )

    res.json(product)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (req, res) => {
  try {

    await Product.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenantId
    })

    res.json({ message: 'Product deleted' })

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}