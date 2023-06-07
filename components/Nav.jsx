"use client"

import Link from "next/link"
import Image from "next/image"
import Logo from '@public/assets/images/logo.svg'
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders ] = useState(null)

  useEffect(()=>{
    const setProviders = async ()=>{
      const res = await getProviders()

      setProviders(res)
    }

    setProviders()
  })
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className="flex gap-2 flex-center">
        <Image 
        src={Logo}
        width={30}
        height={30}
        className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>


      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>
          <button className="outline_btn" onClick={signOut} type="button">
            Sign Out
          </button>

          <Link href="/profile">
            <Image src={Logo}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"/>
          </Link>
        </div>
        ) : (
        <></>
        )}
      </div>
    </nav>
  )
}

export default Nav