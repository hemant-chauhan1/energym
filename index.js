const express = require("express")
const path = require("path")
const hbs = require("hbs")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")

const encoder = bodyParser.urlencoded()
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,  //587
    secure:true,
    auth:{
        user:"chemant1110@gmail.com",
        pass:"pwezxiidooqhhnpo"
    }
})

const app = express()

 
app.use(express.static(path.join(__dirname,"views/public")))
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname,"views/partials"))

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/service",(req,res)=>{
    res.render("service")
})

app.get("/contact",(req,res)=>{
    res.render("contact",{show:false})
})

app.post("/contact",encoder,(req,res)=>{
    let mailOptions = {
        from:"chemant1110@gmail.com",
        to:req.body.email,
        subject:req.body.subject,
        html:`
        <h2>Thanks!!!</h2>
        <h3>Your Query Has Been Received.</h3>
        <h3>Our Team Will Contact You Soon.</h3>
        `
    }
    transporter.sendMail(mailOptions,((error)=>{
        if(error){
            console.log(error)
        }
    }))

    mailOptions = {
        from:"chemant1110@gmail.com",
        to:"chemant1110@gmail.com",
        subject:"New Query Received",
        html:`
        <h2>New Query</h2>
        <table>
          <tbody>
            <tr>
                <th>Name</th>
                <td>${req.body.name}</th>
            </tr>
            <tr>
                <th>Email</th>
                <td>${req.body.email}</th>
            </tr>
            <tr>
                <th>Phone</th>
                <td>${req.body.phone}</th>
            </tr>
            <tr>
                <th>Subject</th>
                <td>${req.body.subject}</th>
            </tr>
            <tr>
                <th>Message</th>
                <td>${req.body.message}</th>
            </tr>
          </tbody>
        </table>
        `
    }
    transporter.sendMail(mailOptions,((error)=>{
        if(error){
            console.log(error)
        }
    }))
    res.render("contact",{show:true})
})

app.listen(8000,console.log("server is running at http://localhost:8000"))
