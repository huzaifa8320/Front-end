import Footer from "./Footer";
import Header from "./Header";
import LoanCalculator from "./LoanCalculator";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="bg-blue-50 py-20 text-center">
        <h1 className="text-4xl font-bold text-blue-800">
          Saylani Microfinance App
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Offering loans under the Qarze Hasana program.
        </p>
      </div>
      <div className="container mx-auto p-6">
        <LoanCalculator />
      </div>
      <Footer />
    </div>
  );
}