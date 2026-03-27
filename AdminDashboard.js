import { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function AdminDashboard() {
  const [menu, setMenu] = useState("");
  const [chartData, setChartData] = useState([]);

  const addMenu = async () => {
    try {
      await axios.post("http://localhost:5000/api/menu/add", {
        items: menu.split(",").map(i => i.trim())
      });

      alert("Menu saved");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const getFeedback = async (date) => {
    const res = await axios.get(`http://localhost:5000/api/feedback/${date}`);

    const result = {};

    res.data.forEach(f => {
      // 🔥 SAFE CHECK (NO CRASH EVER)
      if (!f.ratings || typeof f.ratings !== "object") return;

      Object.entries(f.ratings).forEach(([item, rating]) => {
        if (!result[item]) {
          result[item] = { item, total: 0, count: 0 };
        }

        result[item].total += rating;
        result[item].count += 1;
      });
    });

    const finalData = Object.values(result).map(r => ({
      item: r.item,
      avg: r.count ? (r.total / r.count) : 0
    }));

    setChartData(finalData);
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <h3>Add Menu</h3>
      <input placeholder="Rice, Dal" onChange={e => setMenu(e.target.value)} />
      <button onClick={addMenu}>Upload</button>

      <h3>Select Date</h3>
      <input type="date" onChange={e => getFeedback(e.target.value)} />

      <BarChart width={400} height={300} data={chartData}>
        <XAxis dataKey="item" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="avg" />
      </BarChart>
    </div>
  );
}

export default AdminDashboard;