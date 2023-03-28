import React, { useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../actions/adminAction';
import AdminHeader from '../components/AdminHeader';
import Loading from '../components/Loading';

const AdminHome = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.getAllUsersReducer);

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);
  return (
    <>
      <AdminHeader />
      <Container>
        <div className="page-wrapper pt-4">
          {loading ? (
            <Loading />
          ) : (
            <div className=" table-div">
              <table className="table table-1">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Height</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Residence</th>
                    <th scope="col">FamilyInfo</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((curElem) => (
                    <tr className="table-row" key={curElem?._id}>
                      <td>{curElem?.name}</td>
                      <td>{curElem?.email}</td>
                      <td>{curElem?.phone}</td>
                      <td>{curElem?.height}</td>
                      <td>{curElem?.weight}</td>
                      <td>{curElem?.residence}</td>
                      <td>{curElem?.familyInfo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default AdminHome;
