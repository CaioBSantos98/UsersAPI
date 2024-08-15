import { useRecoilState } from "recoil";
import Card from "../../components/Card";
import { authState } from "../../state/atom";
import styles from "./Profile.module.css";
import { logoff } from "../../utils/requests-api/logoff";
import { useNavigate } from "react-router-dom";
import NewPasswordModal from "../../components/NewPasswordModal";
import { useState } from "react";
import { deleteUserFromDb } from "../../utils/requests-api/delete";

const Profile = () => {
    const [auth, setAuth] = useRecoilState(authState)
    const navigate = useNavigate()
    const [isOpenModal, setOpenModal] = useState(false);

    const doLogoff = () => {
        logoff()
        .then((response) => {
            if (response?.ok) {
                setAuth({
                    isAuthenticated: false,
                    userId: 0,
                    userEmail: "null"
                })
                alert("Logoff efetuado com sucesso! Redirecionando para o Início.")
                navigate("/")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const openNewPasswordModal = () => {
        setOpenModal(true)
    }

    const deleteUser = () => {
        const userConfirmed = confirm("Você tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita!");

        if (userConfirmed) {
            deleteUserFromDb()
            .then(response => {
                if (response && response.ok) {
                    setAuth({
                        isAuthenticated: false,
                        userId: 0,
                        userEmail: "null"
                    })
                    alert("Sua conta foi deletada!")
                    navigate("/login")
                } else {
                    alert("Falha interna. Operação não realizada!")
                }
            })
        } else {
            alert("Ação cancelada!")
        }
    }

    return (
        <section className={styles.container}>
            {auth.isAuthenticated ? 
                <>
                    <Card>
                        <h2>Meu perfil</h2>
                        <h3>ID: {auth.userId}</h3>
                        <h3>Usuário: {auth.userEmail}</h3>
                        <button onClick={openNewPasswordModal}>Alterar senha</button>
                        <button onClick={doLogoff}>Fazer logoff</button>
                        <button className={styles.deleteUserBtn} onClick={deleteUser}>Deletar usuário</button>
                    </Card>
                </>
                :
                <Card>
                    <h2>Meu perfil</h2>
                    <h3>Você não está logado.</h3>
                </Card>
            }
            {
                auth.isAuthenticated && isOpenModal && 
                    <NewPasswordModal isOpen={isOpenModal} setModal={setOpenModal} />
            }
        </section>
    )
}

export default Profile;