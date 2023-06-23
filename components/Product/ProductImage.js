import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import styles from '../../styles/Product/ProductImage.module.css';

export default function ProductImage({images}) {
    const [choosenImage, setChoosenImage] = useState(images[0][0]);
    const thumbnails = useRef([])

    const changeImage = (e) => {
        const image = e.target.getAttribute('data-image');
        setChoosenImage(image);
    }

    useEffect(() => {
        thumbnails.current.map((thumbnail) => {
            if(thumbnail.classList.contains(styles.thumbnail_selected)){
                thumbnail.classList.remove(styles.thumbnail_selected);
                const overlay = thumbnail.parentElement;
                overlay.classList.remove(styles.overlay_selected);
            }        
        })

        thumbnails.current.map((thumbnail) => {            
            if(thumbnail.getAttribute('data-image') === choosenImage){
                thumbnail.classList.add(styles.thumbnail_selected);
                const overlay = thumbnail.parentElement;
                overlay.classList.add(styles.overlay_selected);
            }     
        })
    }, [choosenImage])



    return(
        <div className={styles.container}>
            <Image src={require(`../../public/Images/${choosenImage}`)} 
                  width='0' height='0' 
                  alt={'product image'} 
                  className={styles.choosenImage}
                  priority
                  unoptimized
            />
            {images.map(([imageUrl, thumbnailUrl], i) => {
                return(
                    <div className={styles.overlay} key={i}>
                        <Image src={`/Images/${thumbnailUrl}`} 
                            width='0' height='0' 
                            alt={'product image'} 
                            className={styles.thumbnails}
                            priority
                            unoptimized
                            data-image={imageUrl}
                            ref={(ref) => thumbnails.current[i] = ref}
                            onClick={changeImage}
                            />
                    </div>
                )
            })}
        </div>
    )
}