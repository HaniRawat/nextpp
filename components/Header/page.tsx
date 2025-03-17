import { Button } from '@/components/ui/button'
import { Shirt, Sparkle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const isLoggedIn = false
  return (
    <header className='flex flex-row justify-between items-center p-4 md:p-8'>
        <div className='flex '>
          <Shirt className=''/>
          <h1 className='font-extrabold font-4xl'>
        <Link href = "/"> Drip Check</Link>
        </h1>
        </div>

        <div className='flex flex-row'>
            <Sparkle className='animate-pulse'/>
          AI-Powered system </div>
        <div className='flex flex-row gap-2 md:gap-4 '>
          <Button>
            <Link href='sign-in'>Sign In</Link>
          </Button>
          <Button>
            <Link href='sign-in'>Sign Out</Link> 
          </Button>

          
        </div>
    </header>
  )
}

export default Header