import { useAnimalContext } from "../../Context/AnimalContext";
import ProfilePage from "./ProfilePage";

export default function ProfilePageContainer(){
    const { userData, updateUserInfo } = useAnimalContext()
    return <ProfilePage data={userData} updateUserInfo={updateUserInfo}/>
}