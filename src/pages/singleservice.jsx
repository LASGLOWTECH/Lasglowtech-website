import { useParams } from "react-router-dom";
import Services from "../assets/data/serviceslist";
import { Link } from "react-router-dom";
import useAOS from "../hooks/useAos";
import Subscription from "../components/sections/subscription";
const SingleService = () => {

    const refreshAOS = useAOS();
    const { slug } = useParams();

    const service = Services.find((s) => s.link === `/services/${slug}`);

    if (!service) return <div className="text-center py-20">Service not found</div>;

    return (
        <div className="px-6  mx-auto md:px-20 py-16 bg-bgcolor2 text-textcolor">

            <section className="flex flex-col items-center justify-center py-16  mx-auto text-center">
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl text-textcolor2 py-3 font-semibold"
                    data-aos="zoom-up"
                >
                    {service.title}
                </h1>

                {/* Breadcrumb */}
                <div className="mt-5 border border-gray-200 p-3 rounded-full text-textcolor2">
                    <p className="text-base text-violet-600 cursor-pointer">
                        <Link to="/" className="hover:underline">
                            Home
                        </Link>{" "}
                        /{" "}
                        <Link to="/services" className="hover:underline">
                            services
                        </Link>/
                        <Link to={`/services/${slug}`} className="hover:underline">
                            {service.title}
                        </Link>
                    </p>
                </div>
            </section>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center ">

                <div
                    className="md:col-span-2 h-[800px] max-w-full"

                >

                    <img
                        src={service.Picture}
                        alt={service.title}
                        className="w-full max-h-[450px] object-cover rounded-xl mb-10"
                    />
                    {/* Description */}
                    <p className="text-base text-gray-400 md:pr-6 md:text-justify md:mb-10">{service.description}</p>
                </div>


                {service.features && service.features.length > 0 && (
                    <div className="hover:shadow-lg transition duration-300 rounded-xl p-6 text-left h-[600px] w-auto shadow-md shadow-Primarycolor">
                        <h2 className="text-2xl font-semibold text-Secondarycolor mb-4">Key Features</h2>
                        <ul className="space-y-4 list-disc list-inside text-base text-gray-300">
                            {service.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>

                         <Link
                                      to="/contact"
                                      className="inline-block mt-12 px-8 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor shadow-lg text-white font-semibold rounded-full transition-all duration-300"
                                    >
                                      Consult Now
                                    </Link>
                    </div>
                )}


            </div>

            {/* Image */}



            <Subscription />


        </div>
    );
};

export default SingleService;
