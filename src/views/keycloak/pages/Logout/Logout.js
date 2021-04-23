import {useKeycloak} from "@react-keycloak/web";
import {Link} from "react-router-dom";

const Logout = () => {
    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return (
            <div>Init...</div>
        )
    }
    let options = {redirectUri: "/"};
    if (initialized && keycloak.authenticated) {
        return (
            <Link to="/" onClick={() => keycloak.logout(options)}>
                Logout
            </Link>
        );
    }
    console.log("HERE?");
    return (
        <Link to="/" onClick={keycloak.login}>
            Login
        </Link>
    );
}

export default Logout;
