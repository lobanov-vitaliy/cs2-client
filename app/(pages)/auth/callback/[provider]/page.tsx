import AuthProvider from "./components/AuthProvider";

export default async function LoginPage() {
  return (
    <div className="pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <AuthProvider />
          </div>
        </div>
      </div>
    </div>
  );
}
