"use client"


import React from 'react'
import Link from 'next/link'
import { auth } from '@/app/firebase';
import { getAuth, onAuthStateChanged,updateProfile } from "firebase/auth";


const Header = () => {
  const [user, setUser] = React.useState(null);



React.useEffect(()=>{
onAuthStateChanged(auth,user=>{
  if(user) {setUser(user)
  }
else setUser(null)
})
  },[])

  
console.log(user);
  return (
    <div>
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
  <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
    <Link className="flex-none text-xl font-semibold dark:text-white" href="/">Blogsite</Link>
    <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
    {user?<>
       
     <Link href='/createblog'><button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Blog</button></Link>
    <button type="button"  onClick={()=> auth.signOut()} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Logout</button>

      </>:<>
      <Link href='/login'><button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Login</button></Link>
     <Link href='/signup'><button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Signup</button></Link>

      </>}

    </div>
  </nav>
</header>
      
    </div>
  )
}

export default Header
