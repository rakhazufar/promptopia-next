"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
  const {data: session} = useSession()
  const router = useRouter()

  const [posts, setPosts] = useState([])
  useEffect(() => {
    if(session) {
      const fetchData = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`) 
        const data = await res.json()
        console.log("data", data)
   
        setPosts(data)
       }
   
       if (session?.user.id) fetchData()
    } else {
      router.push("/")
    }
  }, [])
  

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
    console.log(post)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("are you sure want to delete this post?")
    console.log(post)

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const updatedPost = posts.filter(p => p._id !== post._id)
        setPosts(updatedPost)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile 
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile