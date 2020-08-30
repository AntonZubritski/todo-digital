import * as constants from './constants'
import generateId from '../services/generateId'

const initialStateTodo = {
  posts: false,
  visible: false,
  jsonAmount: null,
}
const initialStateChange = {
  addform: {
    title: null,
    body: null,
  },
  edit: false,
}

const todoReducer = (state = initialStateTodo, action) => {
  switch (action.type) {
    case constants.UPDATE_INFO:
      return { ...state, posts: action.payload, jsonAmount: action.amount }
    case constants.SWITCH_VISIBLE:
      return { ...state, visible: action.payload }
    case constants.UPDATE_POSTS:
      return { ...state, posts: [...state.posts, action.payload] }
    case constants.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((el) => el.id !== action.id),
      }
    case constants.PUT_POST:
      return {
        ...state,
        posts: state.posts.map((el) =>
          el.id === action.body.id ? action.body : el
        ),
      }
    default:
      return state
  }
}
const changeReducer = (state = initialStateChange, action) => {
  switch (action.type) {
    case constants.CHANGE_ADD_FORM:
      return {
        ...state,
        addform: {
          ...state.addform,
          [action.name]: action.payload,
          id: generateId(),
          key: `${generateId()}-${action.payload}`,
        },
      }
    case constants.CHANGE_EDIT_FORM:
      return {
        ...state,
        addform: {
          ...state.addform,
          [action.name]: action.payload,
        },
      }
    case constants.EDIT_MODE:
      return { ...state, edit: true }
    case constants.EDIT_ADD_FORM:
      return { ...state, addform: action.post }
    case constants.DELETE_ADD_FORM:
      return { ...initialStateChange }
    default:
      return state
  }
}

export { todoReducer, changeReducer }
