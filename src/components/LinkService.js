const API_URL = 'https://64bf88840d8e251fd110f977.mockapi.io/links';

const LinkService = {
  fetchLinks: () => {
    return fetch(API_URL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Failed to fetch data from the API.');
      });
  },

  addLink: (linkData) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(linkData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to add data to the API.');
    });
  },

  updateLink: (linkId, updatedLinkData) => {
    return fetch(`${API_URL}/${linkId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLinkData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to update data in the API.');
    });
  },

  deleteLink: (linkId) => {
    return fetch(`${API_URL}/${linkId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to delete data from the API.');
    });
  },
};

export default LinkService;
