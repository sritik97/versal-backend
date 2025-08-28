// const mongoose = require('mongoose');

// const mongoDb = async () => {
//  const fatch_Data = await mongoose.connection.db.collection("food_item");
//  fatch_Data.find({}).toArray(function (err , data) {
//     if (err) console.log(err);
//     else  console.log(data) 
//  })
// }
// module.exports = mongoDb;

 export const Cat = mongoose.model('Cat', { name: String });
