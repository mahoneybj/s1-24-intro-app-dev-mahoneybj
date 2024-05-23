import { useEffect, useState } from "react";
import { earthquakeEarlyWarningSystemInstance } from "../../utils/axios";
import EarthquakeForm from "../forms/EarthquakeForm";

const EarthquakeTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await earthquakeEarlyWarningSystemInstance.get("/earthquakes?amount=100");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = () => fetchData(); // Refetch data when the form is submitted

  return (
    <>
      <EarthquakeForm onFormSubmit={handleFormSubmit} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Magnitude</th>
              <th>Depth</th>
              <th>Duration</th>
              <th>Intensity</th>
              <th>Fault Line</th>
              <th>After Shock ID</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                  <td>{item.magnitude}</td>
                  <td>{item.depth}</td>
                  <td>{item.duration}</td>
                  <td>{item.intensity}</td>
                  <td>{item.fault_line}</td>
                  <td>{item.after_shock_id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default EarthquakeTable;
