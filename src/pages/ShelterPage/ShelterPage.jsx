
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CREATE_SHELTER_REQUEST_ENPOINT } from "../../endpoints";
import authHeader from "../../auth/auth.headers";
import { WOShelter } from "./components/WOShelter";
import { WShelter } from "./components/WShelter";
import { useMobile } from "../../hooks/useMobile"
import { useNavigate } from "react-router";



export default function ShelterPage({ data, getShelterByID, isVerified, getAllUsers, allUsersInfo }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useProfileData, setUseProfileData] = useState(false);
  const navigation = useNavigate();
  console.log(allUsersInfo)


  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateShelter = async (postData) => {
    try {
      setLoading(true);
      await axios.post(CREATE_SHELTER_REQUEST_ENPOINT, postData, {
        headers: authHeader(),
      });
      setOpenModal(false);
      // Успешное создание приюта, выполняйте необходимые действия
    } catch (error) {
      console.error("Ошибка при создании приюта:", error);
      // Обработка ошибки при создании приюта
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isVerified == true) {
      getAllUsers()
    }
  }, [isVerified])
  
  const isMobile = useMobile()

  return (
    <div className="grid place-content-center h-fit w-full mt-24 flex-1">
        {!data.isVerified &&
         <WOShelter
         setOpenModal={setOpenModal} 
         openModal={openModal}
         handleSubmit={handleSubmit}
         register={register}
         handleCreateShelter={handleCreateShelter} 
         useProfileData={useProfileData}
         setValue={setValue}
         setUseProfileData={setUseProfileData} 
         errors={errors}
         loading={loading}
         data={data}
         />}
         {data.isVerified &&<WShelter
         getShelterByID={getShelterByID}
         data={data}
         isMobile={isMobile}
         navigation={navigation}
         allUsersInfo={allUsersInfo}
         />}
    </div>
  );
}
