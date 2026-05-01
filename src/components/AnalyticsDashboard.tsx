import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line
} from "recharts";
import { useSessions } from "@/hooks/useSessions";

const AnalyticsDashboard = () => {
  const { sessions } = useSessions();

  // Subject Data
  const subjectMap: Record<string, number> = {};
  sessions.forEach((s) => {
    subjectMap[s.subject] = (subjectMap[s.subject] || 0) + s.duration;
  });

  const subjectData = Object.entries(subjectMap).map(([subject, time]) => ({
    subject,
    time,
    
  }));
  subjectData.sort((a, b) => b.time - a.time);

  // XP Data
  const xpMap: Record<string, number> = {};
  sessions.forEach((s) => {
    xpMap[s.date] = (xpMap[s.date] || 0) + s.xpEarned;
  });

  const xpData = Object.entries(xpMap).map(([date, xp]) => ({
    date,
    xp,
  }));
  xpData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-10">

      {/* Bar Chart */}
      <div>
        <h2 className="text-lg font-bold mb-2">Study Time by Subject</h2>
        <BarChart width={700} height={350} data={subjectData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="time" />
        </BarChart>
      </div>
        <p>
            Most studied subject: {subjectData[0]?.subject}
        </p>
      {/* Line Chart */}
      <div>
        <h2 className="text-lg font-bold mb-2">XP Growth Over Time</h2>
        <LineChart width={700} height={350} data={xpData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="xp" />
        </LineChart>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;