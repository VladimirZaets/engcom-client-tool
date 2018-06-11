import axios from 'axios';
import mock from "./mock";

export default {

    loadBranches (data) {
        return axios.post('/api/info/target/branches', data)
            .then(res => res);
    },

    port (data) {
        return axios.post('/api/port/start', data)
            .then(res => res.data);
    },

    loadJobs (data) {
        return axios.get('/api/jobs/list')
            .then(res => res);
    },

    loadPortingJobArtifacts (path) {
        return axios.get(path)
            .then(res => res);
    }
}