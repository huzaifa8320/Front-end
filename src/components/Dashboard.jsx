import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminDashboard from "../components/AdminDashboard";

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <AdminDashboard />
      </div>
      <Footer />
    </div>
  );
}