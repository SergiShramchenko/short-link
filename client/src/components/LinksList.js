import React from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({ links }) => {
  console.log(links.length);
  if (!links.length) {
    return <p className='center'>No links yet</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>N</th>
          <th>Original</th>
          <th>Short</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
