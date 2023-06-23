import {useState} from 'react';
import Image from 'next/image';
import styles from '../../styles/Product/ProductImage.module.css';

export default function ProductImage({images}) {
    const [choosenImage, setChoosenImage] = useState('');


    const changeImage = (e) => {
        const image = e.target.getAttribute('data-image');
        console.log(image)
        setChoosenImage(image);
    }

    return(
        <div className={styles.container}>
            <Image src={require(`../../public/Images/${choosenImage}`)} 
                  width='0' height='0' 
                  alt={'product image'} 
                  className={styles.choosenImage}
                  priority
                  unoptimized
            />
            {images.map(([imageUrl, thumbnailUrl]) => {
                return(
                    <Image src={`/Images/${thumbnailUrl}`} 
                        width='0' height='0' 
                        alt={'product image'} 
                        className={styles.thumbnails}
                        priority
                        unoptimized
                        data-image={imageUrl}
                        onClick={changeImage}
                        />
                )
                
            })}
        </div>
    )
}