// @flow
import React from 'react';

type Item = {
    list: {
      name: string,
      address: string,
      country: string,
      city: string,
      state: string,
      phone: number,
      description: string,
    }
}

const styles = {
    backgroundColor: "#fff",
    padding: "15px",
    border: "1px solid #333",
    marginBottom: "5px",
    borderRadius: "2.5px"
}
  
const ListItem = (item: Item) => {
    return (
        <div className="col-12 text-left" style={styles}>
            <p><b>Profile name:</b> {item.list.name}</p>
            <p><b>Address:</b> {item.list.address}</p>
            <p><b>Country:</b> {item.list.country}</p>
            <p><b>City:</b> {item.list.city}</p>
            <p><b>State:</b> {item.list.state}</p>
            <p><b>Phone:</b>{item.list.phone}</p>
            <p><b>Notes:</b> {item.list.description}</p>
        </div>
    );
}

export default ListItem; 