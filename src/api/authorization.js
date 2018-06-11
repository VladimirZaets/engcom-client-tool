import axios from "axios/index";

export default {
    loadAuthorizationUrl: () => axios.get('/api/auth/loginUrl')
        .then(res => res)
}
