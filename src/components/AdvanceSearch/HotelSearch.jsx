import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../AdvanceSearch/advancesearch.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const HotelSearch = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectedLocation = (value) => {
    console.log("Location", value);
  };

  const selectedGuest = (value) => {
    console.log("Guest ", value);
  };

  return (
    <section className="box-search-advance">
      <Container>
        <Row>
          <Col md={12} xs={12}>
            <div className="row-items">
              <div className="field-col">
                <label className="item-search-label"> Điểm đến </label>
                <div className="pill-input">
                  <span className="icon">📍</span>
                  <div className="content">
                    <CustomDropdown
                      onSelect={selectedLocation}
                      label="Bạn muốn đến đâu?"
                      options={["Đà Nẵng", "Hà Nội", "Hồ Chí Minh", "Hội An"]}
                    />
                  </div>
                </div>
              </div>

              <div className="field-col">
                <label className="item-search-label">
                  {" "}
                  Ngày nhận phòng{" "}
                </label>
                <div className="d-flex" style={{ gap: 12 }}>
                  <div className="pill-input" style={{ flex: 1 }}>
                    <span className="icon">📅</span>
                    <div className="content">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>

                </div>
              </div>
              <div className="field-col">
                <label className="item-search-label">
                  {" "}
                  Ngày trả phòng{" "}
                </label>
                <div className="d-flex" style={{ gap: 12 }}>
                  <div className="pill-input" style={{ flex: 1 }}>
                    <span className="icon">📅</span>
                    <div className="content">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-col" style={{ maxWidth: 300 }}>
                <label className="item-search-label"> Số lượng khách </label>
                <div className="pill-input">
                  <span className="icon">👥</span>
                  <div className="content">
                    <CustomDropdown
                      label="2 người lớn, 0 trẻ em"
                      onSelect={selectedGuest}
                      options={[
                        "1 người lớn",
                        "2 người lớn, 1 trẻ em",
                        "3 người lớn",
                      ]}
                    />
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

export default HotelSearch;
