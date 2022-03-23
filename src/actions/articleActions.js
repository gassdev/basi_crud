import axios from 'axios'
import {
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_DETAILS_REQUEST,
  ARTICLE_DETAILS_SUCCESS,
  ARTICLE_DETAILS_FAIL,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAIL,
  ARTICLE_CREATE_REQUEST,
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_CREATE_FAIL,
  ARTICLE_UPDATE_REQUEST,
  ARTICLE_UPDATE_SUCCESS,
  ARTICLE_UPDATE_FAIL,
} from '../constants/articleConstants'

export const listarticles = () => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_LIST_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/articles`)

    dispatch({
      type: ARTICLE_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ARTICLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listarticleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/articles/${id}`)

    dispatch({
      type: ARTICLE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ARTICLE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletearticle = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ARTICLE_DELETE_REQUEST,
    })

    await axios.delete(`http://localhost:5000/articles/${id}`)

    dispatch(listarticles())
  } catch (error) {
    dispatch({
      type: ARTICLE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createarticle = (article) => async (dispatch) => {
  try {
    dispatch({
      type: ARTICLE_CREATE_REQUEST,
    })

    await axios.post(`http://localhost:5000/articles`, article, {
      'Content-Type': 'application/json',
    })

    dispatch(listarticles())
  } catch (error) {
    dispatch({
      type: ARTICLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatearticle = (article) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTICLE_UPDATE_REQUEST,
    })

    const { data } = await axios.put(
      `http://localhost:5000/articles/${article.id}`,
      article,
      {
        'Content-Type': 'application/json',
      },
    )

    dispatch(listarticles())
  } catch (error) {
    dispatch({
      type: ARTICLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
