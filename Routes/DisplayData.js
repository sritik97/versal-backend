const express = require('express')
const router = express.Router()



router.post('/foodData', (req,res) => {
    try {
        
        res.send([global.food_item, global.foodCatogery ])
    } catch (error) {
        console.error(error.massage)
        res.send("server error")
    }
})
module.exports = router;