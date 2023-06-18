"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
  const {data: session} = useSession()
  console.log("session", session)

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
     const res = await fetch(`/api/users/${session?.user.id}/posts`) 
     const data = await res.json()
     console.log("data", data)

     setPosts(data)
    }

    if (session?.user.id) fetchData()
  }, [])
  

  const handleEdit = () => {

  }

  const handleDelete = async () => {

  }

  return (
    <Profile 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={()=>handleEdit()}
      handleDelete={()=>handleDelete()}
    />
  )
}

export default MyProfile