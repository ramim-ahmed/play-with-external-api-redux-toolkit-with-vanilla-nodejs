const { configureStore } = require('@reduxjs/toolkit');
const singlePostReducer = require('../slices/singlePost');
const relatedPostReducer = require('../slices/relatedPost');
// create store
const store = configureStore({
    reducer: {
        post: singlePostReducer,
        relatedPost: relatedPostReducer
    }
})

module.exports = store;

