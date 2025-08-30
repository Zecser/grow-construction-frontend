import Achievement from "./Achievement"
import HomeContent from "./HomeContent"
import HomeItems from "./HomeItems"
import OurServices from "./OurServices"

const HomePage = () => {
  return (
    <div>
      <HomeContent />
      <HomeItems />
      <Achievement />
      <OurServices />
    </div>
  )
}

export default HomePage