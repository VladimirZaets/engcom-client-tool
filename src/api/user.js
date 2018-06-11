import axios from 'axios';

export default {
    loadUserOrganizations () {
        axios.defaults.headers['X-API-KEY'] = 'db16736c-d359-4a51-8a7a-0803f2d1ce40';

        return axios.get('/api/github/org')
            .then(res => res.data);
    }
}