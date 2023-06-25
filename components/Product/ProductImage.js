import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
import styles from '../../styles/Product/ProductImage.module.css';
import LightBox from './LightBox';

export default function ProductImage({images}) {
    const [choosenImage, setChoosenImage] = useState(images[0][0]);
    const [openLightBox, setOpenLightBox] = useState(false);
    const thumbnails = useRef([])

    const changeImage = (e) => {
        const image = e.target.getAttribute('data-image');
        setChoosenImage(image);
    }

    const handleCloseUp = () => {
        setOpenLightBox(!openLightBox);
    }

    useEffect(() => {
        thumbnails.current.map((thumbnail) => {
            const overlay = thumbnail.parentElement;
            overlay.style.border = '';
            thumbnail.style.opacity = '';
        })

        thumbnails.current.map((thumbnail) => {
            if(thumbnail.getAttribute('data-image') === choosenImage){
                const overlay = thumbnail.parentElement;
                overlay.style.border = '2px solid #FF7E1B';
                thumbnail.style.opacity = '0.75';                
            }
        })
    }, [choosenImage])



    return(
        <>
            <div className={styles.container}>
                <Image src={require(`../../public/Images/${choosenImage}`)} 
                    width='0' height='0' 
                    alt={'product image'} 
                    className={styles.choosenImage}
                    priority
                    unoptimized
                    onClick={handleCloseUp}
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
            {openLightBox ? <LightBox images={images} currentImage={choosenImage} setOpenLightBox={setOpenLightBox}/> : <></> } 
        </>

    )
}