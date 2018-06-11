import mock from './mock';

export default {
    /*loadPullRequestList: () => axios.get('/api/pulls')
        .then(res => res),*/

    loadPullRequestList: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mock);
            }, 500);
        });
    }

}