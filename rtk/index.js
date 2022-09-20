const store = require('./app/store');
const { fetchPost } = require('./slices/singlePost');
const { fetchRelatedPost } = require('./slices/relatedPost');
// subscribe store
store.subscribe(() => {
    console.log(store.getState());
})


// dispatch action
store.dispatch(fetchPost()).then(() => {
    store.dispatch(fetchRelatedPost(store.getState().post.post.title));
});