import styles from '../../styles/Navigation/NavBar.module.css';
import Image from 'next/image';

export default function Navbar(){
    return(
        <nav className={styles.container}>
            <ul className={styles.links}>
                <li className={styles.logo}>
                    <Image src={'/Icons/logo.svg'} width='0' height='0' className={styles.logoIcon} priority alt='sneakers logo'/>
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
        </nav>
    )
} 