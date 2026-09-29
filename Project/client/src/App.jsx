import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import GigDetails from "./pages/GigDetails";
import CreateGig from "./pages/CreateGig";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Any authenticated user */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>

        {/* Freelancer only */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={["freelancer"]} />}>
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Route>

        {/* Unknown page */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  );
}

export default App;