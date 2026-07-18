import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentPayments() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");

  const [payments, setPayments] = useState([]);

  const loadPayments = async () => {
    try {
      const res = await API.get(`/payments/student/${studentId}`);
      setPayments(res.data);
    } catch {
      alert("Failed to load payments");
    }
  };

  const payNow = async (payment) => {
    try {
      const orderRes = await API.post(
        `/payments/razorpay/order/${payment.paymentId}`
      );

      const order = orderRes.data;

      const options = {
        key: order.key,
        amount: order.amount * 100,
        currency: "INR",
        name: "FocusHub",
        description: payment.courseName,
        order_id: order.orderId,

        handler: async function (response) {
          await API.post("/payments/razorpay/verify", {
            paymentId: payment.paymentId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            paymentMethod: "RAZORPAY",
          });

          alert("Payment Successful");
          loadPayments();
        },

        prefill: {
          name: payment.studentName,
        },

        theme: {
          color: "#22c55e",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      alert(err.response?.data || "Payment failed");
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const latestPayment = payments[payments.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white flex justify-center p-8">
      <div className="w-full max-w-4xl">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-green-400">
              My Payments
            </h1>

            <p className="text-gray-400 mt-2">
              View fee status and payment history
            </p>
          </div>

          <button
            onClick={() => navigate("/student/dashboard")}
            className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
          >
            Back
          </button>
        </div>

        {payments.length === 0 ? (
          <div className="bg-slate-800 p-8 rounded-3xl text-center">
            <p className="text-gray-400">
              No payment records found.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 mb-8">

              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-blue-400">
                    {latestPayment.courseName}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Student ID : {latestPayment.studentId}
                  </p>
                </div>

                <span
                  className={
                    latestPayment.paymentStatus === "PAID"
                      ? "bg-green-500/20 text-green-400 px-4 py-2 rounded-full"
                      : latestPayment.paymentStatus === "PARTIAL"
                      ? "bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full"
                      : "bg-red-500/20 text-red-400 px-4 py-2 rounded-full"
                  }
                >
                  {latestPayment.paymentStatus}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mt-8">

                <div className="bg-slate-900 p-5 rounded-2xl">
                  <p className="text-gray-400">Total Fee</p>
                  <h3 className="text-3xl font-bold mt-2">
                    ₹{latestPayment.totalAmount}
                  </h3>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl">
                  <p className="text-gray-400">Paid Amount</p>
                  <h3 className="text-3xl text-green-400 font-bold mt-2">
                    ₹{latestPayment.paidAmount}
                  </h3>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl">
                  <p className="text-gray-400">Due Amount</p>
                  <h3 className="text-3xl text-red-400 font-bold mt-2">
                    ₹{latestPayment.dueAmount ?? 0}
                  </h3>
                </div>

              </div>

              <div className="bg-slate-900 p-5 rounded-2xl mt-6">

                <p className="text-gray-300">
                  Due Date :
                  <span className="text-white ml-2">
                    {latestPayment.dueDate}
                  </span>
                </p>

                <p className="text-gray-300 mt-3">
                  Remarks :
                  <span className="text-white ml-2">
                    {latestPayment.remarks}
                  </span>
                </p>

                {latestPayment.transactionId && (
                  <p className="text-gray-300 mt-3 break-all">
                    Transaction ID :
                    <span className="text-white ml-2">
                      {latestPayment.transactionId}
                    </span>
                  </p>
                )}
              </div>

              {latestPayment.paymentStatus !== "PAID" ? (
                <button
                  onClick={() => payNow(latestPayment)}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 p-4 rounded-2xl font-bold text-lg"
                >
                  Pay Now (UPI / Card / Net Banking)
                </button>
              ) : (
                <button
                  onClick={() => window.print()}
                  className="w-full mt-6 bg-blue-500 hover:bg-blue-600 p-4 rounded-2xl font-bold text-lg"
                >
                  Download Receipt
                </button>
              )}

            </div>

            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">

              <h2 className="text-2xl font-bold text-green-400 mb-6">
                Payment History
              </h2>

              <div className="space-y-4">

                {payments.map((p) => (
                  <div
                    key={p.paymentId}
                    className="bg-slate-900 p-5 rounded-2xl flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-bold text-blue-400">
                        {p.courseName}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        Due Date : {p.dueDate}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold">
                        ₹{p.totalAmount}
                      </p>

                      <p
                        className={
                          p.paymentStatus === "PAID"
                            ? "text-green-400"
                            : p.paymentStatus === "PARTIAL"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }
                      >
                        {p.paymentStatus}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );

}

export default StudentPayments;