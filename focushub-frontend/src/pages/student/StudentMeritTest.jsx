import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

function StudentMeritTest() {
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");

  const questions = [
    {
      q: "Java is mainly used for?",
      options: ["Cooking", "Programming", "Painting", "Gaming only"],
      answer: "Programming",
    },
    {
      q: "HTML is used to create?",
      options: ["Database", "Web pages", "Operating System", "Antivirus"],
      answer: "Web pages",
    },
    {
      q: "Which one is a database?",
      options: ["React", "MySQL", "CSS", "HTML"],
      answer: "MySQL",
    },
    {
      q: "React is used for?",
      options: ["Frontend UI", "Database", "Hardware", "Networking"],
      answer: "Frontend UI",
    },
    {
      q: "Spring Boot is used for?",
      options: ["Backend APIs", "Photo editing", "Gaming", "Typing"],
      answer: "Backend APIs",
    },
    {
      q: "CSS is used for?",
      options: ["Styling", "Database", "Server", "Compiler"],
      answer: "Styling",
    },
    {
      q: "SQL is used for?",
      options: ["Query database", "Draw image", "Create video", "Play music"],
      answer: "Query database",
    },
    {
      q: "OOP means?",
      options: [
        "Object Oriented Programming",
        "Open Office Program",
        "Online Operating Platform",
        "Object Only Process",
      ],
      answer: "Object Oriented Programming",
    },
    {
      q: "API is used for?",
      options: [
        "Communication between systems",
        "Only drawing",
        "Only typing",
        "Only login page",
      ],
      answer: "Communication between systems",
    },
    {
      q: "GitHub is used for?",
      options: [
        "Code hosting",
        "Cooking food",
        "Video editing only",
        "Making calls only",
      ],
      answer: "Code hosting",
    },
  ];

  const [answers, setAnswers] = useState({});

  const selectAnswer = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value,
    });
  };

  const submitTest = async () => {
    if (!studentId) {
      alert("Please login first");
      navigate("/student/login");
      return;
    }

    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }

    let correct = 0;

    questions.forEach((item, index) => {
      if (answers[index] === item.answer) {
        correct++;
      }
    });

    const score = correct * 10;

    try {
      await API.post("/merit/submit", {
        studentId: Number(studentId),
        score,
      });

      alert("Merit test submitted successfully");
      navigate("/student/dashboard");
    } catch (err) {
      alert(err.response?.data || "Merit test submit failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-yellow-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-yellow-400">
            Student Merit Test
          </h1>
          <p className="text-gray-300 mt-2">
            Complete this test to unlock your dashboard
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700"
          >
            <h2 className="text-xl font-bold mb-4">
              {index + 1}. {item.q}
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              {item.options.map((option) => (
                <button
                  key={option}
                  onClick={() => selectAnswer(index, option)}
                  className={`p-3 rounded-xl text-left border ${
                    answers[index] === option
                      ? "bg-yellow-500 text-slate-900 border-yellow-300"
                      : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={submitTest}
        className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-xl font-bold"
      >
        Submit Test
      </button>
    </div>
  );
}

export default StudentMeritTest;