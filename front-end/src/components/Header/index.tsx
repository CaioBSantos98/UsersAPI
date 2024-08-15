import NavBar from "../NavBar";
import styles from "./Header.module.css";

interface HeaderProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any
}

const Header = ({ children }: HeaderProps) => {
    return(
        <header className={styles.container}>
            <NavBar />
            {children}
        </header>
    )
}

export default Header;