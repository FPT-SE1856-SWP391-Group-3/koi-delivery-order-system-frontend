import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/CreateOrder.css";

const ServiceSelection = ({ onChange }) => {
  const [packages, setPackages] = useState([{ id: 1, type: "document", length: "", width: "", height: "", weight: "" }]);

  const addPackage = () => {
    setPackages([...packages, { id: packages.length + 1, type: "document", length: "", width: "", height: "", weight: "" }]);
  };

  const deletePackage = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  const updatePackage = (id, field, value) => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg))
    );
  };

  useEffect(() => {
    onChange(packages);
  }, [packages, onChange]);

  return (
    <div className="section">
      <h2>Service Selection</h2>
      {packages.map((pkg, index) => (
        <div className="sectionCompo" key={pkg.id}>
          <label>Package Type</label>
          <select
            value={pkg.type}
            onChange={(e) => updatePackage(pkg.id, "type", e.target.value)}
          >
            <option value="document">Document</option>
            <option value="postal">Postal</option>
          </select>

          <label>Dimensions</label>
          <div className="dimensions">
            <input
              type="text"
              placeholder="Length (cm)"
              value={pkg.length}
              onChange={(e) => updatePackage(pkg.id, "length", e.target.value)}
            />
            <input
              type="text"
              placeholder="Width (cm)"
              value={pkg.width}
              onChange={(e) => updatePackage(pkg.id, "width", e.target.value)}
            />
            <input
              type="text"
              placeholder="Height (cm)"
              value={pkg.height}
              onChange={(e) => updatePackage(pkg.id, "height", e.target.value)}
            />
          </div>

          <label>Total Weight</label>
          <input
            type="text"
            placeholder="0 kg"
            value={pkg.weight}
            onChange={(e) => updatePackage(pkg.id, "weight", e.target.value)}
          />

          <div className="button-row">
            <button className="add-package-btn" onClick={addPackage}>Add Package</button>
            {index > 0 && (
              <button className="delete-package-btn" onClick={() => deletePackage(pkg.id)}>Delete Package</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Xác nhận prop types
ServiceSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ServiceSelection;
