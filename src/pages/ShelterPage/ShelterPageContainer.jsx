import { Navigate } from "react-router";
import { useAnimalContext } from "../../Context/AnimalContext";
import ShelterPage from "./ShelterPage";

export default function ShelterPageContainer(){
    const { userShelter, isLogin, getShelterByID, isVerified, getAllUsers, allUsersInfo } = useAnimalContext()
    
    return isLogin ? <ShelterPage 
    data={userShelter} 
    getShelterByID={getShelterByID} 
    isVerified={isVerified} 
    getAllUsers={getAllUsers}
    allUsersInfo={allUsersInfo}
    />  : <Navigate to={"/"}/>
}