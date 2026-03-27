import { useState, useEffect } from "react";
import axios from "axios";

function UserDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu/today")
      .then(res => setMenuItems(res.data.items));
  }, []);

  const submit = async () => {
    try {
      await axios.post("http://localhost:5000/api/feedback/add", {
        username: user.username,
        ratings,
        comment
      });

      alert("Submitted");
    } catch {
      alert("Already submitted today");
    }
  };

  return (
    <div className="container">
      <h2>Give Feedback</h2>

      {menuItems.length === 0 && <p>No menu today</p>}

      {menuItems.map(item => (
        <div key={item}>
          <h4>{item}</h4>

          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              className={star <= (ratings[item] || 0) ? "star filled" : "star"}
              onClick={() => setRatings({ ...ratings, [item]: star })}
            >
              ★
            </span>
          ))}
        </div>
      ))}

      <input placeholder="Comment" onChange={e => setComment(e.target.value)} />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default UserDashboard;