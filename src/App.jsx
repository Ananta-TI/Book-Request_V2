import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookRequest from "./pages/BookRequest";
import ModuleRequest from "./pages/ModuleRequest";
import DataRequest from "./pages/DataRequest";
import AdminRequests from "./pages/AdminRequests";
import GrafikRequest from "./pages/GrafikRequest";
import BukuReferensi from "./pages/BukuReferensi";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/request/book"
        element={
          <RoleRoute allowedRoles={["mahasiswa", "staf_akademik"]}>
            <BookRequest />
          </RoleRoute>
        }
      />

      <Route
        path="/request/module"
        element={
          <RoleRoute allowedRoles={["mahasiswa", "staf_akademik"]}>
            <ModuleRequest />
          </RoleRoute>
        }
      />

      <Route
        path="/data-request"
        element={
          <ProtectedRoute>
            <DataRequest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/requests"
        element={
          <RoleRoute allowedRoles={["staf_perpus"]}>
            <AdminRequests />
          </RoleRoute>
        }
      />

      <Route
        path="/grafik-request"
        element={
          <RoleRoute allowedRoles={["staf_perpus"]}>
            <GrafikRequest />
          </RoleRoute>
        }
      />

      <Route
        path="/buku-referensi"
        element={
          <ProtectedRoute>
            <BukuReferensi />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buku-referensi/tambah"
        element={
          <RoleRoute allowedRoles={["staf_perpus"]}>
            <AddBook />
          </RoleRoute>
        }
      />

      <Route
        path="/buku-referensi/edit/:id"
        element={
          <RoleRoute allowedRoles={["staf_perpus"]}>
            <EditBook />
          </RoleRoute>
        }
      />
    </Routes>
  );
}

export default App;