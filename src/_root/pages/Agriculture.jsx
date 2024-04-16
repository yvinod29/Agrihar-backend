import React, { useEffect } from 'react'
import { useGetagriculturesessionQuery } from '../../store/api/AgricultureApi.js';
import { Link } from 'react-router-dom';
  
const Agriculture = () => {
    const { data: agricultures, isError, isLoading, error } = useGetagriculturesessionQuery();
    console.log(agricultures)

    useEffect(() => {
        // Fetch data here if needed
        console.log(agricultures);
      }, [agricultures]);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>;
      }
  return (

    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 ">
        {agricultures && agricultures.AgricultureSession? (
             agricultures.AgricultureSession.map((agriculture)=>{
                return(
                    <>
                    <div key={agriculture._id} className="bg-white p-4 rounded-md shadow-md flex flex-col items-center">
                            <Link to={`/agriclutre/${agriculture._id}`} className="text-center">
                                <div className="relative">
                                    <img src={agriculture.media[0].secureUrl} alt="agriculture Image" className="w-[400px] h-[350px] rounded-md" />
                                    <div className="absolute bottom-0 left-2 right-0 text-left py-2">
                                        
                                    </div>
                                    <h2 className='text-xl font-bold p-1'>{agriculture.farmName}</h2>
                                </div>
                             </Link>
                            {/* Add other details as needed */}
                        </div>
                    </>
                )
             })
        ):(
            <>
                No Data Available
            </>
        )}
         
    </div>
  )
}

export default Agriculture
