import styles from "./Home.module.css";

const Home = () => {
    return (
        <section className={styles.container}>
            <h1>Projeto SPA com API REST</h1>
            <h2>Este projeto foi desenvolvido com o intuito de criar uma Single Page Application (SPA) integrada a uma API REST.</h2>
            <ul>
                <h4>Objetivo do Projeto:</h4>
                <li>Desenvolver o back-end utilizando Java e Spring Boot.</li>
                <li>Desenvolver o front-end utilizando React e TypeScript.</li>
                <li>Integrar o front-end com o back-end.</li>
                <li>Implementar todas as funcionalidades do CRUD para os usuários.</li>
                <li>Controlar o estado global de autenticação de usuários.</li>
                <li>Personalizar a aplicação caso o usuário esteja autenticado.</li>
            </ul>
            <ul>
                <h4>Tecnologias Utilizadas:</h4>
                <li>Front-end: React, TypeScript, Recoil</li>
                <li>Back-end: Java, Spring Boot, PostgreSQL</li>
                <li>Autenticação: Auth0 JWT, Cookies</li>
            </ul>
            <ul>
                <h4>Funcionalidades:</h4>
                <li>Cadastro, leitura, atualização e exclusão de usuários</li>
                <li>Autenticação de usuários</li>
                <li>Login e Logoff</li>
            </ul>
        </section>
    )
}

export default Home;