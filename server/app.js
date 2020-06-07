const express=require('express')
const graphqlHTTP=require('express-graphql')
const  schema=require('./Schema/schema.js')
const app=express();
const mongoose=require('mongoose')
const cors=require('cors')
mongoose.connect('mongodb+srv://mridul:8512003434@cluster0-gk3gu.mongodb.net/test?retryWrites=true&w=majority')
mongoose.connection.once('open',()=>{
    console.log('mongoose connected')
})
app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))
app.listen(3000,()=>{
    console.log(`App listening on port 3000`)
})