const mongoose = require('mongoose');


const connectDB = async () => {
    try{
      await mongoose.connect('mongodb+srv://Ryadh-Sarrah-GMC:riadhsarrah123@restaurantrs.q72lgsb.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Database connection success');
    }catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;