const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');

// initialState 
const initialState = {
    loading: false,
    post: {},
    error: ''
}

// create async thunk 
const fetchPost = createAsyncThunk('singlePost/fetch', async (title) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/44');
    const post = await response.json();
    return post;
});

// create single post slice
const singlePost = createSlice({
    name: 'singlePost',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchPost.pending, (state, action) => {
            state.loading = true,
                state.error = ''
        })

        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false,
                state.post = action.payload;
            state.error = ''
        })

        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false,
                state.post = {},
                state.error = action.error.message
        })

    }
})


module.exports = singlePost.reducer;
module.exports.singlePostActions = singlePost.actions;
module.exports.fetchPost = fetchPost;
