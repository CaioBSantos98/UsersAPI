import { FormEvent } from "react";
import styles from "./DefaultSubmitForm.module.css";

interface Props {
    user: string,
    password: string,
    setUser: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    onSubmit: () => void
}

const DefaultSubmitForm = ({ user, password, setUser, setPassword, onSubmit }: Props) => {

    const submitForm = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        onSubmit();
        setUser("");
        setPassword("");
    }

    return (
        <form className={styles.container} onSubmit={event => submitForm(event)}>
            <label htmlFor="user_input">Email:</label>
            <input type="email" name="email" id="user_input" value={user} onChange={event => setUser(event.target.value)} required placeholder="exemplo@email.com"/>
            <label htmlFor="password_input">Senha:</label>
            <input type="password" name="password" id="password_input" value={password} onChange={event => setPassword(event.target.value)} required placeholder="Digite sua senha"/>
            <button>Enviar</button>
        </form>
    )
}

export default DefaultSubmitForm;