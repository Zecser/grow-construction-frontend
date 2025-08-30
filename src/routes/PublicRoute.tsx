import { Route } from "react-router-dom";
import {
  Home,
  AboutUs,
  Gallery,
  Services,
  ContactUs,
  DetailedService,
} from "../pages/user";
import PublicLayout from "../layouts/PublicLayout";

const PublicRoute = () => (
  <Route element={<PublicLayout />}>
    <Route index element={<Home />} /> {/*Navin*/}
    <Route path="/about" element={<AboutUs />} /> {/*Navin*/}
    <Route path="/services" element={<Services />} /> {/*Saranya*/}
    <Route path="/services/:id" element={<DetailedService />} /> {/*Saranya*/}
    <Route path="/gallery" element={<Gallery />} /> {/*Navin*/}
    <Route path="/contact" element={<ContactUs />} /> {/*Saranya*/}
  </Route>
);

export default PublicRoute;
