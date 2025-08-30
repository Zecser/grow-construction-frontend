import { serviceCard } from "./ServiceCard";

export default function App() {

    return (
        <div className="min-h-screen flex">
            {/* Main Content */}
            <main className="flex-1 rounded-tl-3xl rounded-bl-3xl p-4 sm:p-8 flex flex-col">
                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 sm:gap-8 gap-8 lg:gap-8 flex-1">
                    {serviceCard.map((service) => (
                        <div
                            key={service.title}
                            className="bg-white rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.15)] p-4 sm:p-6  lg:p-[16px] flex flex-col items-center justify-center"
                        >
                            <div className="flex flex-col items-center justify-center lg:mb-[57px] mb-4 sm:mb-6">
                                {service.icon}
                                <div className="text-center font-medium text-sm mt-2 sm:mt-3 lg:mt-[15px]">{service.title}</div>
                            </div>
                            <div className="flex gap-2 md:self-end lg:self-end xl:self-end xs:flex-wrap xs:justify-center mt-4">
                                <button
                                    className="bg-primary text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5  rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-[#10634a] transition"
                                    onClick={() => console.log(`Edit ${service.title}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-white border border-primary text-primary px-2 sm:px-3 md:px-4 py-1 sm:py-1.5  rounded-full text-xs sm:text-sm md:text-base font-medium hover:bg-[#e6f4ef] transition"
                                    onClick={() => console.log(`Delete ${service.title}`)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                    }
                </div >
            </main >
        </div >
    );
}