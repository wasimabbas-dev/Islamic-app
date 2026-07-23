// src/pages/Knowledge/Knowledge.tsx
import React from "react";
import KnowledgeHero from "../../components/knowledge/KnowledgeHero";
import KnowledgeCategories from "../../components/knowledge/KnowledgeCategories";
import FeaturedBooks from "../../components/knowledge/FeaturedBooks";
import PopularArticles from "../../components/knowledge/PopularArticles";
import FeaturedFatwas from "../../components/knowledge/FeaturedFatwas";
import KnowledgeCTA from "../../components/knowledge/KnowledgeCTA";

const Knowledge = () => {
  return (
    <main className="knowledge-page">
      <KnowledgeHero />
      <KnowledgeCategories />
      <FeaturedBooks />
      <PopularArticles />
      <FeaturedFatwas />
      <KnowledgeCTA />
    </main>
  );
};

export default Knowledge;
