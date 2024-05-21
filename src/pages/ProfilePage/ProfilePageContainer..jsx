import { Navigate } from "react-router";
import { useAnimalContext } from "../../Context/AnimalContext";
import ProfilePage from "./ProfilePage";

export default function ProfilePageContainer(){
    const { userData, updateUserInfo, isLogin, logout, avatarUrl, isAdmin, userInvitations, getInvitations } = useAnimalContext()
    return isLogin ? <ProfilePage 
    data={userData} 
    updateUserInfo={updateUserInfo} 
    logout={logout} 
    avatarUrl={avatarUrl} 
    isAdmin={isAdmin}
    invitations={userInvitations}
    getInvitations={getInvitations}
    />  : <Navigate to={"/"}/>
}