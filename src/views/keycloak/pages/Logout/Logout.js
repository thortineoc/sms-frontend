import {useKeycloak} from "@react-keycloak/web";


const Logout = () => {
    const {keycloak, initialized} = useKeycloak();
    if (initialized && keycloak.authenticated) {
        keycloak.logout();

    }
    return (
        <div>
            Logged out!
        </div>
    );
}

export default Logout;
