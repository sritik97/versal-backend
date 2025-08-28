const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 5000
const path = require('path')
const mongoose = require("mongoose")
const mongoURI = 'mongodb+srv://ritiksingh9708:rfcvgtbh@cluster0.oqp87cm.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const connectDb = async () => {
await mongoose.connect(mongoURI,{useNewUrlParser:true}, async(err,result) =>{
  if (err) {
    console.log("...",err)
  }else{
    console.log("conected")
      const fatch_Data = await mongoose.connection.db.collection("food-item");
      fatch_Data.find({}).toArray( async function (err , data) {
        const foodCatogery= await mongoose.connection.db.collection("foodCategory");
        foodCatogery.find({}).toArray( async function (err , catdata) {
         if (err){ 
       console.log(err);
      } else{
       global.food_item = data;
       global.foodCatogery = catdata;
      } 
    })
  })

  

// const fetched_data=mongoose.connection.db.collection("BeingFoody_items");
//     const data = await fetched_data.find({}).toArray();
//     global.BeingFoody_items = data;

}}
)}
connectDb()
  


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/{*any}',function(req,res){
  res.sendFile(path.join(__dirname, '/mern-app/build/index.html'))
})
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(express.json())
// static file access
app.use(express.static(path.join(__dirname, '/mern-app/build')))
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

