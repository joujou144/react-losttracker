import { Routes, Route } from "react-router-dom";
import "./globals.css";
import Login from "./_auth/forms/Login";
import Signup from "./_auth/forms/Signup";
import AuthLayout from "./_auth/AuthLayout";
import PrivateRoutes from "./_root/PrivateRoutes";
import { Toaster } from "@/components/ui/toaster";
import {
  AddMissingPerson,
  Dashboard,
  MissingDatabase,
  MissingPersonDetails,
  Profile,
  SavedProfiles,
  UpdateMissingPerson,
  UpdateProfile,
} from "./_root/pages";

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
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
