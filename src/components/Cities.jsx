import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./Cities.module.css";
import { Box } from "@mui/material";

function Cities() {
  const token = localStorage.getItem("token");

  const [provinces, setProvinces] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(` ${response.status}: خطا با کد`);
        }

        const data = await response.json();
        setter(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const provincesUrl = "http://rezayari.ir:5050/CityAndProvince/GetProvince";
    const statesUrl = "http://rezayari.ir:5050/CityAndProvince/GetCity";

    fetchData(provincesUrl, setProvinces);
    fetchData(statesUrl, setStates);
  }, [token]);

  const filteredStates = states.filter(
    (state) => !selectedProvince || state.provinceId === selectedProvince.id
  );

  const handleProvinceChange = (event, value) => {
    setSelectedProvince(value);

    setSelectedState(null);
  };

  const handleStateChange = (event, value) => {
    setSelectedState(value);

    setSelectedProvince(
      provinces.find((province) => province.id === value.provinceId)
    );
  };

  if (loading) {
    return <div>در حال بار گذاری</div>;
  }

  if (error) {
    return <div>خطا {error} </div>;
  }

  return (
    <div dir="rtl">
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Autocomplete
          disablePortal
          id="provinces-autocomplete"
          options={provinces}
          getOptionLabel={(option) => option.name}
          value={selectedProvince}
          onChange={handleProvinceChange}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="استان" />}
        />

        <Autocomplete
          disablePortal
          id="states-autocomplete"
          options={filteredStates}
          getOptionLabel={(option) => option.name}
          value={selectedState}
          onChange={handleStateChange}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="شهر" className="" />
          )}
        />
      </Box>
    </div>
  );
}

export default Cities;
