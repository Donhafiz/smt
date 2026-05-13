import Staff from '../models/Staff.js'

// GET
export const getStaff = async (req, res) => {

  try {

    const staff = await Staff.find({
      tenantId: req.tenantId
    })

    res.json(staff)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}

// CREATE
export const createStaff = async (req, res) => {

  try {

    const staff = await Staff.create({
      ...req.body,
      tenantId: req.tenantId
    })

    res.status(201).json(staff)

  } catch (err) {

    res.status(500).json({
      message: err.message
    })

  }
}

// UPDATE
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findOneAndUpdate(
      {
        _id: req.params.id,
        tenantId: req.tenantId
      },
      req.body,
      { new: true }
    )

    res.json(staff)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.tenantId
    })

    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}