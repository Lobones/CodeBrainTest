const API_URL = 'http://localhost:8080/api/v1'

const get = async params => {
  const res = await fetch(`${params}`)
  return await (res.json() || res.text())
}

const post = async (params, body) => {
  let res = await fetch(`${params}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })

  return res
}

const del = async params => {
  const res = await fetch(`${params}`, { method: 'DELETE' })
  return await res.json()
}

export { get, post, del, API_URL }
