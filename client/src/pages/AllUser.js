import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "../axios";
import Loading from "../components/Loading";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setLoading(false);
        setUsers(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return <Loading />;
  if (users?.length === 0)
    return <h2 className="py-2 text-center">No users yet</h2>;

  return (
    <Container>
      <h2 className="py-2 text-center mb-4">All Users</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Client Id</th>
            <th>Client Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllUser;
