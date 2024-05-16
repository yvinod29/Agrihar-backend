import  { useEffect } from "react";
import { useUserContext } from "../../context/useUserContext";
import { INITIAL_USER } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-scroll";
 import { useGetAgricultureByIdsMutation } from "../../store/api/AgricultureApi";
import RegisteredSession from "../../components/RegisteredSession";

const Profile = () => {
  const { user, setIsAuthenticated, setUser } = useUserContext();
  const navigate = useNavigate();
   const token= localStorage.getItem("token");
 const [GetAgricultureByIds,{data:agricultureFarms}]=useGetAgricultureByIdsMutation();


  useEffect(()=>{
    if (token) {
        fetchData();
        console.log("fetchdata")
     }
  },[])

  const  fetchData = async () => {
           const session=await  GetAgricultureByIds({token});
           console.log(session.data.agricultureFarms);
 
        
  }

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  
  
  const handleSignOut = async (e) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
  };

  return (
    <>
      <div className="mt-20 flex justify-end mr-20">
        <Button onClick={(e) => handleSignOut(e)}>
          <img
            className="w-10 h-10"
            src="/assets/images/logout.png"
            alt="logout"
          />
          Logout
        </Button>
      </div>
      <div className=" flex  flex-col  items-center">
        <div className="flex flex-row  items-center md:gap-7">
          <div className="bg-gray-200 rounded-full w-32 h-32 flex justify-center items-center mb-4">
            <img
              src="/assets/images/avatar.png"
              alt="User Avatar"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <h2 className="text-gray-600">{user.email}</h2>
            <p></p>

          </div>
        </div>
        </div>
      
         

        <h1 className="text-3xl mt-3 font-bold ml-8 mb-6">Hosted Sessions </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 ">

        {agricultureFarms && agricultureFarms.agricultureFarms ? (
          agricultureFarms.agricultureFarms.map((agriclutre) => {
            // Slice the array to include only the first 8 agriclutres
            // Find the earliest and latest event start times
            
            return (
              <div
                key={agriclutre._id}
                className="bg-white p-4 rounded-md shadow-md flex flex-col items-center"
              >
                <Link to={`/agriclutre-host/${agriclutre._id}`} className="text-center">
                  <div className="relative">
                    <img
                      src={agriclutre.media[0].secureUrl}
                      alt="agriclutre Image"
                      className="w-[400px] h-[350px] rounded-md"
                    />
                    <div className="absolute bottom-0 left-2 right-0 text-left py-2">
                      <h2 className="text-3xl font-bold text-white">
                        {agriclutre.instructorFirstName}
                        &apos;s agriclutre Farm
                      </h2>
                    </div>
                  </div>
                    
                </Link>
                 
                 {/* <button onClick={handleEditButton(agriclutre._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md block text-center">EDIT</button> */}
                 {/* Add other details as needed */}
              </div>
            );
          })
          ) : (
          <p>No Farms available</p>
        )}
    
        </div>
        <div>
          <RegisteredSession/>
        </div>
              

     </>
  );
};

export default Profile;