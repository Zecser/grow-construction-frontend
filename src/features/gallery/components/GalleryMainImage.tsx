import galleryImg from '../../../../public/images/galleryImg.jpg'

const GalleryMainImage = () => {
  return (
    <div>
      <img src={galleryImg} alt="image" className='w-full  lg:h-130 object-cover lg:object-center'/>
    </div>
  )
}

export default GalleryMainImage