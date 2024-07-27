import React, { useState, useEffect } from "react";
import vehicleService from "../services/vehicle.service";

const UpdateVehicle = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({
    matricula: "",
    modelo: "",
    marca: "",
    color: "",
    foto: "",
  });

  useEffect(() => {
    // Fetch vehicle models
    const fetchModels = async () => {
      try {
        const response = await vehicleService.getVehicleModels();
        setModels(response);
      } catch (error) {
        console.error("Error fetching vehicle models", error);
      }
    };
    fetchModels();
  }, []);

  const handleModelChange = async (event) => {
    const modelName = event.target.value;
    setSelectedModel(modelName);
    if (!modelName) {
      console.error("Model name is not valid");
      return;
    }
    try {
      const response = await vehicleService.getVehicleByModel(modelName);
      setFormData(response);
    } catch (error) {
      console.error(
        `Error fetching vehicle details for model ${modelName}`,
        error,
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await vehicleService.updateVehicleByModel(selectedModel, formData);
      alert("Vehicle updated successfully");
    } catch (error) {
      console.error("Error updating vehicle", error);
    }
  };

  return (
    <div>
      <h2>Update Vehicle</h2>
      <select onChange={handleModelChange}>
        <option value="">Select a model</option>
        {models.map((model) => (
          <option key={model.id} value={model.modelo}>
            {model.modelo}
          </option>
        ))}
      </select>

      {selectedModel && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="matricula"
            placeholder="Matricula"
            value={formData.matricula || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="modelo"
            placeholder="Modelo"
            value={formData.modelo || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="marca"
            placeholder="Marca"
            value={formData.marca || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="foto"
            placeholder="Foto URL"
            value={formData.foto || ""}
            onChange={handleChange}
          />
          <button type="submit">Update Vehicle</button>
        </form>
      )}
    </div>
  );
};

export default UpdateVehicle;
