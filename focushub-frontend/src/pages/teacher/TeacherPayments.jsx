import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function TeacherPayments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  const loadPayments = async () => {
    try {
      const res = await API.get("/payments/all");
      setPayments(res.data);
    } catch (err) {
      alert("Failed to load payments");
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-green-400">
          Student Payment Status
        </h1>

        <button
          onClick={() => navigate("/teacher/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      {payments.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-2xl">
          <p className="text-gray-400">No payment records found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {payments.map((p) => (
            <div key={p.paymentId} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl font-bold text-blue-400">
                {p.studentName}
              </h2>

              <p className="text-gray-400">Student ID: {p.studentId}</p>
              <p className="mt-3">Course: {p.courseName}</p>
              <p>Total: ₹{p.totalAmount}</p>
              <p>Paid: ₹{p.paidAmount}</p>
              <p>Due: ₹{p.dueAmount}</p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={
                    p.paymentStatus === "PAID"
                      ? "text-green-400"
                      : p.paymentStatus === "PARTIAL"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {p.paymentStatus}
                </span>
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Due Date: {p.dueDate}
              </p>

              {p.paymentMethod && (
                <p className="text-gray-400 text-sm">
                  Method: {p.paymentMethod}
                </p>
              )}

              {p.transactionId && (
                <p className="text-gray-400 text-sm break-all">
                  Transaction: {p.transactionId}
                </p>
              )}

              {p.razorpayPaymentId && (
                <p className="text-gray-400 text-sm break-all">
                  Razorpay ID: {p.razorpayPaymentId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherPayments;