import ProductImage from './ProductImage';
import styles from '../../styles/Product/DisplayProduct.module.css';

export default function DisplayProduct({product}) {
    return(
        <section className={styles.container}>
            <ProductImage images={product.images}/>  

        </section>
    )
}