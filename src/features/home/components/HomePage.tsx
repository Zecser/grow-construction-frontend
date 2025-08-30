import useServices from "../hooks/useServices"
import Achievement from "./Achievement"
import HomeContent from "./HomeContent"
import HomeItems from "./HomeItems"
import OurServices from "./OurServices"
import Loading from "./Loading"

const HomePage = () => {
  const { isLoading, fetchServices } = useServices()
  return (
    <>
      {
        isLoading ?
          <Loading />
          :
          (
            <>
              <HomeContent />
              <HomeItems />
              <Achievement />
              <OurServices fetchServices={fetchServices} />
            </>

          )
      }
    </>
  )
}

export default HomePage