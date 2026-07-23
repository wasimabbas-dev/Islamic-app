// src/app/router/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "../../layout/Layout";

// Pages
import Home from "../../pages/Home/Home";
import Login from "../../pages/Auth/Login";
import Signup from "../../pages/Auth/Signup";
import Questions from "../../pages/Questions/Questions";
import Quran from "../../pages/Quran/Quran";
import Hadith from "../../pages/Hadith/Hadith";
import Scholars from "../../pages/Scholars/ScholarsDirectory";
import About from "../../pages/About/About";
import Knowledge from "../../pages/Knowledge/Knowledge";

// Knowledge Sub-pages (create these for full functionality)
import Books from "../../pages/Knowledge/Books";
import Articles from "../../pages/Knowledge/Articles";
import Fatwas from "../../pages/Knowledge/Fatwas";
import ScholarsList from "../../pages/Knowledge/ScholarsList";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/qa" element={<Questions />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/hadith" element={<Hadith />} />
        <Route path="/scholars" element={<Scholars />} />

        {/* Knowledge Routes */}
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/knowledge/books" element={<Books />} />
        <Route path="/knowledge/articles" element={<Articles />} />
        <Route path="/knowledge/fatwas" element={<Fatwas />} />
        <Route path="/knowledge/scholars" element={<ScholarsList />} />

        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
