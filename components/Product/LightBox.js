import {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../styles/Product/LightBox.module.css';

export default function LightBox({images, currentImage, setOpenLightBox}) {
    const [choosenImage, setChoosenImage] = useState(currentImage);
    const thumbnails = useRef([]);
    const choosenImageRef = useRef();
    const overlayRef = useRef();
    const containerRef = useRef();

    const changeImage = (e) => {
        const newImage = e.target.getAttribute('data-image');
        setChoosenImage(newImage);
    }

    const nextImage = () => {
            thumbnails.current.every((thumbnail, i) => {
                if(thumbnail.getAttribute('data-image') === choosenImage){
                    const nextThumbnail = thumbnails.current[i + 1];
                    if(!nextThumbnail) return false;
                    
                    const nextThumbnailUrl = nextThumbnail.getAttribute('data-image');    
                    setChoosenImage(nextThumbnailUrl);
                    return false;
                }
                else
                    return true;
            })                           
    }

    const prevImage = () => { 
        thumbnails.current.every((thumbnail, i) => {
            if(thumbnail.getAttribute('data-image') === choosenImage){
                const prevThumbnail = thumbnails.current[i - 1];
                if(!prevThumbnail) {
                    choosenImageRef.current.style.opacity = ''
                    return false;
                 }
                const prevThumbnailUrl = prevThumbnail.getAttribute('data-image');    
                setChoosenImage(prevThumbnailUrl);
                return false
            }
            else
                return true;
        })            
    }

    const closeLightBox = () => {
        containerRef.current.style.opacity = '';
        setTimeout(() => {
           overlayRef.current.style.backgroundColor = ''; 
        }, 200)
        setTimeout(() => {
            setOpenLightBox(false);
        }, 400)
    }

    useEffect(() => {
        setTimeout(() => {
            overlayRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';            
        }, 10)
        setTimeout(() => {
            containerRef.current.style.opacity = '1';
        }, 210)
    }, [])

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


    return (
        <section className={styles.overlay} ref={overlayRef}>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.container_choosenImage}>
                    <button className={styles.whiteButton} onClick={prevImage}>
                        <span className={styles.leftArrowIcon}></span>
                    </button>
                    <Image src={require(`../../public/Images/${choosenImage}`)}
                        width='0' height='0'
                        alt='product image'
                        className={styles.choosenImage}
                        ref={choosenImageRef}
                        unoptimized
                        priority
                    />  
                    <button className={styles.whiteButton} onClick={nextImage}>
                        <span className={styles.rightArrowIcon}></span>
                    </button>                   
                    <span className={styles.closeIcon} onClick={closeLightBox}></span>      
                </div>

                {images.map(([imageUrl, thumbnailUrl], i) => {
                    return(
                        <div className={styles.overlayThumbnail} key={i}>
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
        </section>

    )
}
