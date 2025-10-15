
import useAOS from "../../hooks/useAos";
;


import Team1 from "../../assets/data/Teamlist.jsx";


const Team = () => {
    const refreshAOS = useAOS();



    return (<>
       

<div className="flex mt-20e mb-20 md:mb-3 flex-col items-center h-[300px] justify-center ">


<h3 className="text-4xl pt-6 font-bold text-gray-100  ">Our Team</h3>
<div className="border-2 my-2  border-orangeRed   mx-auto rounded-md w-[100px] "></div>
<p className=" container  py-6 px-6 text-greyBlack mx-auto max-w-2xl text-gray-100 leading-tight text-[18px] text-center">Meet the creative

and innovative minds behind our success. Our team is dedicated to delivering exceptional results and pushing the boundaries of what's possible.
                </p>

</div>





        <section className="  ">
            <div className="  container pt-10 mx-auto grid  gap-3 grid-cols-1 px-6   md:grid-cols-3 ">

                {/* first grid item */}

                {Team1.map((team, index)=>{
    return(
        <div className=" shadow-md hover:scale-110  duration-500 " data-aos="zoom-in-up" key={index}>
        <div className="  ">
            <img src={team.photo} alt="vita" className="w-[150px] h-[150px] mx-auto -mt-10 rounded-[100%]  bg-white shadow-md   " />

            <div className="flex flex-col justify-center items-center py-2 ">
                <div className="flex flex-col  items-center">
                    <p className="text-l font-bold text-darkBlue  pt-3 ">
                       {team.Name}  </p>
                    <p className="text-[16px]  text-gray-600  text-center pt-1 pb-10 font-thin ">
                        {team.Position} </p>
                </div>


          
              
            </div>




           
        </div>


    </div>


    )
})}

               


            </div>



            {/* end of grid */}






        </section>
    </>

    )
}


export default Team;