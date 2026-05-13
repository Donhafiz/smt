import Service from '../models/Service.js'

// GET
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      tenantId: req.tenantId
    })

    res.json(services)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// CREATE
export const createService = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      tenantId: req.tenantId
    })

    res.status(201).json(service)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
export const updateService = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      {
        _id: req.params.id,
        tenantId: req.tenantId
      },
      req.body,
      { new: true }
    )

    res.json(service)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
export const deleteService = async (req, res) => {
  try {
    await Service.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenantId
    })

    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}