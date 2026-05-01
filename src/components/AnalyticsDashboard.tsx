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

  const totalStudyTime = sessions.reduce((sum, s) => sum + s.duration, 0);

  const avgSessionTime = sessions.length
  ? Math.round(totalStudyTime / sessions.length)
  : 0;

  const topSubject = subjectData[0]?.subject || "N/A";

  const xpData = Object.entries(xpMap).map(([date, xp]) => ({
    date,
    xp,
  }));
  xpData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const uniqueDays = new Set(sessions.map(s => s.date));
  const studyDays = uniqueDays.size;

  const consistencyScore = sessions.length
  ? Math.round((studyDays / sessions.length) * 100)
  : 0;

  const sessionsPerDay: Record<string, number> = {};

  sessions.forEach((s) => {
    sessionsPerDay[s.date] = (sessionsPerDay[s.date] || 0) + 1;
  });

  let mostActiveDay = "N/A";
let maxSessions = 0;

Object.entries(sessionsPerDay).forEach(([date, count]) => {
  if (count > maxSessions) {
    maxSessions = count;
    mostActiveDay = date;
  }
});

const sessionsTrend = Object.entries(sessionsPerDay).map(([date, count]) => ({
  date,
  sessions: count,
}));

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
      
      <div className="mt-6 space-y-2 text-sm">
          <p><b>Total Study Time:</b> {totalStudyTime} minutes</p>
          <p><b>Average Session:</b> {avgSessionTime} minutes</p>
          <p><b>Top Subject:</b> {topSubject}</p>
          <p><b>Active Study Days:</b> {studyDays}</p>
          <p><b>Consistency Score:</b> {consistencyScore}%</p>
          <p><b>Most Active Day:</b> {mostActiveDay}</p>
          <p><b>Max Sessions in a Day:</b> {maxSessions}</p>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;