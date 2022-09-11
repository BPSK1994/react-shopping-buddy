import React, {useEffect} from 'react'
import Header from './Header'
import List from './List'


const getLocalStorage = function() {
    let list = localStorage.getItem('list')
    if(list) {
        return (list = JSON.parse(localStorage.getItem('list')));
    } else {
        return [];
    }
}

const App = function() {

    const[name, setName] = React.useState("")
    const[list, setList] = React.useState(getLocalStorage)
    const[isEditing, setIsEditing] = React.useState(false)
    const[editId, setEditId] = React.useState(null)

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])


    //Submitting the Form

    const handleSubmit = function(e) {
        e.preventDefault()
        if(name && isEditing) {
            setList(
                list.map(function(item) {
                    if(item.id === editId) {
                        return {...item, title: name}
                    }
                    return item
                })
            )
            setName("")
            setEditId(null)
            setIsEditing(false)
        } else {
            const id = Math.floor(Math.random() * 1000) + 1
            const newItem = {id: id, title: name}
            setList([...list, newItem])
            setName("")
            }
        }
    

    // Removing an Item from the list

    const removeItem = function(id) {
        setList(list.filter(function(item) {
            return item.id !== id
        }))
    }


    // Edit items in the list

    const editItem = function(id) {
        const editItem = list.find(function(item) {
            return item.id === id
        })
        

        setIsEditing(true)
        setEditId(id)
        setName(editItem.title) 
    }


    // Clear all items

    const clearList = function() {
        setList([])
    }

    return (
        <div className = "container">
           <section className = "content">
                 <Header title = {"Shopping Buddy"} />
                 <form onSubmit = {handleSubmit}>
                     <div className = "form-control">
                         <input 
                            className = "form__input"
                            type = "text"
                            value = {name}
                            placeholder = "e.g. Milk"
                            onChange = {function(event) {setName(event.target.value)}}
                            />
                        <button className = "form__btn"
                                type = "submit">{isEditing ? "Edit" : "Submit"}</button>
                    </div>
                </form>
                {list.length > 0 && (
                    <div  >
                        <List items = {list}
                              removeItem = {removeItem}
                              editItem = {editItem}/>
                        <div >
                            <button className = "clr-btn" onClick = {clearList}>Clear Items</button>
                        </div>      
                    </div>
                )}
            </section>
        </div>         
    )
}

export default App


//     const[itemsList, setItemsList] = React.useState([])

//     const[inputData, setInputData]  = React.useState({input: ""})

//     const [edit, setEdit] = React.useState(false)

 
//     const changeButtonText = function(id,input) {
//         setEdit(!edit)
//         setInputData({input: input})
//         onEdit(id)
        
//         }

    


//     const onEdit = function(id) {
//         console.log(id)
//     }




//     const handleChange = function(event) {
//         const {name, value} = event.target
//         return(
//             setInputData(function(prevState) {
//                 return ({
//                     ...prevState, [name]:value
//                 })
//             })
//         )
//     }


//     const handleSubmit = function(event) {
//         event.preventDefault()
//         addItem(inputData)
//         return(
//             setInputData(
//                 {input: ""}
//             )
//         )
//     }


//     // Add Item
    
//     const addItem = function(inputData) {
//         const id = Math.floor(Math.random() * 1000) + 1
//         const newItem = {id, ...inputData}
//         return(
//             setItemsList(function(prevState) {
//                 return([...prevState, newItem])
//             })
//         )
//     }


//     // Delete Item

//     const deleteItem = function(id) {
//         return(
//             setItemsList(itemsList.filter(function(item) {
//                     return(
//                         item.id !== id
//                     )
//                 }))
//             )
//     }


    


//     return(
//         <div className = "container">
//             <section className = "content">
//                 <Header title = {"Shopping Buddy"}
//                 />

//                 <form onSubmit = {handleSubmit}>
//                     <div className = "form-control">
//                         <input 
//                             className = "form__input"
//                             type = "text"
//                             name = "input"
//                             value = {inputData.input}
//                             placeholder = "e.g. Milk"
//                             onChange = {handleChange}
//                             />
//                         <button className = "form__btn"
//                 type = "submit"
//                 >{"Submit"}</button>
//                     </div>
//                 </form>

//                {edit && <button className = "form__btn form__edit"
//                         onClick = {onEdit}>{"Edit"}</button>}

//                 <List itemsList = {itemsList}
//                       onDelete = {deleteItem}
//                       changeButtonText = {changeButtonText} 
//                 />

//             </section>  
//         </div>
//     )
// }

// export default App