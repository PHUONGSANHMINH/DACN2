import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../AdvanceSearch/advancesearch.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const PlaneSearch = () => {
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);

  const onFromSelect = (v) => console.log("From", v);
  const onToSelect = (v) => console.log("To", v);
  const onGuestSelect = (v) => console.log("Guest", v);

  return (
    <section className="box-search-advance">
      <Container>
        <Row>
          <Col md={12} xs={12}>
            <div className="row-items">

              <div className="field-col">
                <label className="item-search-label"> Điểm khởi hành </label>
                <div className="pill-input">
                  <span className="icon">✈️</span>
                  <div className="content">
                    <CustomDropdown
                      label="Nơi đi"
                      options={["Đà Nẵng", "Hà Nội", "Hồ Chí Minh"]}
                      onSelect={onFromSelect}
                    />
                  </div>
                </div>
              </div>

              <div className="field-col">
                <label className="item-search-label"> Điểm đến </label>
                <div className="pill-input">
                  <span className="icon">🧭</span>
                  <div className="content">
                    <CustomDropdown
                      label="Nơi đến"
                      options={["Hà Nội", "Đà Nẵng", "Hồ Chí Minh"]}
                      onSelect={onToSelect}
                    />
                  </div>
                </div>
              </div>

              <div className="field-col">
                <label className="item-search-label"> Ngày đi </label>
                <div className="pill-input">
                  <span className="icon">📅</span>
                  <div className="content">
                    <DatePicker selected={departDate} onChange={(d) => setDepartDate(d)} dateFormat="dd/MM/yyyy" />
                  </div>
                </div>
              </div>

              <div className="field-col">
                <label className="item-search-label"> Ngày về (Tùy chọn) </label>
                <div className="pill-input">
                  <span className="icon">📅</span>
                  <div className="content">
                    <DatePicker selected={returnDate} onChange={(d) => setReturnDate(d)} minDate={departDate} dateFormat="dd/MM/yyyy" />
                  </div>
                </div>
              </div>

              <div className="field-col" style={{ maxWidth: 260 }}>
                <label className="item-search-label"> Số lượng khách </label>
                <div className="pill-input">
                  <span className="icon">👥</span>
                  <div className="content">
                    <CustomDropdown label="1 người" options={["1 người", "2 người", "3 người"]} onSelect={onGuestSelect} />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <Button className="search-circle">
                  <i className="bi bi-search"></i>
                </Button>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PlaneSearch;