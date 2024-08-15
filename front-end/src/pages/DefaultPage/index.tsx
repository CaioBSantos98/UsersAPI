import styles from "./DefaultPage.module.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../state/atom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getUserDetails } from "../../utils/requests-api/get";
import AuthenticatedCard from "../../components/AuthenticatedCard";

const DefaultPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [auth, setAuth] = useRecoilState(authState)

    useEffect(() => {
        getUserDetails()
        .then(response => {
            if (response) {
                setAuth({
                    isAuthenticated: true,
                    userId: response.id,
                    userEmail: response.user
                })
            }
        })
    }, [setAuth])

    return (
        <main className={styles.container}>
            <Header />
            <AuthenticatedCard />
            <div className={styles.pageContainer}>
                <Outlet />
            </div>
            <Footer>Desenvolvido por Caio Belchior</Footer>
        </main>
    )
}

export default DefaultPage;