import axios from 'axios';

export default {
    deployPullRequest (data) {
        return axios.get(`/api/instance/${data['repo_owner']}/${data['repo_name']}/${data.number}`)
            .then(res => res)
    },
}