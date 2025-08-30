import homeImg1 from '../../../../public/images/home/homeImg1.png'
import homeImg2 from '../../../../public/images/home/homeImg2.png'
import homeImg3 from '../../../../public/images/home/homeImg3.png'
import homeImg4 from '../../../../public/images/home/homeImg4.png'
import homeImg5 from '../../../../public/images/home/homeImg5.png'
import homeImg6 from '../../../../public/images/home/homeImg6.png'


const items = [
  {
    id: 1,
    title: "PERFECT DESIGN",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: homeImg1
  },
  {
    id: 2,
    title: "CAREFULLY PLANED",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: homeImg2
  },
  {
    id: 3,
    title: "RELIABILITY",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: homeImg3
  },
  {
    id: 4,
    title: "TRUST",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: homeImg4
  },
  {
    id: 5,
    title: "SATISFACTION",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: homeImg5
  },
  {
    id: 6,
    title: "SMARTLY EXECUTED",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
    image: homeImg6
  },
]

const HomeItems = () => {
  return (
    <div className='max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4'>
      {
        items.map((item) => (
          <div key={item.id} className='relative transition-transform ease-in-out hover:scale-105 hover:shadow-lg transform duration-300'>
            <div className='pt-10'>
              <div className='shadow-md border p-8 rounded-tr-xl'>
                <h2 className='text-center mb-2 font-semibold'>{item.title}</h2>
                <p>{item.description} </p>
              </div>
              <div className='w-15 absolute top-0 border-dashed border border-green-500 rounded-full p-2'>
                <img src={item.image} alt="image" className='' />
              </div>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default HomeItems