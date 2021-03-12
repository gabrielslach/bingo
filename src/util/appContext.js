import React from 'react';

export default React.createContext({
    date: "",
    userDetails: {},
    loginToken: null,
    login: (userDetails, loginToken) => { },
    logout: () => { }
});