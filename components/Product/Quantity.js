import {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import styles from '../../styles/Product/Quantity.module.css';

const Quantity = forwardRef(({handleButton}, ref) => {
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        setQuantity(quantity + 1);
    }

    const handleSubtract = () => {
        if(!quantity) return;
        setQuantity(quantity - 1);
    }

    useEffect(() => {
        handleButton(quantity ? false : true);       
    }, [quantity])

    useImperativeHandle(ref, () => ({
        get state() {
            return quantity;
        }
    }))

    return(
        <div className={styles.container}>
            <span className={styles.minus} onClick={handleSubtract}></span>
                {quantity}
            <span className={styles.plus} onClick={handleAdd}> </span>
        </div>
    )
})

export default Quantity;