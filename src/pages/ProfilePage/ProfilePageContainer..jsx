import { Navigate } from "react-router";
import { useAnimalContext } from "../../Context/AnimalContext";
import ProfilePage from "./ProfilePage";

export default function ProfilePageContainer(){
    const { userData, updateUserInfo, isLogin, logout } = useAnimalContext()
    return isLogin ? <ProfilePage data={userData} updateUserInfo={updateUserInfo} logout={logout}/>  : <Navigate to={"/"}/>
}