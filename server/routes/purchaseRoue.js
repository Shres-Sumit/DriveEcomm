const e = require('express')
const { createPurchase, getAllPurchase, updateVisitDate, getAllPurchaseVisitDate } = require('../controller/purchaseController')
const { isAdmin, requireSign } = require('../helper/jwt')
const purchaseRouter = e.Router()

purchaseRouter.post('/create-purchase', createPurchase)
purchaseRouter.get('/get-purchase', requireSign, isAdmin, getAllPurchase)
purchaseRouter.put('/update-visit-date', requireSign, isAdmin, updateVisitDate)
purchaseRouter.get('/:userId', requireSign, getAllPurchaseVisitDate)


module.exports = { purchaseRouter }
