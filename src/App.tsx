import { Toaster } from "@/components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import Login from "./_auth/forms/Login";
import Signup from "./_auth/forms/Signup";
import {
  AddMissingPerson,
  Dashboard,
  MissingDatabase,
  MissingPersonDetails,
  SavedProfiles,
  UpdateMissingPerson,
  UpdateProfile,
} from "./_root/pages";
import PrivateRoutes from "./_root/PrivateRoutes";
import "./globals.css";

function App() {
  return (
    <main className="text-sm">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>

        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="/missing-people" element={<MissingDatabase />} />
          <Route
            path="/missing-people/:id"
            element={<MissingPersonDetails />}
          />

          <Route path="/saved-missing-profiles" element={<SavedProfiles />} />
          <Route path="/add-missing-person" element={<AddMissingPerson />} />
          <Route
            path="/missing-people/update-missing-person/:id"
            element={<UpdateMissingPerson />}
          />

          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
