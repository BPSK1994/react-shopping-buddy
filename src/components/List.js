import React from 'react';

const List = function({
    items, removeItem, editItem
}) {
    return (
        <div className = "list-container">
            {items.map(function(item) {
                const {id, title} = item;
                return (
                    <div className = "item-container flex">
                        <p className = "item" key = {id}>{title}</p>
                        <div className ="btns">
                            <button type = "button"
                                    onClick = {function() {editItem(id)}} 
                                    className = "edit-btn"><i className = "fa-solid fa-edit"></i>
                            </button>

                            <button type = "button"
                                    onClick = {function(){removeItem(id)}} 
                                    className = "dlt-btn"><i className = "fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>    
                )
            })}
        </div>
    )
}


export default List