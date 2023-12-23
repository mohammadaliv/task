import { useEffect, useState } from "react";

function Cities() {
  const token = localStorage.getItem("token");

  const [provinces, setProvinces] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "http://rezayari.ir:5050/CityAndProvince/GetProvince";

    const fetchDataProvinces = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProvinces(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDataProvinces();
  }, [token]);
  useEffect(() => {
    const urlStates = "http://rezayari.ir:5050/CityAndProvince/GetCity";

    const fetchDatastates = async () => {
      try {
        const response = await fetch(urlStates, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStates(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDatastates();
  }, [token]); // Empty dependency array to run the effect once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      {" "}
      <div>
        <h2>List of Provinces:</h2>
        <ul>
          {provinces.map((province) => (
            <li key={province.id}>{province.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>List of Provinces:</h2>
        <ul>
          {states.map((state, i) => (
            <li key={i}>{state.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cities;
