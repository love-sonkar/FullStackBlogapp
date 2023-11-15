import toast from "react-hot-toast"
import DataBase from "../../appwrite/dbconfig"

export const FetchSinglePost=async(id)=>{
    try {
        const getData =await DataBase.GetSinglePost(id)
   
        if(getData){
            return getData;
        }else{
            toast.error("somthing went Wrong")
        }
    } catch (error) {
        console.log(error)
    }
}