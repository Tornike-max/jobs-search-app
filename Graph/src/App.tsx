import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./ui/AppLayout";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PortfolioPage from "./pages/PortfolioPage";
import UserPage from "./pages/UserPage";
import SensitiveInfo from "./pages/SensitiveInfo";
import StetementsPage from "./pages/StetementsPage";
import HireUser from "./features/hire/HireUser";
import PublicationPage from "./pages/PublicationPage";
import CreatePublication from "./features/publication/CreatePublication";
import VacanciesPage from "./pages/VacanciesPage";
import JobDescriptionPage from "./pages/JobDescriptionPage";
import CompanyDescriptionPage from "./pages/CompanyDescriptionPage";
import EditCompanyJobPage from "./pages/EditCompanyJobPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/statements" element={<StetementsPage />} />
          <Route path="/hire/user/:accountId" element={<HireUser />} />
          <Route path="/aboutPage" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/createPortfolio" element={<PortfolioPage />} />

          <Route path="/publication" element={<PublicationPage />} />
          <Route
            path={`/createPublication/:publicationType/:publicationId`}
            element={<CreatePublication />}
          />

          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route
            path="/vacancies/:vacancieId"
            element={<JobDescriptionPage />}
          />

          <Route
            path="/company/:companyId"
            element={<CompanyDescriptionPage />}
          />
          <Route
            path="/company/edit/:editId"
            element={<EditCompanyJobPage />}
          />

          <Route path="/account/:accountId" element={<UserPage />} />
          <Route path="/profile/:curAccountId" element={<SensitiveInfo />} />
        </Route>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
