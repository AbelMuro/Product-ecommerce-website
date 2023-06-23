import {useState} from 'react';
import Cart from './Cart';
import MobileMenuDialog from './MobileMenuDialog';
import Image from 'next/image';
import styles from '../../styles/Navigation/MobileNavBar.module.css'

export default function MobileNavBar({openCart}) {
    const [openMenu, setOpenMenu] = useState(false);

    const openMobileMenu = () => {
        setOpenMenu(!openMenu);
    }

    return(
        <nav className={styles.container}>
            <ul className={styles.hamburger_and_logo}>
                <li className={styles.hamburger} onClick={openMobileMenu}>
                    <div className={styles.hamburgerIcon}></div>
                </li>
                <li className={styles.logo}>
                    <Image src={'/Icons/logo.svg'} width='0' height='0' alt='logo icon' className={styles.logoIcon}/>
                </li>
            </ul>
            <ul className={styles.cart_and_profile}>
                <li className={styles.cart} onClick={() => {openCart()}}>
                    <div className={styles.cartIcon}></div>
                </li>
                <li className={styles.profile}>
                    <img src={'/Images/image-avatar.png'} className={styles.profileIcon}/>
                </li>
                <Cart/>
            </ul>
            <MobileMenuDialog open={openMenu} setOpen={setOpenMenu}/>
        </nav>
    )
}