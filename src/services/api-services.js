export default class ApiServices {
  _urlBase = 'https://my-json-server.typicode.com/antonzubritski/digitaldb'

  //-------------Template for fetchApi
  templateFetch = async (url, method, body) => {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
      throw new Error(`Could not fetch, received ${res.status}`)
    }
    return res.json()
  }
  templatePostsFetch = async (url, method, body) => {
    const res = await this.templateFetch(url, method, body)
    return res.map(this._transformPosts)
  }
  //-------------Template for fetchApi END

  fetchApi = {
    getPosts: () => {
      return this.templatePostsFetch(`${this._urlBase}/posts`, 'GET')
    },
    setPost: (body) => {
      return this.templateFetch(`${this._urlBase}/posts`, 'POST', body)
    },
    deletePost: (id) => {
      return this.templateFetch(`${this._urlBase}/posts/${id}`, 'DELETE')
    },
    putPost: (body) => {
      return this.templateFetch(
        `${this._urlBase}/posts/${body.id}`,
        'PUT',
        body
      )
    },
  }

  //------Transform Function
  _transformPosts = (post) => {
    return {
      id: post.id,
      key: `${post.id}-${Math.floor(Math.random() * Math.floor(100))}`,
      title: post.title,
      body: post.body,
    }
  }
  //------Transform Function END
}
