import { Spin } from "antd";

const LoadingScreen = () => {
  return (
    <div className="flex py-5 flex-col justify-center items-center">
      {/* Spinner */}
      <Spin size="large" className="mb-4" />

      {/* Loading Message */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Please Wait...</h1>
      <p className="text-sm sm:text-base text-center">
        We’re getting everything ready for you! 🚀
      </p>
    </div>
  );
};

export default LoadingScreen;
