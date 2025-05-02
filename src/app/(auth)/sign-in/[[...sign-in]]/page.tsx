import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return(
    <div className="mt-24 flex items-center justify-center">
    <SignIn />
    </div>
  )
  
}