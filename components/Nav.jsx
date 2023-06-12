"use client"

import Link from "next/link"
import Image from "next/image"
import Logo from '@public/assets/images/logo.svg'
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders ] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

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
        <>
        {
          providers &&
          Object.values(providers).map(provider=>{
            <button
            type="button"
            key={provider.name}
            onClick={()=>signIn(provider.id)}
            className="black_btn"
            >
              Sign In
            </button>
          })
        }</>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
             <Image src={Logo}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            onClick={() => setToggleDropdown(prev=>!prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile" className="dropdown_link" onClick={()=>setToggleDropdown(false)}>
                Profile
                </Link>
                <Link  href="/create-prompt" className="dropdown_link" onClick={()=>setToggleDropdown(false)}>
                Create Post
                </Link>
                <button className="black_btn mt-5 w-full" onClick={()=>{
                  setToggleDropdown(false)
                  signOut()
                }} type="button">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
          {providers &&
            Object.values(providers).map(provider=>{
              <button
              type="button"
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className="black_btn"
              >
                Sign In
              </button>
            })}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav