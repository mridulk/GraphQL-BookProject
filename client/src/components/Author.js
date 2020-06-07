import React ,{useState}from 'react'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from '@apollo/react-hooks'
// import PropTypes from 'prop-types'
const Authors=gql`{
    authors{
        name,
        id
    }
}`;
const Data=gql`
{
    books{
        name,
        genre,
        id
    }
}`;
const addBookQuery=gql`
    mutation($name:String!,$genre:String!,$authorID:ID!){
        addBook(name:$name,genre:$genre,authorID:$authorID){
            name,
            id
        }
    }
`;
function Author(props) {
    const {loading,error,data}=useQuery(Authors)
    // const {loading:loadingQ,error:errorQ,data:dataQ}=useQuery(addBookQuery)
    const [authorState,setAuthorState]=useState({
        name:'',
        genre:'',
        authorID:''
    })
    const [bookMutation]=useMutation(addBookQuery)
    const displayAuthors=()=>{
        if(loading){
            return <option disabled>Loading...</option>
        }else{
            return data.authors.map(({name,id})=>(
                <option key={id} value={id}>{name}</option>
            ))
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(authorState);
        bookMutation({
            variables:{
                name:authorState.name,
                genre:authorState.genre,
                authorID:authorState.authorID
            },
            refetchQueries:[{query:Data}]
        })
    }
    return (
        <div>
            <form id="add-book" onSubmit={(e)=>handleSubmit(e)} >
                <div className="feild">
                <label htmlFor="">BookName</label>
                <input type="text" value={authorState.name} onChange={(e)=>setAuthorState({...authorState,name:e.target.value})} />
                </div>
                <div className="feild">
                <label htmlFor="">Genre</label>
                <input type="text" value={authorState.genre} onChange={(e)=>setAuthorState({...authorState,genre:e.target.value})} /> 
                </div>
                <div className="feild">
                <select value={authorState.authorID} onChange={(e)=>setAuthorState({...authorState,authorID:e.target.value})} >
                    <option>Select Author Name</option>
                    {displayAuthors()}
                </select>
                </div>
                <input type="submit" value="+"/>
            </form>
        </div>
    )
}

// Author.propTypes = {

// }

export default Author

