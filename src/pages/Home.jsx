import { products, pillars } from '../data/products';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import StatementBlock from '../components/StatementBlock';
import PillarsGrid from '../components/PillarsGrid';
import NewsletterForm from '../components/NewsletterForm';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <CustomCursor />
      <Hero />
      <ProductGrid products={featuredProducts} title="FEATURED COLLECTION" />
      <StatementBlock
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1360&h=907&fit=crop"
        eyebrow="OUR PHILOSOPHY"
        title="INTENTIONAL DESIGN — EVERYTHING WE DO STARTS WITH WHY"
        text="We don't chase trends. We build for the athlete who shows up before sunrise. Every stitch, every seam, every fabric choice serves a purpose. This is not fashion. This is function elevated."
        imagePosition="full"
      />
      <PillarsGrid pillars={pillars} />
      <NewsletterForm />
      <Footer />
    </>
  );
}
