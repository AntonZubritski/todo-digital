import ApiServices from '../services/api-services'
import {
  UPDATE_INFO,
  ADD_ARTICLES_ERROR,
  SWITCH_VISIBLE,
  CHANGE_ADD_FORM,
  UPDATE_POSTS,
  DELETE_ADD_FORM,
  DELETE_POST,
  EDIT_ADD_FORM,
  CHANGE_EDIT_FORM,
  EDIT_MODE,
  PUT_POST,
} from './constants'

const api = new ApiServices()

export const GetPosts = () => {
  return (dispatch) => {
    api.fetchApi
      .getPosts()
      .then((posts) => {
        dispatch(
          UpdateInfo(
            posts,
            posts.map((post) => post.id)
          )
        )
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}
export const SetPost = (body) => {
  return (dispatch) => {
    api.fetchApi
      .setPost(body)
      .then((post) => {
        dispatch(UpdatePosts(post))
        dispatch(DeleteAddForm())
        dispatch(SwitchVisible())
      })
      .catch((err) => {
        dispatch(AddArticlesErr(err.message))
      })
  }
}

export const DeletePost = (id, jsonAmount) => {
  if (jsonAmount.indexOf(id) !== -1) {
    return (dispatch) => {
      api.fetchApi
        .deletePost(id)
        .then(() => {
          dispatch(DeleteInfoPost(id))
        })
        .catch((err) => {
          dispatch(AddArticlesErr(err.message))
        })
    }
  } else {
    return (dispatch) => {
      dispatch(DeleteInfoPost(id))
    }
  }
}
export const PutPost = (body, jsonAmount) => {
  if (jsonAmount.indexOf(body.id) !== -1) {
    return (dispatch) => {
      api.fetchApi
        .putPost(body)
        .then((post) => {
          dispatch(PutPostTable(post))
          dispatch(DeleteAddForm())
        })
        .catch((err) => {
          dispatch(AddArticlesErr(err.message))
        })
    }
  } else {
    return (dispatch) => {
      dispatch(PutPostTable(body))
      dispatch(DeleteAddForm())
    }
  }
}
const PutPostTable = (body) => ({
  type: PUT_POST,
  body,
})
const DeleteInfoPost = (id) => ({
  type: DELETE_POST,
  id,
})
const UpdatePosts = (payload) => ({
  type: UPDATE_POSTS,
  payload,
})
const UpdateInfo = (payload, amount) => ({
  type: UPDATE_INFO,
  payload,
  amount,
})
const AddArticlesErr = (payload) => ({
  type: ADD_ARTICLES_ERROR,
  payload,
})
export const DeleteAddForm = () => ({
  type: DELETE_ADD_FORM,
})
export const SwitchVisible = (payload) => ({
  type: SWITCH_VISIBLE,
  payload,
})
export const ChangeAddForm = (name, payload, length) => ({
  type: CHANGE_ADD_FORM,
  name,
  length,
  payload,
})
export const ChangeEditForm = (name, payload) => ({
  type: CHANGE_EDIT_FORM,
  name,
  payload,
})
export const EditAddForm = (post) => ({
  type: EDIT_ADD_FORM,
  post,
})
export const EditMode = (post) => ({
  type: EDIT_MODE,
  post,
})
