import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [patientType, setPatientType] = useState("outpatient");
  const [isFormValid, setIsFormValid] = useState(false);

  // Statik ma'lumotlar
  const rooms = [
    { id: 1, name: "101-xona", description: "2 kishilik standart xona" },
    { id: 2, name: "202-xona", description: "1 kishilik VIP xona" },
    { id: 3, name: "303-xona", description: "3 kishilik oilaviy xona" },
  ];

  const doctors = [
    { id: 1, name: "Aliyev", speciality: "Terapevt" },
    { id: 2, name: "Karimov", speciality: "Xirurg" },
    { id: 3, name: "Abdullayeva", speciality: "Pediatr" },
  ];

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    discount: 0,
    subtotal: 500000,
    amountTotal: 0,
    totalPaid: 0,
    checkInDate: "",
    checkOutDate: "",
    passport: "",
    birthDate: "",
    phone: ""
  });

  useEffect(() => {
    // Statik holda subtotal asosida hisoblash
    const subtotal = patientData.subtotal;
    const discount = parseFloat(patientData.discount) || 0;
    const discountedAmount = subtotal - (subtotal * discount) / 100;
    const roundedTotal = Math.round(discountedAmount);
    setPatientData((prevData) => ({
      ...prevData,
      amountTotal: discountedAmount,
      totalPaid: roundedTotal,
    }));
  }, [patientData.discount, patientData.subtotal]);

  useEffect(() => {
    // Formning to'g'ri to'ldirilganligini tekshirish
    const isValid = 
      patientData.firstName.trim() !== "" &&
      patientData.lastName.trim() !== "" &&
      patientData.gender !== "" &&
      patientData.address.trim() !== "" &&
      (patientType === "outpatient" ? 
        (patientData.passport.trim() !== "" && patientData.birthDate !== "" && patientData.phone.trim() !== "") : 
        (selectedRoom !== null && selectedDoctor !== null && patientData.checkInDate !== "" && patientData.checkOutDate !== "")
      );
      
    setIsFormValid(isValid);
  }, [patientData, patientType, selectedRoom, selectedDoctor]);

  const handleRoomSelect = (id) => {
    const selected = rooms.find((room) => room.id === parseInt(id));
    setSelectedRoom(selected);
  };

  const handleDoctorSelect = (id) => {
    const selected = doctors.find((doctor) => doctor.id === parseInt(id));
    setSelectedDoctor(selected);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Yuborilgan ma'lumotlar:", patientData, selectedRoom, selectedDoctor);
    alert("Bemor ma'lumotlari muvaffaqiyatli saqlandi!");
  };

  const handleCancel = () => {
    if (window.confirm("Haqiqatan ham bekor qilmoqchimisiz? Barcha kiritilgan ma'lumotlar yo'qoladi.")) {
      setPatientData({
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
        discount: 0,
        subtotal: 500000,
        amountTotal: 0,
        totalPaid: 0,
        checkInDate: "",
        checkOutDate: "",
        passport: "",
        birthDate: "",
        phone: ""
      });
      setSelectedRoom(null);
      setSelectedDoctor(null);
      setPatientType("outpatient");
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>🔖 Yangi Bemor Buyurtma Tizimi</h1>
        <p>Bemor ma'lumotlarini to'liq kiriting va to'lovni hisoblang</p>
      </div>
      
      <div className="main-content">
        <div className="service-section">
          <h3>🩺 Xizmatlar</h3>
          <Button variant="primary" className="add-service-btn" disabled={isFormValid}>
            ➕ Xizmat qo'shish
          </Button>
          <div className="service-list">
            <div className="service-item">
              <span>Umumiy tekshiruv</span>
              <span>150,000 so'm</span>
            </div>
            <div className="service-item">
              <span>Labaratoriya tekshirlari</span>
              <span>250,000 so'm</span>
            </div>
            <div className="service-item">
              <span>Rentgenografiya</span>
              <span>100,000 so'm</span>
            </div>
          </div>
        </div>
        
        <Form onSubmit={handleSubmit} className="patient-form">
          <div className="form-section">
            <h3>👤 Bemor ma'lumotlari</h3>
            
            {/* Bemor turi */}
            <Form.Group as={Row} className="mb-3 patient-type">
              <Form.Label as="legend" column sm={3} className="fw-bold">
                Bemor turi:
              </Form.Label>
              <Col sm={9}>
                <div className="btn-group">
                  <Button 
                    variant={patientType === "outpatient" ? "primary" : "outline-primary"}
                    onClick={() => setPatientType("outpatient")}
                  >
                    Statsionardan tashqari
                  </Button>
                  <Button 
                    variant={patientType === "inpatient" ? "primary" : "outline-primary"}
                    onClick={() => setPatientType("inpatient")}
                  >
                    Statsionar
                  </Button>
                </div>
              </Col>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Ism</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={patientData.firstName}
                    onChange={handleInputChange}
                    placeholder="Ismni kiriting"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Familiya</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={patientData.lastName}
                    onChange={handleInputChange}
                    placeholder="Familiyani kiriting"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Jinsi</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={patientData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Tanlang</option>
                    <option value="male">Erkak</option>
                    <option value="female">Ayol</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Manzil</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={patientData.address}
                    onChange={handleInputChange}
                    placeholder="Manzilni kiriting"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* OUTPATIENT maxsus ma'lumotlari */}
            {patientType === "outpatient" && (
              <>
                <h4 className="mt-4 mb-3">Statsionardan tashqari bemor ma'lumotlari</h4>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Passport raqami</Form.Label>
                      <Form.Control
                        type="text"
                        name="passport"
                        value={patientData.passport}
                        onChange={handleInputChange}
                        placeholder="AA1234567"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Tug'ilgan sana</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        value={patientData.birthDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Telefon raqami</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={patientData.phone}
                        onChange={handleInputChange}
                        placeholder="+998 XX XXX XX XX"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            {/* INPATIENT maxsus ma'lumotlari */}
            {patientType === "inpatient" && (
              <>
                <h4 className="mt-4 mb-3">Statsionar bemor ma'lumotlari</h4>
                
                <Row>
                  <Col md={6}>
                    {/* Xona tanlash */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Xona tanlash</Form.Label>
                      <Form.Select onChange={(e) => handleRoomSelect(e.target.value)} required>
                        <option value="">Xona tanlang</option>
                        {rooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name} - {room.description}
                          </option>
                        ))}
                      </Form.Select>
                      {selectedRoom && (
                        <div className="selected-info mt-2">
                          <span>🛏️ {selectedRoom.name}</span>
                          <span>📐 {selectedRoom.description}</span>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Doktor tanlash */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Shifokor tanlash</Form.Label>
                      <Form.Select onChange={(e) => handleDoctorSelect(e.target.value)} required>
                        <option value="">Shifokor tanlang</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            Dr. {doctor.name} ({doctor.speciality})
                          </option>
                        ))}
                      </Form.Select>
                      {selectedDoctor && (
                        <div className="selected-info mt-2">
                          <span>👨‍⚕️ Dr. {selectedDoctor.name}</span>
                          <span>⚕️ {selectedDoctor.speciality}</span>
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Sana tanlash */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Kirish sanasi</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkInDate"
                        value={patientData.checkInDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Chiqish sanasi</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkOutDate"
                        value={patientData.checkOutDate}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
          </div>

          <div className="form-section payment-section">
            <h3>💳 To'lov hisobi</h3>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Xizmatlar summasi</Form.Label>
                  <Form.Control
                    type="number"
                    name="subtotal"
                    value={patientData.subtotal}
                    readOnly
                    className="payment-input"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Chegirma foizi</Form.Label>
                  <div className="discount-input">
                    <Form.Control
                      type="number"
                      name="discount"
                      value={patientData.discount}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="payment-input"
                    />
                    <span>%</span>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Chegirma summasi</Form.Label>
                  <Form.Control
                    type="number"
                    value={patientData.subtotal - patientData.amountTotal}
                    readOnly
                    className="payment-input"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Jami to'lov</Form.Label>
                  <Form.Control
                    type="number"
                    name="amountTotal"
                    value={patientData.amountTotal}
                    readOnly
                    className="payment-input total-amount"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="form-actions">
            <Button variant="outline-secondary" className="cancel-btn" onClick={handleCancel}>
              Bekor qilish
            </Button>
            <Button variant="success" type="submit" className="submit-btn" disabled={isFormValid}>
              💾 Saqlash
            </Button>
          </div>
        </Form>
      </div>
      
      <div className="footer">
        <p>© 2025 Tibbiyot Markazi - Barcha huquqlar himoyalangan</p>
      </div>
    </div>
  );
}

export default App;