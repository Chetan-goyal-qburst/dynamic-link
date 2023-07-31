import React, { useState, useEffect } from 'react';
import Link from './Link';

const LinksList = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinksData();
  }, []);

  const fetchLinksData = () => {
    fetch('https://64bf88840d8e251fd110f977.mockapi.io/links', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Failed to fetch data from the API.');
      })
      .then(linksData => {
        setLinks(linksData);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addLinkToAPI = (linkData) => {
    fetch('https://64bf88840d8e251fd110f977.mockapi.io/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(linkData)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Failed to add data to the API.');
      })
      .then(newLink => {
        fetchLinksData(); // Call fetchLinksData to refresh the table with the updated data
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAddLink = (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const description = e.target.elements.description.value;
    const product = e.target.elements.product.value;
    const form = e.target.elements.form.value;

    const newLink = {
      name: name,
      description: description,
      product: product,
      form: form
    };

    // Add the new link to the API and update the table
    addLinkToAPI(newLink);

    // Hide the modal (if this code is related to a Bootstrap modal)
  };

  return (
    <div className="container">
      <h1 className="mt-4 mb-4">Links List</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Product</th>
            <th>Form</th>
          </tr>
        </thead>
        <tbody id="links-table">
          {links.map((link, index) => (
            <Link key={index} link={link} />
          ))}
        </tbody>
      </table>

      <div className="text-center mb-4">
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#add-link-modal"
          id='add-link-modal'
          onClick={handleAddLink} // Use onClick instead of onSubmit for a button click
        >
          + Add Link
        </button>
      </div>
    </div>
  );
};

export default LinksList;
