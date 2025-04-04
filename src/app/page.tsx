import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
//import MobileHeroSlider from '@/components/MobileHeroSlider';
import FeaturedProducts from '@/components/FeaturedProducts';
import { getProducts, getHeroSlidesFromProducts } from '@/services/product';
import { SECTION_TITLES } from '@/constants/messages';

export const revalidate = 3600; // Revalidate data at most every hour

export default async function Home() {
  const products = await getProducts();
  const heroSlides = await getHeroSlidesFromProducts();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="">
        <HeroSlider slides={heroSlides} />
      </section>
      <section>
        <FeaturedProducts products={products} title={SECTION_TITLES.FEATURED_COLLECTION} />
      </section>
    </main>
  );
}
