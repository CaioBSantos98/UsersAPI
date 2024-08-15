import styles from "./Footer.module.css";

interface FooterProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any
}

const Footer = ({ children }: FooterProps) => {
    return(
        <footer className={styles.container}>
            {children}
        </footer>
    )
}

export default Footer;