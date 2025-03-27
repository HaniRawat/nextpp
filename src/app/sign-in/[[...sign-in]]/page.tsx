import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <section className='flex justify-center items-center bg-gradient-to-r from-emerald-100 via-emerald-50 to-rose-50'>
    <SignIn />
  </section>
}