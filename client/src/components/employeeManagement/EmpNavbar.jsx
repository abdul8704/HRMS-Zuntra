import React from 'react'

export const EmpNavbar = () => {
  return (
    <div className="emp-navbar">
      <div className="nav-buttons">
        <button className="btn active">New User</button>
        <button className="btn inactive">Employee</button>
        <button className="btn inactive">Role</button>

        {/* Custom SVG for Map */}
        <button className="btn icon-btn">
         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="38" fill="none" viewBox="0 0 38 38">
  <path fill="currentColor" d="M19 22.167a6.34 6.34 0 0 0 6.334-6.334A6.34 6.34 0 0 0 19 9.5a6.34 6.34 0 0 0-6.333 6.333A6.34 6.34 0 0 0 19 22.167Zm0-9.5a3.17 3.17 0 0 1 3.167 3.166A3.17 3.17 0 0 1 19 19a3.17 3.17 0 0 1-3.166-3.167A3.17 3.17 0 0 1 19 12.667Z"/>
  <path fill="currentColor" d="M18.081 34.538a1.583 1.583 0 0 0 1.837 0c.482-.34 11.794-8.509 11.748-18.705 0-6.984-5.682-12.667-12.666-12.667S6.333 8.849 6.333 15.825C6.287 26.029 17.6 34.198 18.081 34.538ZM19 6.333c5.24 0 9.5 4.26 9.5 9.508.033 7.026-6.948 13.336-9.5 15.405-2.55-2.07-9.533-8.382-9.5-15.413 0-5.24 4.26-9.5 9.5-9.5Z"/>
</svg>

        </button>

        {/* Custom SVG for Filter */}
        <button className="btn icon-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" fill="none" viewBox="0 0 30 30">
  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.063 14.785V1m21.444 27.57V23.4M4.063 28.57v-6.893m21.444-5.169V1M14.785 6.17V1m0 27.57V13.062M4.063 21.678c1.692 0 3.064-1.543 3.064-3.447 0-1.903-1.372-3.446-3.064-3.446C2.372 14.785 1 16.328 1 18.231c0 1.904 1.372 3.447 3.063 3.447Zm10.721-8.616c1.692 0 3.063-1.542 3.063-3.446 0-1.903-1.371-3.446-3.063-3.446-1.692 0-3.063 1.543-3.063 3.446 0 1.904 1.371 3.446 3.063 3.446ZM25.507 23.4c1.691 0 3.063-1.543 3.063-3.446 0-1.903-1.372-3.446-3.063-3.446-1.692 0-3.064 1.543-3.064 3.446 0 1.903 1.372 3.446 3.064 3.446Z"/>
</svg>

        </button>
      </div>

      <style jsx>{`
  .emp-navbar {
    width: 100%;
    height: 70px;
    background: #BBD3CC;
    padding: 0;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
  }

  .nav-buttons {
    display: flex;
    width: 100%;
    height: 100%;
    margin-top:-29px;
  }

  .btn {
    flex: 1; /* Make all buttons take equal width */
    height: 100%;
    padding: 0 8px;
    border: none;
    border-radius: 0; /* Remove rounding between buttons */
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .active {
    background-color: #d4d4d4 !important;
  }

  .inactive.btn:hover {
    background-color: #ffffff;
    opacity: 0.5;
  }

  .icon-btn {
    justify-content: center;
  }

  .icon-btn:hover {
    background-color: #A9C9BB;
    color: white;
  }

  @media (max-width: 768px) {
    .nav-buttons {
      flex-wrap: wrap;
    }

    .btn {
      font-size: 14px;
    }
  }
`}</style>
    </div>
  )
}