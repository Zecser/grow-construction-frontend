import aboutUsImg1 from '../../../../public/images/aboutUsImg1.jpg';

const AboutUsMain = () => {
  return (
    <div className='max-w-[1400px] px-6 py-8 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 place-items-start overflow-hidden'>
        {/* Image Section */}
        <div className='w-full h-72 md:h-[400px] rounded-md overflow-hidden'>
          <img
            src={aboutUsImg1}
            alt="About us"
            className='w-full h-full  object-cover'
          />
        </div>

        {/* Text Section */}
        <div className='w-full'>
          <h1 className='text-lg md:text-2xl font-semibold mb-4'>
            Building with Purpose and Precision
          </h1>
          <p className='text-sm text-justify sm:text-base lg:text-lg mb-4 '>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
          <p className='text-sm text-justify sm:text-base lg:text-lg '>
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many websites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsMain;
