import { Routes, Route } from "react-router-dom";

// Layout
// import Layout from "../../layout/Layout";
import Layout from "../../layout/Layout";

// Pages
import Home from "../../pages/Home/Home";
import Login from "../../pages/Auth/Login";
import Questions from "../../pages/Questions/Questions";
// import QuestionDetails from "../../pages/QuestionDetails/QuestionDetails";
// import AskQuestion from "../../pages/AskQuestion/AskQuestion";
import Quran from "../../pages/Quran/Quran";
import Hadith from "../../pages/Hadith/Hadith";
import Scholars from "../../pages/Scholars/ScholarsDirectory";
import Signup from "../../pages/Auth/Signup";
// import Books from "../../pages/Books/Books";
import About from "../../pages/About/About";
// import NotFound from "../../pages/NotFound/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<Layout />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Uncomment these as you create the pages */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/qa" element={<Questions />} />

        {/* <Route path="/questions/:id" element={<QuestionDetails />} /> */}

        {/* <Route path="/ask" element={<AskQuestion />} /> */}

        <Route path="/quran" element={<Quran />} />

        <Route path="/hadith" element={<Hadith />} />

        <Route path="/scholars" element={<Scholars />} />

        {/* <Route path="/books" element={<Books />} /> */}

        <Route path="/about" element={<About />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;