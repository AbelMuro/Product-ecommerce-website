import {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../styles/Product/ProductImageMobile.module.css'


// i put all the image urls in an array ref with their index, now i need to set up the event handlers 
export default function ProductImageMobile({images}) {
    const allImages = useRef();
    const currentImageRef = useRef();
    const currentIndex = useRef(0);
    const [currentImage, setCurrentImage] = useState(images[0][0])

    const handleEnter = (e) => {
        const arrow = e.target.firstElementChild;
        arrow.style.backgroundColor = '#FF7E1B';
    }

    const handleLeave = (e) => {
        const arrow = e.target.firstElementChild;
        arrow.style.backgroundColor = '';
    }

    const previousImage = () => {
        if(!allImages.current[currentIndex.current - 1]) return;
        currentIndex.current--;
        currentImageRef.current.style.opacity = '0';
        setTimeout(() => {                                      //we wait for the opacity transition to finish before calling setState()
            setCurrentImage(allImages.current[currentIndex.current]);     
        }, 200)
    }

    const nextImage = () => {
        if(!allImages.current[currentIndex.current + 1]) return;
        currentIndex.current++;
        currentImageRef.current.style.opacity = '0';
        setTimeout(() => {                                      //we wait for the opacity transition to finish before calling setState()
            if(!allImages && !allImages.current) return;
            setCurrentImage(allImages.current[currentIndex.current]);     
        }, 200)
    }

    useEffect(() => {
        currentImageRef.current.style.opacity = '';
    }, [currentImage])    

    useEffect(() => {
        allImages.current = images.map(([image,]) => {
            return image;
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
                src={require(`../../public/Images/${currentImage}`)} 
                width='0' height='0' 
                alt={'product image'} 
                className={styles.image}
                ref={currentImageRef}
                unoptimized
                priority
                />
            <button className={styles.nextButton} 
                onMouseEnter={handleEnter} 
                onMouseLeave={handleLeave}
                onClick={nextImage}>
                <span className={styles.rightArrow}></span>                
            </button>
        </div>
    )
}