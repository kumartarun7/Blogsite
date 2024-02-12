import React from 'react'
import Link from 'next/link'

const Card = (props) => {
  return (
    <div  className="p-7">
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className='relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg  bg-clip-border rounded-xl h-40'><img className="rounded-t-lg object-contain" src={props.url} alt="" /></div>
  
  <div className="p-5">
    <Link href={`/createblog/${props.id}`}>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.title}
      </h5>
    </Link>
    
    <Link
      href={`/createblog/${props.id}`}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Read more
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </Link>
  </div>
</div>

      
    </div>
  )
}

export default Card
