"use client"

import {db,auth} from '@/app/firebase'
import Card from '@/components/Card';
import { collection, query, docs, where,doc, getDocs,updateDoc,getDoc  } from "firebase/firestore";
import { useEffect, useState} from 'react';



async function fetchdata(){

const colRef = collection(db, "blogs");
const data=[];
const docsSnap = await getDocs(colRef);
 
   docsSnap.forEach(async doc => {
      data.push({id:doc.id,...doc.data()});

      });

      return data;

    }

export default function Home() {


    const [userdata,setuserdata]=useState([]);
     

     useEffect(()=>{
       async  function getUserData(){
        const data= await fetchdata();
         setuserdata(data);
       }

       getUserData();
     },[])


  return (
   <>
   <div className='flex flex-wrap px-20 bg-gray-50 dark:bg-gray-900 h-auto'>
   {

    userdata.map((user)=>(
      <Card   id={user.id} url={user.imageUrl} title={user.title} />

    ))
   }
    </div>

   </>
  );
}
