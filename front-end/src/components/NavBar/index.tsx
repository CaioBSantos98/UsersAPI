import { useRecoilValue } from "recoil";
import styles from "./NavBar.module.css";

import { Link } from "react-router-dom";
import { authState } from "../../state/atom";

const NavBar = () => {

    const auth = useRecoilValue(authState);

    return (
        <nav className={styles.container}>
            <Link className={styles.links} to="/">Início</Link>
            
            
            {auth.isAuthenticated ? 
                <Link className={styles.links} to="/my-profile">Meu perfil</Link>
                :
                <>
                    <Link className={styles.links} to="/login">Login</Link>
                    <Link className={styles.links} to="/register">Cadastre-se</Link>
                </>
            }
        </nav>
    )
}

export default NavBar;