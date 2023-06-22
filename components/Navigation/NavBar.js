import styles from '../../styles/Navigation/NavBar.module.css';
import Image from 'next/image';
import MobileNavBar from './MobileNavBar';
import useMediaQuery from '../../hooks/useMediaQuery';

export default function NavBar(){
    const mobile = useMediaQuery('(max-width: 670px)');

    return mobile ? <MobileNavBar/> :
        <nav className={styles.container}>
            <ul className={styles.links}>
                <li className={styles.logo}>
                    <Image src={'/Icons/logo.svg'} width='0' height='0' className={styles.logoIcon} alt='sneakers logo' priority/>
                </li>
                <li className={styles.link}>
                    Collections
                </li>
                <li className={styles.link}>
                    Men
                </li>
                <li className={styles.link}>
                    Women
                </li>
                <li className={styles.link}>
                    About
                </li>
                <li className={styles.link}>
                    Contact
                </li>
            </ul>
            <ul className={styles.cart_and_profile}>
                <li className={styles.cart}>
                    <div src={'/Icons/icon-cart.svg'} className={styles.cartIcon}></div>
                </li>
                <li className={styles.profile}>
                    <img src={'/Images/image-avatar.png'} className={styles.profileIcon} alt={'profile icon'}/>
                </li>
            </ul>

        </nav>
    
} 