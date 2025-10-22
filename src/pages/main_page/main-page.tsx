import HeroSection from "@/components/custom/main_page/hero_section";
import CategoriesSection from "@/components/custom/main_page/category_section";
import FeaturesSection from "@/components/custom/main_page/feature_section";
import EndHeroSection from "@/components/custom/main_page/end_hero_section";
import MyHeader from "@/components/custom/common/header";
import MyFooter from "@/components/custom/common/footer";

export function MainPage() {
  return (
    <div className="min-h-screen flex flex-col fill-black">
      <MyHeader/>
      <HeroSection/>
      <CategoriesSection/>
      <FeaturesSection/>
      <EndHeroSection/>
      <MyFooter/>
    </div>
  );
}