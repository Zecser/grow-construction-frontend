
const data = [
    {
        id: 1,
        title: 'Structurally Secured Foundation',
        description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',`
    },
    {
        id: 2,
        title: 'Personalized Approach',
        description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',`
    },
    {
        id: 3,
        title: 'Trained Professionals',
        description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',`
    },
]

const AboutUsContent = () => {
    return (
        <div className="max-w-[1400px] px-6 py-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {
                data.map((item) => (
                    <div key={item.id} className="border-dashed border-3 border-gray-600 p-4">
                        <h2 className="text-center font-semibold text-xl">Structurally Secured Foundation</h2>
                        <p className="text-justify">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here',</p>
                    </div>

                ))
            }
        </div>
    )
}

export default AboutUsContent