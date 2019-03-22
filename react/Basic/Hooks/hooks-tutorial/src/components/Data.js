import { useState, useEffect } from 'react'

const Data = () => {
  const profile = useFetch(API.fetchProfile)
  const friends = useFetch(API.fetchFriends)

  return (
    <>
      {profile.isLoading ? 'Loading...' : profile.data}
      {friends.isLoading ? 'Loading...' : friends.data}
    </>
  )
}

const useFetch = (func, conditions = []) => {
  const [data, setData] = useState(null)

  const fetch = () => {
    func().then(response => {
      setData(response)
    })
  }

  useEffect(fetch, conditions)

  const isLoading = data == null

  return { data, isLoading }
}
