function CertificateTemplate({ studentName, score, rank }) {
  return (
    <div className="bg-white text-black p-16 rounded-2xl border-8 border-yellow-500">
      <h1 className="text-5xl font-bold text-center">FocusHub</h1>

      <h2 className="text-3xl text-center mt-6">
        Certificate of Achievement
      </h2>

      <p className="text-center mt-10 text-xl">
        This certificate is awarded to
      </p>

      <h3 className="text-center text-4xl font-bold mt-4">
        {studentName}
      </h3>

      <p className="text-center mt-6 text-lg">
        for successfully completing the examination.
      </p>

      <p className="text-center mt-4 text-lg">
        Score: <b>{score}</b>
      </p>

      <p className="text-center text-lg">
        Rank: <b>{rank}</b>
      </p>

      <div className="mt-16 flex justify-between">
        <div>
          ___________________
          <br />
          Admin Signature
        </div>

        <div>
          ___________________
          <br />
          Director
        </div>
      </div>
    </div>
  );
}

export default CertificateTemplate;