"use client"
import toast, { Toaster } from 'react-hot-toast';
import React from 'react'
import Link from 'next/link'
import  { useState } from 'react'
import {auth} from '@/app/firebase'
import { createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [name , setName] = useState("");
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
    
    try {
        console.log(name,email,password);
        const result = await createUserWithEmailAndPassword(auth,email, password)
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
        toast.success('Successfully Signup')
        router.push('/');
        
    } catch (error) {
        toast.error(error.message)
    }

    console.log(name);
     }
    
   




  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
              <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required/>
                  </div>
                  <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/ >
                  </div>
                 
                  <div className="flex items-start">
                     
                  </div>
                  <button type="button"  onClick={handleSubmit} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
<Toaster/>
    </div>
  )
}

export default page
