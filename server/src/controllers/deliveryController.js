import Delivery from '../models/deliveryModel.js'

/* CREATE DELIVERY */
export const createDelivery =
  async (req, res) => {

    try {

      const {
        order,
        driver
      } = req.body

      const trackingCode =
        `SMT-${Date.now()}`

      const delivery =
        await Delivery.create({

          order,

          driver,

          trackingCode

        })

      res.status(201).json(
        delivery
      )

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }

  }

/* GET DELIVERY */
export const getDelivery =
  async (req, res) => {

    try {

      const delivery =
        await Delivery.findById(
          req.params.id
        )

        .populate('driver')
        .populate('order')

      res.json(delivery)

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }

  }

/* UPDATE STATUS */
export const updateDeliveryStatus =
  async (req, res) => {

    try {

      const delivery =
        await Delivery.findById(
          req.params.id
        )

      delivery.status =
        req.body.status

      await delivery.save()

      res.json(delivery)

    } catch (err) {

      res.status(500).json({
        message: err.message
      })

    }

  }