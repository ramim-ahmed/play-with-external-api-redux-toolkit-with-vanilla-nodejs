const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const fetch = require('node-fetch');
// initialState
const initialState = {
    loading: false,
    relatedPost: [],
    error: ''
}


// create async thunk function
const fetchRelatedPost = createAsyncThunk('relatedPost/fetch', async (title) => {
    const splitTitle = title.split(' ');
    let queryString;
    for (let i = 0; i < splitTitle.length; i++) {
        const element = splitTitle[i];
        queryString += `&title_like=${element}`

    }
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${queryString}`);
    const relatedPost = response.json();
    return relatedPost;
})


// create related post slice
const relatedPost = createSlice({
    name: 'relatedPost',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedPost.pending, (state, action) => {
            state.loading = true;
            state.error = ''
        });

        builder.addCase(fetchRelatedPost.fulfilled, (state, action) => {
            state.loading = false,
                state.relatedPost = action.payload,
                state.error = ''
        });

        builder.addCase(fetchRelatedPost.rejected, (state, action) => {
            state.loading = true,
                state.relatedPost = [],
                state.error = action.error.message
        })
    }
})

module.exports = relatedPost.reducer;
module.exports.relatedPostActions = relatedPost.actions;
module.exports.fetchRelatedPost = fetchRelatedPost;