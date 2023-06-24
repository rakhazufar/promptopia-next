'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({data, handleTagClick})=> {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={()=>handleTagClick && handleTagClick(post.tag)}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [tempPosts, setTempPosts]  = useState([])
  const [debouncedQuery, setDebouncedQuery] = useState('')


  // const filterPost = ()=>{
  //   const filteredPosts = posts.filter(post => 
  //     post.creator.username.includes(debouncedQuery)
  //     || post.prompt.includes(debouncedQuery)
  //     || post.tag.includes(debouncedQuery)
  //   )
  //   setTempPosts(filteredPosts)
  // }

  const handleClickTag = (tag) => {
    setSearchText(tag)
  }

  const handleSearchChange = (e)=>{
    setSearchText(e.target.value)
    // console.log(debouncedQuery)
    // console.log(posts)
  }

  useEffect(()=>{
      // const timeout = setTimeout(()=>{
      //   setDebouncedQuery(searchText)
      //   filterPost()
      // }, 500)
      
      // return ()=>{
      //   clearTimeout(timeout)
      // }
      const filteredPosts = posts.filter(post => 
        post.creator.username.toLowerCase().includes(searchText.toLowerCase())
        || post.prompt.toLowerCase().includes(searchText.toLowerCase())
        || post.tag.toLowerCase().includes(searchText.toLowerCase())
      )
      setTempPosts(filteredPosts)
  }, [searchText])

  useEffect(() => {
    const fetchData = async () => {
     const res = await fetch("/api/prompt") 
     const data = await res.json()
     setTempPosts(data)
     setPosts(data)
    }

    fetchData()
  }, [])
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-centar'>
        <input
        type="text"
        placeholder='Search prompt or a tag...'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>

      <PromptCardList
      data={tempPosts}
      handleTagClick={handleClickTag}
      />
    </section>
  )
}

export default Feed