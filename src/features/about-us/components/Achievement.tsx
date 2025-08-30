import achievementImg1 from '../../../../public/images/achievementImg1.jpg'
import achievementImg2 from '../../../../public/images/achievementImg2.png'
import CountUp from "react-countup";
const Achievement = () => {
    return (
        <div>
            <div className='relative'>
                <div className='w-full h-120  overflow-hidden'>
                    <img src={achievementImg1} alt="achievementImg1" className='w-full h-full' />
                </div>
                <div className='absolute top-0  grid grid-cols-1  place-items-center w-full sm:grid-cols-2  sm:top-10 p-4 gap-6 '>
                    <img src={achievementImg2} alt="achievementImg2" className='w-100 h-80 ' />
                    <div className='flex gap-8 text-white '>
                        <div>
                            <p className='text-xl mb-2'>Workers</p>
                            <p className='text-4xl font-bold'>
                                <CountUp
                                    start={0}
                                    end={100}
                                    duration={8}
                                />+
                            </p>
                        </div>
                        <div>
                            <p className='text-xl mb-2'>Workers</p>
                            <p className='text-4xl font-bold'>
                                <CountUp
                                    start={0}
                                    end={100}
                                    duration={8}
                                />+
                            </p>
                        </div>
                        <div>
                            <p className='text-xl mb-2'>Workers</p>
                            <p className='text-4xl font-bold'>
                                <CountUp
                                    start={0}
                                    end={100}
                                    duration={8}
                                />+
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievement