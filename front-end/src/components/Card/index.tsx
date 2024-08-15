/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Card.module.css";

interface Props {
    children?: any
}

const Card = ({ children }: Props) => {

    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export default Card;