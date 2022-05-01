import { configureStore } from '@reduxjs/toolkit'
import reducers from '../redux/reducers'

export default configureStore({
    reducer: reducers,
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)