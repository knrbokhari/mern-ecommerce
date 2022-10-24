import React from "react";
import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md mb-4 mb-md-0">
            <h3>Store</h3>
            <ul className="list-unstyled nav-links">
              <li>
                <a href="/">Mobile</a>
              </li>
              <li>
                <a href="/">Laptop</a>
              </li>
              <li>
                <a href="/">Technology</a>
              </li>
              <li>
                <a href="/">New Arrivals</a>
              </li>
              <li>
                <a href="/">Top Brands</a>
              </li>
              <li>
                <a href="/">Best Selling</a>
              </li>
            </ul>
          </div>
          <div className="col-md mb-4 mb-md-0">
            <h3>About</h3>
            <ul className="list-unstyled nav-links">
              <li>
                <a href="/">About us</a>
              </li>
              <li>
                <a href="/">Clients</a>
              </li>
              <li>
                <a href="/">Services</a>
              </li>
              <li>
                <a href="/">Best sellers</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-md mb-4 mb-md-0">
            <h3>Legal</h3>
            <ul className="list-unstyled nav-links">
              <li>
                <a href="/">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Legality</a>
              </li>
              <li>
                <a href="/">Author License</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h3>Subscribe</h3>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dolor ducimus doloremque earum ullam. Architecto voluptatum odio
              magni.
            </p>
            <form action="#" className="subscribe">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your e-mail"
              />
              <button className="btn btn-dark mt-2">Send</button>
            </form>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-12">
            <hr className="my-3" />
          </div>
          <div className="col-md-6">
            <p>
              <small>© {new Date().getFullYear()} All Rights Reserved.</small>
            </p>
          </div>
          <div className="col-md-6 text-md-right">
            <ul className="social list-unstyled">
              <li>
                <a href="/">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaPinterest />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="/">
                  <FaBehance />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
