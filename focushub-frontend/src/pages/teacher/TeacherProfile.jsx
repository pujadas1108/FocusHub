import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function TeacherProfile() {
  const navigate = useNavigate();

  const teacherId = 1;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experience: "",
  });

  const loadProfile = async () => {
    try {
      const res = await API.get(`/teacher/profile/${teacherId}`);

      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        qualification: res.data.qualification || "",
        specialization: res.data.specialization || "",
        experience: res.data.experience || "",
      });
    } catch {
      alert("Failed to load teacher profile");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/teacher/profile/update/${teacherId}`, {
        name: profile.name,
        phone: profile.phone,
        qualification: profile.qualification,
        specialization: profile.specialization,
        experience: Number(profile.experience),
      });

      alert("Teacher profile updated");
      navigate("/teacher/dashboard");
    } catch {
      alert("Profile update failed");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-green-400">
            Teacher Profile
          </h1>
          <p className="text-gray-300 mt-2">
            View and update teacher details
          </p>
        </div>

        <button
          onClick={() => navigate("/teacher/dashboard")}
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
          placeholder="Qualification"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.qualification}
          onChange={(e) =>
            setProfile({ ...profile, qualification: e.target.value })
          }
        />

        <input
          placeholder="Specialization"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.specialization}
          onChange={(e) =>
            setProfile({ ...profile, specialization: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Experience"
          className="p-4 rounded-xl bg-slate-700 outline-none"
          value={profile.experience}
          onChange={(e) =>
            setProfile({ ...profile, experience: e.target.value })
          }
        />

        <button className="md:col-span-2 bg-green-500 hover:bg-green-600 p-4 rounded-xl font-bold">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default TeacherProfile;