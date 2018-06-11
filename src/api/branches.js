import axios from 'axios';

export default {
    loadBranches (data) {
        return axios.post('/api/info/target/branches', data)
            .then(res => res);
    }
}