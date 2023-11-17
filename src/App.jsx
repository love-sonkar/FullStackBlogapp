import { useEffect, useState } from "react"
import PostItem from "./components/PostItem"
import DataBase from "./appwrite/dbconfig"

const App = () => {
const [post,setPost] = useState(null);
useEffect(() => {
  if(!post){
    DataBase.GetAllPost().then((data)=>setPost(data)).catch(e=>console.log(e))
  }
}, [])
  return (
    <div className='p-4 flex-wrap flex gap-3 items-center justify-center'>
    {post ==null ? <h2>Loading...</h2> : post.documents.length <= 0 ? <h2>No Blog To Show</h2> : post.documents.map((item)=><PostItem key={item.$id} data={item} />)}
    </div>
  )
}

export default App