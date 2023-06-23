import {useRef, useEffect} from 'react';
import styles from '../../styles/Navigation/MobileMenuDialog.module.css'

export default function MobileMenuDialog({open, setOpen}) {
    const overlay = useRef();
    const dialog = useRef();

    const closeMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if(open){
            overlay.current.style.width = '100%';
            dialog.current.style.display = 'block';
            setTimeout(() => {
                if(!overlay || !overlay.current) return;                        // these conditions are here in case 
                overlay.current.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';   // the component gets unmounted before the setTimeout() finishes
            }, 200)            
            setTimeout(() => {
                if(!dialog || !dialog.current) return;
                dialog.current.style.width = '250px'; 
                dialog.current.style.padding = '24.78px 0px 0px 25.28px';                
            }, 400)
        }
        else{
            dialog.current.style.width = ''; 
            dialog.current.style.padding = ''; 
            setTimeout(() => {
                if(!dialog || !dialog.current) return;
                if(!overlay || !overlay.current) return;
                dialog.current.style.display = '';
                overlay.current.style.backgroundColor = ''; 
            }, 200)
            setTimeout(() => {
                if(!overlay || !overlay.current) return;
                overlay.current.style.width = '';
            }, 400)
        }
    }, [open])

    return(
        <div className={styles.overlay} ref={overlay}>
            <dialog className={styles.dialog} ref={dialog}>
                <ul className={styles.links}>
                    <li className={styles.close}>
                        <div className={styles.closeIcon} onClick={closeMenu}></div>
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
            </dialog>            
        </div>

    )
}