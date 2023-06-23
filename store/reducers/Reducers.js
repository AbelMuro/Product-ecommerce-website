import { combineReducers } from "redux";

function cartReducer(items = [], action) {
    switch(action.type){
        case 'add item':
            let itemAlreadyExists = false;
            const newItemName = action.item.name;
            const newItemQuantity = action.item.quantity
            const updatedList = items.map((item) => {
                if(item.name === newItemName){
                    itemAlreadyExists = true                    
                    return {...item, quantity: item.quantity + newItemQuantity}
                }
                else
                    return item;
            })
            if(itemAlreadyExists)
                return updatedList;
            else
                return [...items, action.item];
        default: 
            return items;
    }
}

function openCartReducer(open = false, action){
    switch(action.type){
        case 'open cart':
            return action.open;
        case 'close cart':
            return action.open;
        default: 
            return open; 
    }
}

export default combineReducers({
    cart: cartReducer,
    openCart: openCartReducer,
})