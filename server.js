//Install express server
const express = require('express');
const path = require('path');

const app = express();  



// // const express= require('express');
// // var app= new express();
// const bodyParser=require('body-parser');
// const cors=require('cors');
// // const path=require('path');
// const mongoose=require('mongoose');
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended:true
// }));
// app.use(express.static(path.join(__dirname,"/public")));

// // const signupRouter=require('./src/routes/signupRouter')()
// // const loginRouter=require('./src/routes/loginRouter')()
// // const productRouter=require('./src/routes/productRouter')()

// // app.use(__dirname+'/signup',signupRouter);
// // app.use(__dirname+'/login',loginRouter);
// // app.use(__dirname+'/products',productRouter)

// const uri="mongodb+srv://farhana:farhana@cluster0-o93hy.mongodb.net/test?retryWrites=true&w=majority"

// // mongoose.connect("mongodb://localhost:27017/Users");
// mongoose.connect(uri)

// mongoose.set('useFindAndModify', false);
// var db=mongoose.connection;
// db.on('error',(error)=>{
//     console.log(error);
// });
// db.once('open',()=>{
//     console.log("Success");
// })

// console.log(__dirname)
// app.listen(3000, () => {
//     console.log(__dirname)
//   console.log('listening on port 3000!')
// });


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mobitech'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/mobitech/index.html'));
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

