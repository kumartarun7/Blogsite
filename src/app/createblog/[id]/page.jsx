
"use client"

import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
// import ReactPlayer from 'react-player';



import { collection, query, docs, where,doc, getDocs,updateDoc,getDoc  } from "firebase/firestore";
import {db,auth} from '@/app/firebase'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });





const page = ({params}) => {


  const [user, setUser] = React.useState(null);



React.useEffect(()=>{
onAuthStateChanged(auth,user=>{
  if(user) {setUser(user)
  }
else setUser(null)
})
  },[])
      
     
    async function fetchdata(){

        const docRef = doc(db, "blogs",params.id);
        var data={};
        const docsSnap = await getDoc(docRef);
         
           data=docsSnap.data();
              return data;
            }

            const [userdata,setuserdata]=useState({});



            const [comment,setcomment]=useState('');
            const [c,sc]=useState([]);
          

     useEffect(()=>{
        async function getUserData(){


        const data= await fetchdata();
        setuserdata(data);
        sc(data.comment)

        }
        
        getUserData();
        

     },[])


    

     async function update(){

      const washingtonRef = doc(db, "blogs", params.id);

        const docSnap = await getDoc(washingtonRef);
        var Comment= docSnap.data().comment;
        Comment=[...Comment,comment]
         
         
        await updateDoc(washingtonRef, {
         comment: Comment
       });


        console.log(docSnap.data().comment)
        sc(Comment);
     }


  return (
    <div className='p-20' >
    

    
  <h2 className="text-4xl mb-10 font-extrabold dark:text-white">
   {userdata.title}
  </h2>
  

  <div className='flex flex-wrap justify-evenly'>
  <img className="h-auto w-auto rounded-lg my-20" src={userdata.imageUrl} alt="image description"/>
  <div className='my-20'>  <ReactPlayer width='auto' height='400px' controls={true} url={userdata.videourl} />
</div>

</div>
  



  <p className="mb-4 text-lg font-mono text-gray-500 dark:text-gray-400">
    {userdata.body}
  </p>
 
<br/>
<br/>
<br/>








  
  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
  <textarea id="message" onChange={(e)=>setcomment(e.target.value)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
  <br/>

{user?<>
  <button type="button" onClick={update}  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add comment</button>
</>:<>
</>

}

   <br/>
    

{

c.map((item)=>(
  <>
  <h6 class="text-lg font-mono  dark:text-white">User</h6>
<p class="text-gray-500 dark:text-gray-400">{item}</p>
<br/>
  </>
))


}

     



      
    </div>
  )
}

export default page
