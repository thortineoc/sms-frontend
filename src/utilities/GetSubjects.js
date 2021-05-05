const getKeycloakSubjects = (keycloak, setSubjects) => {
    keycloak.loadUserProfile().then((profile) => {
        setSubjects(profile.attributes.subjects);
    })
        .catch((error) => console.log(error));
}

export default getKeycloakSubjects;