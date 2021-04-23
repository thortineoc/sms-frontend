// ### USAGE EXAMPLE ###
// const {keycloak, initialized} = useKeycloak();
// const [role, setRole] = useState("");
//
// useEffect(() => {
//     if (!!initialized) {
//         getKeycloakRoles(keycloak, setRole)
//     }
// }, [keycloak, initialized])

const getKeycloakRoles = (keycloak, setRoles) => {
    keycloak.loadUserProfile().then((profile) => {
        setRoles(profile.attributes.role[0]);
    })
        .catch((error) => console.log(error));
}

export default getKeycloakRoles;
