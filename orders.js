const express = require('express');
const router =express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersControllers =require('../controllers/orders');
router.get("/",OrdersControllers.orders_get_all);
router.post("/",OrdersControllers.orders_create_order);
router.get("/:orderId",OrdersControllers.orders_get_order);
router.delete("/:orderId",OrdersControllers.orders_delete_order);
 module.exports=router;