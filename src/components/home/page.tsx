import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className='flex flex-col relative items-center justify-center mx-auto'>
        <h1 className='font-bold py-6 text-center text-xl md:text-3xl'>Weather Meets Style - AI Picks Your Best Outfit Every Day</h1>

        <h2 className='sm:text-xl px-4 md:px-0 text-center text-gray-600'>Rain or shine, always dress right! AI-powered outfit picks just for you.</h2>

        <div>
            <Button variant={'link'} className='text-white mt-6 lg:mt-16 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 font-bold hover:no-underline shadow-lg transition-all duration-300'>
                <Link href='/' className='flex gap-2 items-center'>
                    <span>Try Drip Check</span>
                    <ArrowRight className='animate-pulse'/>
                </Link>
            </Button>
        </div>

    </section>
  )
}

export default HeroSection