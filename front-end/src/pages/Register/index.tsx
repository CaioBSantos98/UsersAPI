import styles from "./Register.module.css";
import { useState } from "react";
import Card from "../../components/Card";
import DefaultSubmitForm from "../../components/DefaultSubmitForm";
import { post } from "../../utils/requests-api/post";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../utils/requests-api/get";
import { useRecoilState } from "recoil";
import { authState } from "../../state/atom";

const Register = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useRecoilState(authState)

    const onSubmit = (): void => {
        const url = "http://localhost:8080/users"
        post(url, {"user": user, "password": password})
        .then(response => {
            if(response.status === 201) {
                getUserDetails()
                .then(response => {
                    if (response) {
                        setAuth({
                            isAuthenticated: true,
                            userId: response?.id,
                            userEmail: response?.user
                        })
                        alert("Usuário cadastrado com sucesso.")
                        navigate("/my-profile")
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }
        })
        .catch(() => {
            alert("Usuario com esse email já existente. Tente novamente!")
        })
    }

    return (
        <section className={styles.container}>
            <h2>Cadastre-se no nosso portal</h2>
            <Card>
                {auth.isAuthenticated ? 
                    <>
                        <h3>Você está logado.</h3>
                        <h3>Para registrar um novo usuário, faça logoff.</h3>
                    </>
                    :
                    <DefaultSubmitForm 
                        user={user}
                        password={password}
                        setUser={setUser}
                        setPassword={setPassword}
                        onSubmit={onSubmit}
                    />
                }
            </Card>
        </section>
    )
}

export default Register;