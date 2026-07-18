import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentProfile() {
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    semester: "",
    address: "",
    bio: "",
  });

  const loadProfile = async () => {
    try {
      const res = await API.get(`/student/profile/${studentId}`);
      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        college: res.data.college || "",
        semester: res.data.semester || "",
        address: res.data.address || "",
        bio: res.data.bio || "",
      });
    } catch {
      alert("Failed to load profile");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/student/profile/update/${studentId}`, {
        name: profile.name,
        phone: profile.phone,
        college: profile.college,
        semester: profile.semester,
        address: profile.address,
        bio: profile.bio,
      });

      localStorage.setItem("studentName", profile.name);

      alert("Profile updated successfully");
      navigate("/student/dashboard");
    } catch {
      alert("Profile update failed");
    }
  };

  useEffect(() => {
    if (!studentId) {
      navigate("/student/login");
      return;
    }

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-pink-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-pink-400">
            My Profile
          </h1>
          <p className="text-gray-300 mt-2">
            View and update your personal details
          </p>
        </div>

        <button
          onClick={() => navigate("/student/dashboard")}
          className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
        >
          Back
        </button>
      </div>

      <form
        onSubmit={updateProfile}
        className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 grid md:grid-cols-2 gap-4"
      >
        <input
          placeholder="Full Name"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <input
          disabled
          placeholder="Email"
          className="p-4 rounded-xl bg-slate-700 text-gray-400 outline-none"
          value={profile.email}
        />

        <input
          placeholder="Phone"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.phone}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
        />

        <input
          placeholder="College"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.college}
          onChange={(e) =>
            setProfile({ ...profile, college: e.target.value })
          }
        />

        <input
          placeholder="Semester"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.semester}
          onChange={(e) =>
            setProfile({ ...profile, semester: e.target.value })
          }
        />

        <input
          placeholder="Address"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.address}
          onChange={(e) =>
            setProfile({ ...profile, address: e.target.value })
          }
        />

        <textarea
          placeholder="Bio"
          className="p-4 rounded-xl bg-slate-700 outline-none md:col-span-2"
          value={profile.bio}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
        />

        <button className="md:col-span-2 bg-pink-500 hover:bg-pink-600 p-4 rounded-xl font-bold">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default StudentProfile;