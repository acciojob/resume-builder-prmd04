import {configureStore} from '@reduxjs/toolkit'
import resumeReducer from '../feature/ResumeSlice'

const Store = configureStore({
  reducer:{
    resume:resumeReducer
  }
})

export default Store;