function Login() {
  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">

      <div className="bg-slate-800 p-8 rounded-xl w-96 shadow-lg">

        <h2 className="text-3xl text-white font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white"
        />

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;