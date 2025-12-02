import React, { useState, useRef, useEffect } from "react";
import "./filter-hotel.css";

const hotels = [
  {
    id: 1,
    name: "Glamour Hotel Da Nang",
    category: "Khách sạn",
    rating: 3,
    location: "An Hải Bắc, Sơn Trà",
    tags: ["Đưa đón sân bay", "Nhà hàng"],
    oldPrice: 660000,
    price: 575000,
    images: ["/static/media/feature-1.jpg","/static/media/feature-2.jpg","/static/media/feature-3.jpg"]
  },
  {
    id: 2,
    name: "Muong Thanh Grand Da Nang",
    category: "Khách sạn",
    rating: 4,
    location: "An Hải Tây, Sơn Trà",
    tags: ["Đưa đón sân bay", "Quán rượu"],
    oldPrice: 720000,
    price: 650000,
    images: ["/static/media/feature-4.jpg","/static/media/feature-5.jpg","/static/media/feature-6.jpg"]
  },
  {
    id: 3,
    name: "Furama Villas Danang",
    category: "Villas",
    rating: 5,
    location: "Khuê Mỹ, Ngũ Hành Sơn",
    tags: ["Phòng giải trí", "Nhà bếp mini"],
    oldPrice: 7320000,
    price: 6250000,
    images: ["/static/media/feature-7.jpg","/static/media/feature-8.jpg","/static/media/feature-9.jpg"]
  },
  {
    id: 4,
    name: "Moskva Motel & Apartment",
    category: "Căn hộ",
    rating: 3,
    location: "Hoa Hiệp Nam, Liên Chiểu",
    tags: ["Các tiện nghi ngoài trời", "Nhà bếp mini"],
    oldPrice: 560000,
    price: 415000,
    images: ["/static/media/feature-10.jpg","/static/media/feature-11.jpg","/static/media/feature-12.jpg"]
  }
];

const currency = (v) => {
  if (v === null || v === undefined) return "";
  return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

const Stars = ({ n }) => (
  <div className="stars">
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} className="star">★</span>
    ))}
  </div>
);

const FilterHotel = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("Độ phổ biến");
  const sortRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const sortOptions = ["Độ phổ biến", "Giá cao nhất", "Điểm đánh giá", "Giá thấp nhất"];

  return (
    <div className="hotel-page container">
      <div className="hotel-inner">
        <aside className="hotel-sidebar">
          <div className="filter-card">
            <div className="filter-title">Bộ lọc</div>

            <div className="filter-section">
              <h4>Giá phòng/đêm</h4>
              <label className="chk"><input type="checkbox" /> Dưới 1.000.000đ</label>
              <label className="chk"><input type="checkbox" /> 1.000.000đ - 5.000.000đ</label>
              <label className="chk"><input type="checkbox" /> 5.000.000đ - 10.000.000đ</label>
              <label className="chk"><input type="checkbox" /> Trên 10.000.000đ</label>
            </div>

            <div className="filter-section">
              <h4>Đánh giá</h4>
              <label className="chk"><input type="checkbox" /> <Stars n={5}/> </label>
              <label className="chk"><input type="checkbox" /> <Stars n={4}/> </label>
              <label className="chk"><input type="checkbox" /> <Stars n={3}/> </label>
              <label className="chk"><input type="checkbox" /> <Stars n={2}/> </label>
              <label className="chk"><input type="checkbox" /> <Stars n={1}/> </label>
            </div>

            <div className="filter-section">
              <h4>Loại hình lưu trú</h4>
              <label className="chk"><input type="checkbox" /> Villa</label>
              <label className="chk"><input type="checkbox" /> Khách sạn</label>
              <label className="chk"><input type="checkbox" /> Căn hộ</label>
              <label className="chk"><input type="checkbox" /> Resort</label>
            </div>

            <div className="filter-section">
              <h4>Tiện nghi</h4>
              <label className="chk"><input type="checkbox" /> Nhà hàng</label>
              <label className="chk"><input type="checkbox" /> Đưa đón sân bay</label>
              <label className="chk"><input type="checkbox" /> Khu vực giải trí</label>
            </div>

            <div className="filter-apply">
              <button className="btn-apply">Áp dụng bộ lọc</button>
            </div>
          </div>
        </aside>

        <main className="hotel-results">
          <div className="results-head">
            <div>
              <h2 className="results-title">Đà Nẵng</h2>
              <p className="results-sub">61 nơi lưu trú được tìm thấy</p>
            </div>
            <div className="sort" ref={sortRef}>
              <button className={`sort-btn ${sortOpen ? 'open' : ''}`} onClick={() => setSortOpen((s) => !s)}>
                Xếp theo <span>{sortValue} ▾</span>
              </button>

              {sortOpen && (
                <ul className="sort-dropdown">
                  {sortOptions.map((opt) => (
                    <li
                      key={opt}
                      className={`sort-item ${opt === sortValue ? 'active' : ''}`}
                      onClick={() => { setSortValue(opt); setSortOpen(false); }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="hotel-list">
            {hotels.map((h) => (
              <div className="hotel-card" key={h.id}>
                <div className="hotel-media">
                  <div className="main-img" style={{backgroundImage:`url(${h.images[0]})`}} />
                  <div className="thumbs">
                    {h.images.slice(1).map((src, i) => (
                      <div key={i} className="thumb" style={{backgroundImage:`url(${src})`}} />
                    ))}
                  </div>
                </div>

                <div className="hotel-info">
                  <div className="hotel-top">
                    <span className="badge">{h.category}</span>
                    <Stars n={h.rating} />
                  </div>

                  <h3 className="hotel-name">{h.name}</h3>
                  <div className="hotel-location">📍 {h.location}</div>

                  <div className="hotel-tags">
                    {h.tags.map((t, i) => (
                      <span key={i} className="tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="hotel-price">
                  <div className="old">{currency(h.oldPrice)}</div>
                  <div className="price">{currency(h.price)}</div>
                  <button className="view-btn">Xem phòng ▸</button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button className="page-btn">Trước</button>
            <button className="page-num active">1</button>
            <button className="page-num">2</button>
            <button className="page-btn">Sau</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FilterHotel;
