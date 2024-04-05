const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); // { v4: uuid }this means we're taking V4 of UUID and naming that variable as uuid and calling it as uuid() to generate a random id
uuid(); 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,"/views"))

let comments = [
  { id:uuid(),
    username: 'Todd',
    comment: "Lol that's so funny"
  },
  { id:uuid(),
    username: 'Skyler',
    comment: "Let's have some fun tonight"
  },
  { id:uuid(),
    username: 'Lildaddy',
    comment: "plz, delete your account Todd"
  },
  { id:uuid(),
    username: 'NiggaMaster69',
    comment: "woof woof woof"
  }
]

app.get('/comments',(req,res)=>{
    res.render("comments/index.ejs",{comments})
})

app.get('/comments/new',(req,res)=>{
    res.render("comments/new.ejs")
})

app.post('/comments',(req,res)=>{
   const {username, comment} = req.body
   comments.push({username, comment, id: uuid()})
    res.redirect("/comments")
})

app.get('/comments/:id',(req,res)=>{
   const { id } = req.params
  const comment = comments.find(c => c.id === id)
  res.render('comments/show.ejs',{comment})
})

app.get('/comments/:id/edit',(req,res)=>{
   const {id} = req.params
   const comment = comments.find(c => c.id === id)

  res.render('comments/edit',{comment})
})

app.patch('/comments/:id',(req,res)=>{
  const {id} = req.params
  const newCommentText = req.body.comment
  const findComment = comments.find(c => c.id === id)
  findComment.comment = newCommentText
  res.redirect("/comments")
})

app.delete('/comments/:id',(req,res)=>{
  const {id} = req.params
 comments = comments.filter(c => c.id != id)
  res.redirect('/comments')
})

app.listen(3000,()=>{
    console.log("Listening on port 3000")
})