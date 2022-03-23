import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import {
  createarticle,
  deletearticle,
  listarticles,
  updatearticle,
} from '../actions/articleActions'

const AddArticle = () => {
  const initialState = {
    author: '',
    title: '',
  }
  const [newArticle, setNewArticle] = useState(initialState)
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()

  const { articles } = useSelector((state) => ({ ...state.articleList }))

  useEffect(() => {
    dispatch(listarticles())
  }, [dispatch])

  const addArticle = (e) => {
    e.preventDefault()
    if (edit === false) {
      dispatch(
        createarticle({
          id: uuidv4(),
          ...newArticle,
        }),
      )
    }
    if (edit === true) {
      dispatch(updatearticle(newArticle))
    }
    setNewArticle(initialState)
    // console.log({ ...newArticle, id: uuidv4() })
  }

  const removeArticle = (id) => {
    if (window.confirm('Are you sure to want to delete this article?')) {
      dispatch(deletearticle(id))
      setNewArticle(initialState)
      setEdit(false)
    }
  }

  const EditArticle = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/articles/${id}`)
    setNewArticle({ ...data })
    setEdit(true)
  }

  const displayData = () =>
    articles && articles.length ? (
      articles.map((article) => {
        return (
          <li
            key={article.id}
            className="list-group-item list-group-item-light d-flex justify-content-between"
          >
            <span>
              Article Author: <strong>{article.author}</strong>
            </span>
            <span>
              Article Title: <strong>{article.title}</strong>
            </span>
            <span>
              <span
                onClick={() => EditArticle(article.id)}
                className="btn btn-warning btn-sm mx-2"
              >
                &#9998;
              </span>
              <span
                onClick={() => removeArticle(article.id)}
                className="btn btn-danger btn-sm mx-2"
              >
                x
              </span>
            </span>
          </li>
        )
      })
    ) : (
      <p className="text-center">
        No article published at the moment. Publish one!
      </p>
    )

  return (
    <main role="main">
      <div className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Articles</h1>
          <p>Publish an article</p>
          <form className="form-inline justify-content-center">
            <div className="form-group">
              <input
                value={newArticle.author}
                type="text"
                className="form-control ml-3"
                placeholder="Author"
                required
                onChange={(e) =>
                  setNewArticle({ ...newArticle, author: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <input
                value={newArticle.title}
                className="form-control ml-3"
                placeholder="Article title"
                required
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <button
                onClick={addArticle}
                className="btn btn-outline-secondary ml-3"
              >
                {edit === false && 'Publish Article'}
                {edit === true && 'Update Article'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container" style={{ minHeight: '270px' }}>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">{displayData()}</ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddArticle
