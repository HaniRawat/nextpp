import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Shirt, Sparkle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  
  return (
    <header className='flex flex-row justify-between items-center p-4 md:p-8 mx-auto flex-1 w-full '>
        <div className='flex gap-1 '>
          <Shirt />
          <h1 className='font-extrabold '>
        <Link href = "/"> Drip Check</Link>
        </h1>
        </div>

        <div className='flex flex-row '>
          <Badge className='p-2 md:p-3 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-rose-400 text-white'>
            <Sparkle className=' animate-pulse'/>
          <h3>Ai Powered System</h3>
          </Badge>
        </div>
        
        <div className='flex flex-row gap-2 md:gap-4 '>
          <SignedIn>
            <div className='flex flex-row gap-2 md:gap-4 '>
              <Button className='bg-gradient-to-r from-rose-500 to-rose-400 rounded-full'>
                <Link href='/saved'>Saved</Link>
              </Button>
            <UserButton />
            </div>
            
          </SignedIn>
          
          <SignedOut>
            <SignInButton />
          </SignedOut>

        </div>
    </header>
  )
}

export default Header