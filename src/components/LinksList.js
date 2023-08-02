import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import LinkService from './LinkService';

const LinksList = () => {
  const [links, setLinks] = useState([]);
  const [editLink, setEditLink] = useState(null);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);

  useEffect(() => {
    fetchLinksData();
  }, []);

  const fetchLinksData = () => {
    LinkService.fetchLinks()
      .then((linksData) => setLinks(linksData))
      .catch((error) => console.error(error));
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const { name, description, product, form } = e.target.elements;
    const newLink = {
      name: name.value,
      description: description.value,
      product: product.value,
      form: form.value,
    };
    LinkService.addLink(newLink)
      .then(() => {
        fetchLinksData();
        setShowAddLinkModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEditLink = (e) => {
    e.preventDefault();
    const { id, name, description, product, form } = e.target.elements;
    const updatedLink = {
      id: id.value,
      name: name.value,
      description: description.value,
      product: product.value,
      form: form.value,
    };
    LinkService.updateLink(updatedLink.id, updatedLink)
      .then(() => {
        fetchLinksData();
        setEditLink(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteBtnClick = (linkId) => {
    LinkService.deleteLink(linkId)
      .then(() => fetchLinksData())
      .catch((error) => console.error(error));
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="links-table">
          {links.map((link, index) => (
            <tr key={index}>
              <td>{link.name}</td>
              <td>{link.description}</td>
              <td>{link.product}</td>
              <td>{link.form}</td>
              <td>
                <button className="btn btn-info btn-sm" onClick={() => setEditLink(link)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteBtnClick(link.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddLinkModal(true)}
        >
          + Add Link
        </button>
      </div>

      <Modal show={showAddLinkModal} onHide={() => setShowAddLinkModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="add-link-form" onSubmit={handleAddLink}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" name="description" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="product">Product:</label>
              <select id="product" name="product" className="form-control" required>
                <option value="Product A">Product A</option>
                <option value="Product B">Product B</option>
                <option value="Product C">Product C</option>
                <option value="Product D">Product D</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="form">Form:</label>
              <select id="form" name="form" className="form-control" required>
                <option value="Form X">Form X</option>
                <option value="Form Y">Form Y</option>
                <option value="Form Z">Form Z</option>
                <option value="Form W">Form W</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {editLink && (
        <Modal show={!!editLink} onHide={() => setEditLink(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="edit-link-form" onSubmit={handleEditLink}>
              <input type="hidden" id="edit-link-id" name="id" value={editLink.id} />
              <div className="form-group">
                <label htmlFor="edit-link-name">Name:</label>
                <input
                  type="text"
                  id="edit-link-name"
                  name="name"
                  className="form-control"
                  required
                  defaultValue={editLink.name} // Set the default value here
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-link-description">Description:</label>
                <input
                  type="text"
                  id="edit-link-description"
                  name="description"
                  className="form-control"
                  required
                  defaultValue={editLink.description} // Set the default value here
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-link-product">Product:</label>
                <select
                  id="edit-link-product"
                  name="product"
                  className="form-control"
                  required
                  defaultValue={editLink.product} // Set the default value here
                >
                  <option value="Product A">Product A</option>
                  <option value="Product B">Product B</option>
                  <option value="Product C">Product C</option>
                  <option value="Product D">Product D</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="edit-link-form">Form:</label>
                <select
                  id="edit-link-form"
                  name="form"
                  className="form-control"
                  required
                  defaultValue={editLink.form} // Set the default value here
                >
                  <option value="Form X">Form X</option>
                  <option value="Form Y">Form Y</option>
                  <option value="Form Z">Form Z</option>
                  <option value="Form W">Form W</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}

    </div>
  );
};

export default LinksList;