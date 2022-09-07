const { application } = require('express');
const express= require('express');
const path = require('path')
const viewsPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
var hbs = require('hbs')


//expresss 
const app=express()

app.set('view engine','hbs')
// for dynamic view of handlebars in template folder
app.set('views',viewsPath)
hbs.registerPartials(partialspath)

// for ststic view 
app.use(express.static(path.join(__dirname,'../public')))



app.get('/index',(req,res)=>{
    res.render('index',{
        titile:'Weather APP',
        name:'Nelvin'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        titile:'Help page'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        titile:'About page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send('Please enter the address for getting the weather')
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
        if(error){
           return res.send({
            error:error})
        }
        forecast(latitude,longitude,(error,foreCastdata) =>{
            if(error){
                return res.send({
                    error:error})
            }
            res.send({
                forecast:foreCastdata,
                location:req.query.address
            })
        })
    
    })
    
})


app.get('/help*',(req,res)=>{
    res.render('404',{
        error:'Artical not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page not found 404'
    })
})

app.listen(3000,()=>{
    console.log('Server up on port 3000')
})