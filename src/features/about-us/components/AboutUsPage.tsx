import AboutUsAffiliations from "./AboutUsAffiliations"
import AboutUsContent from "./AboutUsContent"
import AboutUsHero from "./AboutUsHero"
import AboutUsMain from "./AboutUsMain"
import Achievement from "./Achievement"

const AboutUsPage = () => {
  return (
    <div>
      <AboutUsMain />
      <Achievement/>
      <AboutUsHero/>
      <AboutUsAffiliations/>
      <AboutUsContent/>
    </div>
  )
}

export default AboutUsPage