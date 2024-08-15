import { useRecoilValue } from "recoil"
import { authState } from "../../state/atom"
import styles from "./AuthenticatedCard.module.css";

const AuthenticatedCard = () => {
    const auth = useRecoilValue(authState);

    return (
        <>
            {auth.isAuthenticated ? 
                <div className={`${styles.container} ${styles.authenticated}`}>
                    <p>Autenticado</p>
                </div>
                :
                <div className={`${styles.container} ${styles.notAuthenticated}`}>
                    <p>Não autenticado</p>
                </div>
            }
        </>
    )
}

export default AuthenticatedCard;