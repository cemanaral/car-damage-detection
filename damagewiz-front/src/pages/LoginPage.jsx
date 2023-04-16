import Footer from "../components/Footer";
import Login from "../components/Login";
function LoginPage() {
  return (
    <div className='bg-[url("https://www.techrepublic.com/wp-content/uploads/2022/09/TR-edge-computing-use-cases.jpeg")] w-full h-full bg-no-repeat bg-cover max-md:bg-sky-300'>
      <h1 className="text-white text-6xl text-center h-20 p-8 ">DamageWiz</h1>
      <div className="flex flex-col min-h-screen">
        <Login />
        <Footer />
      </div>
    </div>
  );
}

export default LoginPage;
