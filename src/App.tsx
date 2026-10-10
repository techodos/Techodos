import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import About from "./pages/About";
import BookDemo from "./pages/BookDemo";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Products from "./pages/Products";
import RestaurantPlatform from "./pages/RestaurantPlatform";
import Services from "./pages/Services";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/restaurant-platform" element={<RestaurantPlatform />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book-demo" element={<BookDemo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
