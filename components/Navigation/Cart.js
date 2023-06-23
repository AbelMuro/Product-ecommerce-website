import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import Image from 'next/image';
import styles from '../../styles/Navigation/Cart.module.css';
import products from '../../data/products';


export default function Cart() {
    const dialog = useRef();
    const list = useSelector(state => state.cart);
    const open = useSelector(state => state.openCart);


    useEffect(() => {
        if(open){
            dialog.current.style.display = 'block';
            setTimeout(() => {
                if(!dialog || !dialog.current) return;
                dialog.current.style.transform = 'scale(1)'
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
            {products.map((product, i) => {
                return(
                    <section className={styles.product} key={i}>
                        <Image src={`/Images/wh.png}`} 
                            width='0' height='0' 
                            alt='product image' 
                            className={styles.productImage} 
                            priority 
                            unoptimized/>
                        <h1 className={styles.productName}>
                            {product.name}
                        </h1>
                        <p className={styles.price_quantity_total}>
                            <span className={styles.productPrice}>{product.price.toFixed(2)}</span>
                            &nbsp;
                            <span className={styles.productQuantity}>x 3</span>
                            &nbsp; 
                            &nbsp;
                            <span className={styles.productTotal}>$375.00</span>
                        </p>

                        <div className={styles.productDelete}></div>
                    </section>
                )
            })}
            <button className={styles.checkoutButton}>
                Checkout
            </button>

        </dialog>
    )
}

