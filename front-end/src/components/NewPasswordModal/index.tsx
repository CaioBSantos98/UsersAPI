import { useState } from "react";
import Card from "../Card";
import styles from "./NewPasswordModal.module.css";
import { IUpdateUserPassword } from "../../interfaces/IUpdateUserPassword";
import { useRecoilValue } from "recoil";
import { authState } from "../../state/atom";
import { updatePassword } from "../../utils/requests-api/password";

interface ModalProps {
    isOpen: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NewPasswordModal = ({ isOpen, setModal }: ModalProps) => {

    const auth = useRecoilValue(authState)

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedNewPassword, setConfirmedNewPassword] = useState("")

    const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (confirmedNewPassword !== newPassword) {
            alert("Sua nova senha não confere com o campo confirme sua nova senha!")
            return;
        }

        const body: IUpdateUserPassword = {
            id: auth.userId,
            currentPassword: currentPassword,
            newPassword: newPassword
        }

        updatePassword(body)
        .then((response) => {
            if (response?.ok) {
                setCurrentPassword("")
                setNewPassword("")
                setConfirmedNewPassword("")
                alert("Senha atualizada com sucesso!")
                setModal(false)
            }
        })
    }

    return (
        <>
            {isOpen &&
                <div className={styles.container}>
                    <div className={styles.modalContent}>
                        <Card>
                            <h2>Atualize sua senha</h2>
                            <form action="" onSubmit={event => formHandler(event)}>
                                <label htmlFor="currentPassword">Senha atual:</label>
                                <input type="password" id="currentPassword" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
                                <label htmlFor="newPassword">Nova senha:</label>
                                <input type="password" id="newPassword" required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                                <label htmlFor="confirmedNewPassword">Confirme sua nova senha:</label>
                                <input type="password" id="confirmedNewPassword" required value={confirmedNewPassword} onChange={(event) => setConfirmedNewPassword(event.target.value)} />
                                <button>Enviar</button>
                            </form>
                            <button
                                className={styles.closeModalBtn} 
                                onClick={() => {
                                    setCurrentPassword("")
                                    setNewPassword("")
                                    setConfirmedNewPassword("")
                                    setModal(false)
                                }}
                            >X</button>
                        </Card>
                    </div>
                </div>
            }
        </>
    )
}

export default NewPasswordModal;