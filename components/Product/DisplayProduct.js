import ProductImage from './ProductImage';
import ProductImageMobile from './ProductImageMobile';
import ProductInfo from './ProductInfo';
import useMediaQuery from '../../hooks/useMediaQuery';
import styles from '../../styles/Product/DisplayProduct.module.css';

export default function DisplayProduct({product}) {
    const mobile = useMediaQuery('(max-width: 670px)');

    return(
        <section className={styles.container}>
            {mobile ? <ProductImageMobile images={product.images}/> : <ProductImage images={product.images}/>}
            <ProductInfo product={product}/>
        </section>
    )
}