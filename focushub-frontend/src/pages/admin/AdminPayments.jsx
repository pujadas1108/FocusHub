import { useEffect, useState } from "react";
import API from "../../api/api";

function AdminPayments() {
  const [payments, setPayments] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    studentName: "",
    courseName: "",
    totalAmount: "",
    paidAmount: "",
    remarks: "",
  });

  const [updateAmount, setUpdateAmount] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const loadPayments = async () => {
    try {
      const res = await API.get("/payments/all");
      setPayments(res.data);
    } catch {
      alert("Failed to load payments");
    }
  };

  const createPayment = async (e) => {
    e.preventDefault();

    try {
      await API.post("/payments/create", {
        ...form,
        studentId: Number(form.studentId),
        totalAmount: Number(form.totalAmount),
        paidAmount: Number(form.paidAmount),
      });

      alert("Payment record created");

      setForm({
        studentId: "",
        studentName: "",
        courseName: "",
        totalAmount: "",
        paidAmount: "",
        remarks: "",
      });

      loadPayments();
    } catch {
      alert("Payment creation failed");
    }
  };

  const updatePayment = async () => {
    if (!selectedPaymentId || !updateAmount) {
      alert("Select payment and enter amount");
      return;
    }

    try {
      await API.put(`/payments/update/${selectedPaymentId}/${updateAmount}`);

      alert("Payment updated");

      setSelectedPaymentId(null);
      setUpdateAmount("");
      loadPayments();
    } catch {
      alert("Payment update failed");
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const filteredPayments =
    filter === "ALL"
      ? payments
      : payments.filter((p) => p.paymentStatus === filter);

  const totalCollection = payments.reduce(
    (sum, p) => sum + Number(p.paidAmount || 0),
    0
  );

  const pendingAmount = payments.reduce(
    (sum, p) => sum + Number(p.dueAmount || 0),
    0
  );

  const paidCount = payments.filter((p) => p.paymentStatus === "PAID").length;
  const dueCount = payments.filter((p) => p.paymentStatus !== "PAID").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white p-8">
      <h1 className="text-5xl font-bold text-green-400 mb-8">
        Payment Management
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-green-400 font-bold">Total Collection</h2>
          <p className="text-3xl mt-3">₹{totalCollection}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-red-400 font-bold">Pending Amount</h2>
          <p className="text-3xl mt-3">₹{pendingAmount}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-blue-400 font-bold">Paid Students</h2>
          <p className="text-3xl mt-3">{paidCount}</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h2 className="text-yellow-400 font-bold">Pending Students</h2>
          <p className="text-3xl mt-3">{dueCount}</p>
        </div>
      </div>

      <form
        onSubmit={createPayment}
        className="bg-slate-800 p-6 rounded-2xl grid md:grid-cols-3 gap-4 mb-10 border border-slate-700"
      >
        <input
          placeholder="Student ID"
          className="p-3 rounded bg-slate-700"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        />

        <input
          placeholder="Student Name"
          className="p-3 rounded bg-slate-700"
          value={form.studentName}
          onChange={(e) => setForm({ ...form, studentName: e.target.value })}
        />

        <input
          placeholder="Course Name"
          className="p-3 rounded bg-slate-700"
          value={form.courseName}
          onChange={(e) => setForm({ ...form, courseName: e.target.value })}
        />

        <input
          placeholder="Total Amount"
          type="number"
          className="p-3 rounded bg-slate-700"
          value={form.totalAmount}
          onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
        />

        <input
          placeholder="Paid Amount"
          type="number"
          className="p-3 rounded bg-slate-700"
          value={form.paidAmount}
          onChange={(e) => setForm({ ...form, paidAmount: e.target.value })}
        />

        <input
          placeholder="Remarks"
          className="p-3 rounded bg-slate-700"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
        />

        <button className="md:col-span-3 bg-green-500 hover:bg-green-600 p-3 rounded font-bold">
          Add Payment Record
        </button>
      </form>

      <div className="flex gap-4 mb-6">
        {["ALL", "PAID", "PARTIAL", "DUE"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-5 py-2 rounded-xl ${
              filter === s ? "bg-green-500" : "bg-slate-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredPayments.map((p) => (
          <div
            key={p.paymentId}
            className="bg-slate-800 p-6 rounded-2xl border border-slate-700"
          >
            <h2 className="text-xl font-bold text-blue-400">
              {p.studentName}
            </h2>

            <p className="text-gray-400">Student ID: {p.studentId}</p>
            <p className="mt-3">Course: {p.courseName}</p>
            <p>Total: ₹{p.totalAmount}</p>
            <p>Paid: ₹{p.paidAmount}</p>
            <p>Due: ₹{p.dueAmount ?? 0}</p>

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

            {p.razorpayOrderId && (
              <p className="text-gray-400 text-sm break-all">
                Order ID: {p.razorpayOrderId}
              </p>
            )}

            {p.paymentStatus !== "PAID" && (
              <button
                onClick={() => setSelectedPaymentId(p.paymentId)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
              >
                Manual Update
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedPaymentId && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              Update Payment
            </h2>

            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-3 rounded bg-slate-700 mb-4"
              value={updateAmount}
              onChange={(e) => setUpdateAmount(e.target.value)}
            />

            <button
              onClick={updatePayment}
              className="w-full bg-green-500 p-3 rounded font-bold mb-3"
            >
              Update
            </button>

            <button
              onClick={() => {
                setSelectedPaymentId(null);
                setUpdateAmount("");
              }}
              className="w-full bg-red-500 p-3 rounded font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPayments;