"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams, useSearchParams} from 'next/navigation'

import Profile from '@components/Profile'

const OtherProfile = () => {
  const {data: session} = useSession()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const name = searchParams.get("name")

  console.log(params.id)

  const [posts, setPosts] = useState([])
  useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`/api/users/${params.id}/posts`) 
        const data = await res.json()
        console.log("data", data)
   
        setPosts(data)
       }
   
      fetchData()
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
      name={name}
      desc={`This is ${name} profile`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default OtherProfile