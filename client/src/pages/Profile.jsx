import React, { useState } from 'react';
import { Button, Container, FormControl, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAction } from '../actions/userAction';
import Header from '../components/Header';

const Profile = () => {
  const [modalShow, setModalShow] = useState(false);
  const [created, setCreated] = useState(false);

  const { user } = useSelector((state) => state.loginUserReducer.user);
  let userId = user._id;
  console.log(userId);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [residence, setResidence] = useState(user.residence);
  const [familyInfo, setFamilyInfo] = useState(user.familyInfo);
  const [photo, setPhoto] = useState(user.photo.url);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(photo, 'photossss');

    const success = await dispatch(
      updateProfileAction({
        name,
        email,
        phone,
        photo,
        height,
        weight,
        residence,
        familyInfo,
        userId,
      })
    );
    if (success) {
      setModalShow(false);
      setCreated(true);
    }
  };

  console.log(user, 'hey da');
  return (
    <>
      <Header />
      <Container>
        <div className="profile-details-div mt-4 p-4">
          <div className="title-div">
            <h3 className="headline">Profile Details</h3>
            <Button className="button-2" onClick={() => setModalShow(true)}>
              Edit details
            </Button>
          </div>
          <div className="details-div">
            <p className="p-text">Name : {user.name}</p>
            <p className="p-text">Email Id : {user.email}</p>
            <p className="p-text">Phone Number : {user.phone}</p>
            <p className="p-text">Height : {user.height}</p>
            <p className="p-text">Weight : {user.weight}</p>
            <p className="p-text">Residence : {user.residence}</p>
            <p className="p-text">FamilyInfo : {user.familyInfo}</p>
          </div>
        </div>
      </Container>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Department
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <FormControl
              className="d-none"
              id="upload_image"
              type="file"
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              accept=".jpg,.jpeg,.png,"
            />
            <label htmlFor="upload_image">
              <span className="profilepic_icon">
                <img
                  className="update-avatar"
                  src={photo}
                  value={photo}
                  alt="User"
                  width="150"
                  style={{ borderRadius: '20%' }}
                />
              </span>
            </label>
            <input
              type="text"
              name="name"
              className="input-style-2 "
              placeholder="Enter name title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              className="input-style-2 "
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              className="input-style-2 "
              placeholder="Enter Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="number"
              name="height"
              className="input-style-2 "
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              type="number"
              name="weight"
              className="input-style-2 "
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="text"
              name="residence"
              className="input-style-2 "
              placeholder="Enter residence details"
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
            />
            <input
              type="text"
              name="familyInfo"
              className="input-style-2 "
              placeholder="Enter family Info"
              value={familyInfo}
              onChange={(e) => setFamilyInfo(e.target.familyInfo)}
            />
          </Modal.Body>
          <Modal.Footer>
            <input type="submit" className="button-2" value="Submit" />
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Profile;
