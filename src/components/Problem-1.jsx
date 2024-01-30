import React, { useState } from 'react';

const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ name: '', status: '' });
  const [show, setShow] = useState('all');

  const handleClick = (val) => {
    setShow(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, formData]);
    setFormData({ name: '', status: '' });
  };

  const getFilteredAndSortedTasks = () => {
    const lowercaseShow = show.toLowerCase();
  
    if (lowercaseShow === 'all') {
      return tasks;
    } else if (lowercaseShow === 'active') {
      return tasks.filter(task => task.status.toLowerCase() === 'active');
    } else if (lowercaseShow === 'completed') {
      return tasks.filter(task => task.status.toLowerCase() === 'completed');
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6">
          <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'all' && 'active'}`}
                type="button"
                onClick={() => handleClick('all')}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'active' && 'active'}`}
                type="button"
                onClick={() => handleClick('active')}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'completed' && 'active'}`}
                type="button"
                onClick={() => handleClick('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredAndSortedTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;


