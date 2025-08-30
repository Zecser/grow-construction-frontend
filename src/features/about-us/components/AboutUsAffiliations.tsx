const AboutUsAffiliations = () => {
    return (
        <div className="max-w-[1400px] px-6 py-8 mx-auto">
            <div>
                <h1 className="text-3xl font-semibold mb-2">Our Affiliations</h1>
                <p className="text-gray-700">
                    Affiliated with trusted industry bodies and certified for quality.
                </p>
            </div>

            <div className="sm:flex items-center my-2">
                {/* Left title */}
                <div className=" py-2 min-w-30  h-full">
                    <h2 className="text-2xl font-semibold pb-2 border-b  border-green-600">Why Us</h2>
                </div>

                {/* Right paragraph */}
                <div className=" sm:pl-6 sm:border-l-2 sm:border-green-600">
                    <p className="text-sm xl:text-lg text-justify leading-relaxed text-gray-700">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsAffiliations;
