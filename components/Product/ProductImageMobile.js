import {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../styles/Product/ProductImageMobile.module.css'


// i put all the image urls in an array ref with their index, now i need to set up the event handlers 
export default function ProductImageMobile({images}) {
    const allImages = useRef();
    const [currentImage, setCurrentImage] = useState([images[0][0], 0])

    const handleEnter = (e) => {
        const arrow = e.target.firstElementChild;
        arrow.style.backgroundColor = '#FF7E1B';
    }

    const handleLeave = (e) => {
        const arrow = e.target.firstElementChild;
        arrow.style.backgroundColor = '';
    }

    const previousImage = () => {
        //set fade out class
        setCurrentImage()
        //set fade in class
    }

    useEffect(() => {
        allImages.current = images.map(([image,], i) => {
            return [image, i];
        })  
    }, [images])

    return(
        <div className={styles.container}>
            <button className={styles.prevButton} 
                onMouseEnter={handleEnter} 
                onMouseLeave={handleLeave}
                onClick={previousImage}>
                <span className={styles.leftArrow}></span>
            </button>
            <Image 
                src={require(`../../public/Images/${currentImage[0]}`)} 
                width='0' height='0' 
                alt={'product image'} 
                className={styles.image}
                unoptimized
                priority
                />
            <button className={styles.nextButton} 
                onMouseEnter={handleEnter} 
                onMouseLeave={handleLeave}>
                <span className={styles.rightArrow}></span>                
            </button>
        </div>
    )
}