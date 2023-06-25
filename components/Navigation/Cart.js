import {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import styles from '../../styles/Navigation/Cart.module.css';

export default function Cart() {
    const dispatch = useDispatch();
    const dialog = useRef();
    const list = useSelector(state => state.cart);
    const open = useSelector(state => state.openCart);

    const calculateTotal = (price, quantity) => {
        return (price * quantity).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    const deleteItem = (e) => {
        const itemToRemove = e.target.getAttribute('data-item');
        dispatch({type: 'delete item', item: itemToRemove});
    }

    useEffect(() => {
        if(open){
            dialog.current.style.display = 'block';
            setTimeout(() => {
                if(!dialog || !dialog.current) return;
                dialog.current.style.transform = 'scale(1)';
            }, 10)
        }
        else {
            dialog.current.style.transform = '';
            setTimeout(() => {
                if(!dialog || !dialog.current) return;
                dialog.current.style.transform = '';
            })
        }
    }, [open])

    return(
        <dialog className={styles.dialog} ref={dialog}>
            <h1 className={styles.title}>
                Cart
            </h1>
            {list.length ? 
            <>
                {list.map((item) => {
                    return(                    
                        <section className={styles.product} key={item.name}>
                            <Image src={`/Images/${item.image}`} 
                                width='0' height='0' 
                                alt='product image' 
                                className={styles.productImage} 
                                priority 
                                unoptimized/>
                            <h1 className={styles.productName}>
                                {item.name}
                            </h1>
                            <p className={styles.price_quantity_total}>
                                <span className={styles.productPrice}>{item.price.toFixed(2)}</span>
                                &nbsp;
                                <span className={styles.productQuantity}>x {item.quantity}</span>
                                &nbsp; 
                                &nbsp;
                                <span className={styles.productTotal}>${calculateTotal(item.price, item.quantity)}</span>
                            </p>
                            <div className={styles.productDelete} onClick={deleteItem} data-item={item.name}></div>
                        </section>                                              
                        )
                    })  
                }
                <button className={styles.checkoutButton}>
                    Checkout
                </button>                
            </> : <div className={styles.emptyMessage}>Your cart is empty.</div>}

    

        </dialog>
    )
}

