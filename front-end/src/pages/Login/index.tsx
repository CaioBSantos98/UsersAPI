import styles from "./Login.module.css";
import { useState } from "react";
import Card from "../../components/Card";
import DefaultSubmitForm from "../../components/DefaultSubmitForm";
import { post } from "../../utils/requests-api/post";
import { useRecoilState } from "recoil";
import { authState } from "../../state/atom";
import IUserDetails from "../../interfaces/IUserDetails";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();

    const onSubmit = async () => {
        const url = "http://localhost:8080/login"
        try {
            const response = await post(url, {"user": user, "password": password})
            if (response.ok) {
                const responseJson:IUserDetails = await response.json();
                setAuth({
                    isAuthenticated: true,
                    userId: responseJson.id,
                    userEmail: responseJson.user
                })
                navigate("/my-profile")
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <section className={styles.container}>
            <h2> Faça seu login </h2>
            <Card>
                {auth.isAuthenticated ? 
                    <h3>Você já está logado</h3>
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

export default Login;