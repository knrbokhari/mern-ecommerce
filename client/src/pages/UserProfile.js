import React from "react";

const UserProfile = () => {
  return (
    <div className="container">
      <h1>User Profile</h1>

      <div className="w-100 border-1">
        <div className="d-flex p-4">
          <div className="">
            <img
              src="https://i.ibb.co/d7mQQd4/userP3.jpg"
              alt=""
              className="img-fluid rounded-circle mx-auto"
              width={150}
            />
          </div>
          <div className="ms-5">
            <h5>Name: </h5>
            <h5>Address: </h5>
            <h5>Phone: </h5>
            <h5>Total Order: </h5>
            <h5>Unpaid Order: </h5>
          </div>
        </div>
      </div>

      <div className="mt-4 px-4 pt-4 pb-2">
        <h3 className="mb-3">Order Histry</h3>
        <table class="table table-hover responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
              <th scope="col">Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
