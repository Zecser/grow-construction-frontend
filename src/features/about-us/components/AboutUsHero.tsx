const content = [
  {
    title: "WHAT WE DO",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use",
    colSpan: "md:col-span-2",
  },
  {
    title: "OUR HISTORY",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-",
  },
  {
    title: "OUR MISSION",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-",
  },
  {
    title: "OUR VISION",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use",
    colSpan: "md:col-span-2",
  },
];

const AboutUsHero = () => {
  return (
    <div className="max-w-[1400px] px-6 py-8 mx-auto grid grid-cols-1 w-full md:grid-cols-3 gap-4 lg:gap-6 text-center">
      {content.map((item, idx) => (
        <div
          key={idx}
          className={`bg-input py-4 px-8 rounded-lg ${item.colSpan || ""} 
            transition-transform duration-300 ease-in-out transform hover:scale-103 hover:shadow-lg`}
        >
          <h1 className="font-bold mb-2">{item.title}</h1>
          <p className="text-justify text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUsHero;
