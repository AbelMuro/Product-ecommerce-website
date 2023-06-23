import {useRef} from 'react';
import Quantity from './Quantity';
import Image from 'next/image';
import {useDispatch} from 'react-redux';
import styles from '../../styles/Product/ProductInfo.module.css';

export default function ProductInfo({product}) {
    const quantity = useRef();
    const button = useRef();
    const dispatch = useDispatch();

    const calculateDiscountedPrice = (price, discount) => {
        return price * (discount/100);
    }

    const handleButton = (disable) => {                 //this handler is passed down to <Quantity/>
        button.current.disabled = disable;
    }

    const addToCart = () => {
        const itemQuantity = quantity.current.state;
        const itemPrice = product.discount ? calculateDiscountedPrice(product['price'], product['discount']) : product['price'];
        
        const newItem = {
            image: product['images'][0][1],
            name: product['name'],
            price: itemPrice,
            quantity: itemQuantity,
            total: itemPrice * itemQuantity
        }

        dispatch({type: 'add item', item: newItem})
    }

    return(
        <div className={styles.container}>
            <h2 className={styles.companyName}>
                {product["company name"]}
            </h2>
            <h1 className={styles.productTitle}>
                {product["name"]}
            </h1>
            <p className={styles.productDesc}>
                {product["desc"]}
            </p>

            <div className={styles.price_discount_origPrice}>
                <p className={styles.productPrice}>
                    ${product.discount ? calculateDiscountedPrice(product["price"], product["discount"]).toFixed(2) : product["price"]}
                </p>   
                {product.discount ? 
                    <div className={styles.productDiscount}>
                        {product.discount}%
                    </div> : <></>
                }  
                {product.discount ? 
                    <div className={styles.productOriginalPrice}>
                        ${product.price.toFixed(2)}
                    </div> : <></>
                }                              
            </div>
            <Quantity ref={quantity} handleButton={handleButton}/>
            <button className={styles.cartButton} onClick={addToCart} ref={button}>
                <Image src={'/Icons/icon-cart.svg'} width='0' height='0' alt='Cart icon' className={styles.cartIcon}/>
                Add to cart
            </button>
        </div>
    )
}
