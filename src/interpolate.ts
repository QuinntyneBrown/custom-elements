var regex = require('es6-template-regex');

export const compile = (str, data) => {
    return str.replace(regex(), function (m, prop) {
        return data[prop] || prop;
    });
}