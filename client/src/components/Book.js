import React from 'react'
// import PropTypes from 'prop-types'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
const Data=gql`
{
    books{
        name,
        genre,
        id
    }
}`;
function Book(props) {
    const {loading,error,data}=useQuery(Data);
    if (loading) console.log("loading..")
    if (error) console.log("error..")
    const displayBooks=()=>{
        if(loading){
            return <h5>Loading Books...</h5>
        }else{
            return <div>
                    {data&&data.books.map(({name,genre,id})=>(
                    <li key={id}>{name}</li>
                    ))}
                
            </div>
        }
    }
    return (
        <div>
            <ul id="book-list" >
                {displayBooks()}
            </ul>
        </div>
    )
}

// Book.propTypes = {

// }

export default Book

