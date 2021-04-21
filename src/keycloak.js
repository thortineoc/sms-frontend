import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
//const keycloak = Keycloak({
//    realm: "sms",
//    clientId: "frontend",
//    url: "http://52.142.201.18:24020/auth/"
//});
const keycloak = new Keycloak('/keycloak.json');

export default keycloak