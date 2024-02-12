"use client"
import {useState,useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import {storage} from '@/app/firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '@/app/firebase';
import { doc, setDoc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import ReactPlayer from 'react-player'

const page = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [video,setvideo]=useState(null);
    const [videourl,setvideourl]=useState(null);
    const [url,setUrl]=useState('');

    


const videosubmit=()=>{
  const storage = getStorage();

  const storageRef = ref(storage, `video/${uuidv4()}`);
  
  const uploadTask = uploadBytesResumable(storageRef, video);

  uploadTask.on('state_changed', 
    (snapshot) => {
      
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
    }, 
    () => {
    
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setvideourl(downloadURL);
        toast.success("video added successfully");
      });
    }
  );
  
 }

 const imagesubmit=()=>{
  const storage = getStorage();

  const storageRef = ref(storage, `image/${uuidv4()}`);
  
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on('state_changed', 
    (snapshot) => {
      
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
    }, 
    () => {
    
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUrl(downloadURL);
        toast.success("Image added successfully");
      });
    }
  );
  
 }












      const submitDetails= async ()=>{
        if(!title||!body||!image){
          toast.error("Please fill atlaeast title, body and image")
          return;
        }
  
        try {
          setDoc(doc(db, "blogs",uuidv4()), {
            title:title,
              body:body,
              imageUrl:url,
              videourl:videourl,
              comment:[],
              
          });
    
          toast.success('Blog succesfully created')
           } catch (error) {
              toast.error(error.message)
    
           }



  
 }





  return (
  <>
 <section className="bg-white dark:bg-gray-900 md:h-auto">
  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
      Create new blog
    </h2>
    <form action="#">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Title for the blog"
            required=""
          />
        </div>
        
    
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Your description here"
            defaultValue={""}
          />
        </div>

      <div>

      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload Image</label>
  <input  onChange={(e)=>setImage(e.target.files[0])}  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
  <br/>
  <button onClick={imagesubmit} type="button"className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Click to upload</button>

      </div>

      <div>

<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload Video</label>
<input  onChange={(e)=>setvideo(e.target.files[0])}  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
<br/>
<button onClick={videosubmit} type="button"className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Click to upload</button>

</div>




      </div>
      
   



     <br/>

      <button onClick={submitDetails} type="button"className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Blog</button>

    </form>
  </div>
</section>
<Toaster/>


  
  </>
  

  )
}

export default page
