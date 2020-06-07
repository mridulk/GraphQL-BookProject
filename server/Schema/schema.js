const graphql=require('graphql')
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList}=graphql
const  _ =require('lodash')
const Book=require('../models/book')
const Author=require('../models/author')
//dummy data
// var bookArray=[
//     {name:"Life of pie",genre:"Action",id:"1",authorID:'1'},
//     {name:"Ramayana",genre:"Fantasy",id:"2",authorID:'1'},
//     {name:"Half Girlfriend",genre:"drama",id:"3",authorID:'3'}

// ]
// var authorArray=[
//     {name:"Shakespear",id:"1",age:100},
//     {name:"Raman",id:"2",age:20},
//     {name:"Richard",id:"3",age:65}

// ]
const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                // return _.find(authorArray,{id:parent.authorID})
                return Author.findById(parent.authorID)
            }
        }
    })
})
const AuthorType=new GraphQLObjectType({
    name:'author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        book:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(bookArray,{authorID:parent.id})
                return Book.find({authorID:parent.id})
            }
        }
    })
})
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //data base fetch req by argument that is passed in 
            //   return _.find(bookArray,{id:args.id})
            return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authorArray,{id:args.id})
                return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return bookArray
                return Book.find({})
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authorArray
                return Author.find({})
            }
        }
    }
})
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author=new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorID:{type:GraphQLID}
            },
            resolve(parent,args){
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    authorID:args.authorID
                })
                return book.save();
            }
        }
    }
})
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})