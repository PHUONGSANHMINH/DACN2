import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import "../CustomDropdown/customdropdown.css";

const CustomDropdown = ({ label, options = [], onSelect }) => {
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = (selectedVal) => {
    setSelectedValue(selectedVal);
    setValue("");
    setShowOptions(false);
    onSelect && onSelect(selectedVal);
  };

  return (
    <>
      {/* <label className="item-search-label"> {label}</label> */}
      <Dropdown
        className="dropdown-custom"
        onSelect={handleClick}
        onToggle={(isOpen) => {
          // if dropdown is opened and a value was previously selected,
          // show options immediately on subsequent opens
          if (isOpen && selectedValue) setShowOptions(true);
          if (!isOpen) setShowOptions(false);
        }}
      >
        <Dropdown.Toggle id="dropdown-custom-components">
         <span>{selectedValue ? selectedValue : label}</span> 
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Form.Control
            autoFocus
            className=" my-1"
            placeholder={label || "Search..."}
            onFocus={() => setShowOptions(true)}
            onChange={(e) => {
              setValue(e.target.value);
              setShowOptions(true);
            }}
            value={value}
          />

          <ul className="list-unstyled">
            {/* If options are not shown yet and there's no search value, show label placeholder first */}
            {!showOptions && !value && !selectedValue ? (
              <li className="placeholder-item" key="placeholder">
                <button
                  type="button"
                  className="dropdown-placeholder"
                  onClick={() => setShowOptions(true)}
                >
                  {label}
                </button>
              </li>
            ) : (
              // show filtered options when user focuses or types
              (options || [])
                .filter((option) => !value || option.toLowerCase().startsWith(value.toLowerCase()))
                .map((option, index) => (
                  <li key={index}>
                    <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
                  </li>
                ))
            )}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
      
    </>
  );
};

export default CustomDropdown;
