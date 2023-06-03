const express=require('express');
const port=8000;
const views=require('path');
const bodyParser=require('body-parser');

const { title } = require('process');
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const { findByIdAndDelete } = require('./models/contact');
const app=express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assests'));
//middleware 1
// app.use(function(req,res,next){
//     console.log('middleware1');

//     //settuping up new key value pair to request
//     req.myName='Yash';

//     //giving command to middleware to go to next middleware
//     next();
// });

//middleware 2

// app.use(function(req,res,next){
//    console.log('middleware2');

//    //giving command to middleware to go to next middleware
//    next();
// });

// var contactlist=[
//    {
//       name:'Yash Kumar',
//       number:'99910331234'
//    }, 
//    {
//       name:'Yash Kumar',
//       number:'3223323223'
//    },
//    {
//       name:'Yash Kumar',
//       number:'3434355335'
//    }

// ]

app.get('/',function(req,res)
{
   // console.log(__dirname);
   // res.send('<p>hello</p>');
   // console.log('from get',req.myName);
   // return res.render('home',{
   //    title:'My Contact List',
   //    contact_list:contactlist,
      Contact.find({},function(err,contacts){
         if(err)
         {
            console.log('error',err);
            return;
         }
         return res.render('home',{
               title:'My Contact List',
               contact_list:contacts,
         });
   
      });
   
});
app.set('view engine','ejs');

// app.set('views',path.join(__dirname,'views'));


app.get('/practice',function(req,res){
   
   //  res.send('<p>Honey</p>');
   return res.render('practice',{title:'Practice'});
 });

 //by params

//  app.get('/delete-contact/:number',function(req,res){
//      console.log(req.params);

//  });

 //by query

 app.get('/delete-contact/',function(req,res){
   // console.log(req.query);

   //getting query from the url
   // let number=req.query.number;

   // let contactindex = contactlist.findIndex(contact => contact.number == number)
   // if(contactindex!=-1)
   // {
   //    contactlist.splice(contactindex,1);
   // }

   //returning back to webpage from where it came

   // return res.redirect('back');


   //retrive id from url
   let id=req.query.id;
   //find and delete data from db using id
   Contact.findByIdAndDelete(id,function(err)
   {
        if(err)
        {
         console.log('error',err);
         return;
        }
        return res.redirect('back');
   });

});

 app.post('/create-contact',function(req,res){
   //   return res.redirect('/practice');
   // console.log(req.body);
   // console.log(req.body.name);
   // console.log(req.body.number);


   // contactlist.push({
   //      name:req.body.name,
   //      number:req.body.number,
   // });
   // return res.redirect('/')

   //contactlist.push(req.body);
   //return res.redirect('back');
   Contact.create({
      name:req.body.name,
      number:req.body.number
   },function(err,newContact){
      if(err)
      {
         console.log('error',err);
         return;
      }
      console.log('****',newContact);
      res.redirect('back');

   });
 });
app.listen(port,function(error)
{
   if(error)
   {
      console.log(error);
      return;
   }
   console.log('my server is at port ',port);
});