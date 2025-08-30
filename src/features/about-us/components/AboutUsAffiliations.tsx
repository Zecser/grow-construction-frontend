const AboutUsAffiliations = () => {
    return (
        <div className="max-w-[1400px] px-6 py-8 mx-auto">
            <div>
                <h1 className="text-2xl font-semibold mb-2">Our Affiliations</h1>
                <p className="text-gray-700">
                    Affiliated with trusted industry bodies and certified for quality.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-10 gap-2 xl:gap-10 items-center">
                {/* Left title */}
                <div className="xl:col-span-1 xl:border-r-2 border-green-600 py-2 xl:py-6  h-full">
                    <h2 className="text-2xl font-semibold border-b pb-2 border-green-600">Why Us</h2>
                </div>

                {/* Right paragraph */}
                <div className="xl:col-span-9 ml-4">
                    <p className="text-sm xl:text-xl text-justify leading-relaxed text-gray-700">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsAffiliations;
