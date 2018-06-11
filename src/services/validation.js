import isURL from 'validator/lib/isURL';
import _isEmpty from 'lodash/isEmpty';
import GithubUrlParser from 'parse-github-url';


export const isGithubUrl = data => {
    let message;

    if (!(isURL(data) && GithubUrlParser(data).host === 'github.com')) {
        message = 'This field should be GitHub url.';
    }

    return {
        message,
        isValid: _isEmpty(message)
    }
};

export const isEmpty = data => {
    let message;

    if (_isEmpty(data)) {
        message = 'This field is required.';
    }

    return {
        message,
        isValid: _isEmpty(message)
    }
};