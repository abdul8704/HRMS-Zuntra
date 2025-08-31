import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";



const employeeManagementNavItems = [
  {
    label: 'Employee',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Z" />
      </svg>
    ),
    filter: true,
    path: '/employee/all'
  },
  {
    label: 'Roles',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="m640-120-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-29 72-24 143t48 135H80Zm600-80q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Z" />
      </svg>
    ),
    filter: true,
    path: '/employee/roles'
  },
  {
    label: 'New Users',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" />
      </svg>
    ),
    filter: true,
    path: '/employee/newusers'
  },
  {
    label: 'Shifts',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 24 24">
        <path fill="#000" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34ZM12 6a1 1 0 0 0-.993.883L11 7v5l.009.131a1 1 0 0 0 .197.477l.087.1 3 3 .094.082a1 1 0 0 0 1.226 0l.094-.083.083-.094a1 1 0 0 0 0-1.226l-.083-.094L13 11.585V7l-.007-.117A1 1 0 0 0 12 6Z" />
      </svg>

    ),
    filter: true,
    path: '/employee/shifts'
  },
  {
    label: 'Locations',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm0-120Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Z" />
      </svg>
    ),
    filter: true,
    path: '/employee/locations'
  }
];

const employeeDetailsNavItems = [
  {
    label: 'Attendance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 32 35">
        <path fill="#000" d="M16 0a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 20c8.84 0 16 2 9.5 2s-5 9.5-3 10.5S0 33 0 33v-5c0-4.42 7.16-8 16-8Z" />
        <path fill="#000" fillRule="evenodd" d="M26.966 22.45a4.979 4.979 0 0 1 4.51 5.408c-.154 1.694-1.203 2.996-2.267 3.903-.53.447-1.101.845-1.705 1.187l-.249.139-.117.063-.22.113-.195.096-.241.113a1.035 1.035 0 0 1-1.022-.093l-.217-.154-.27-.202-.1-.079-.212-.17a11.388 11.388 0 0 1-1.576-1.569c-.883-1.083-1.68-2.553-1.527-4.246a4.98 4.98 0 0 1 5.409-4.51Zm1.398 3.45-2.55 2.126-.886-1.062a.553.553 0 1 0-.85.709l1.204 1.444a.607.607 0 0 0 .858.078l2.932-2.445a.554.554 0 0 0-.707-.85Z" clipRule="evenodd" />
      </svg>

    ),
    filter: false,
    path: '/attendance'
  },
  {
    label: 'Project',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="29" fill="none" viewBox="0 0 26 29">
        <path fill="currentColor" d="M13 8.598c.718 0 1.3-.57 1.3-1.273 0-.702-.582-1.272-1.3-1.272-.718 0-1.3.57-1.3 1.272 0 .703.582 1.273 1.3 1.273Zm-7.8 12.73h15.6v2.545H5.2v-2.545Zm5.2-6.58 3.63 3.556 5.111-5.009 1.659 1.669V9.873h-5.2l1.703 1.623-3.275 3.206-3.628-3.556-5.2 5.09 1.838 1.8 3.362-3.288Z" />
        <path fill="currentColor" d="M22.1 3.508h-4.287a6.378 6.378 0 0 0-.416-.54l-.013-.016a5.798 5.798 0 0 0-3.757-1.932 3.451 3.451 0 0 0-1.254 0 5.798 5.798 0 0 0-3.757 1.932l-.013.016a6.375 6.375 0 0 0-.416.54H3.9a3.947 3.947 0 0 0-2.757 1.12A3.782 3.782 0 0 0 0 7.327v17.818a3.782 3.782 0 0 0 1.143 2.698 3.947 3.947 0 0 0 2.757 1.12h18.2a3.947 3.947 0 0 0 2.757-1.12A3.782 3.782 0 0 0 26 25.145V7.327a3.782 3.782 0 0 0-1.143-2.7A3.947 3.947 0 0 0 22.1 3.509Zm1.3 21.637c0 .337-.137.661-.38.9a1.314 1.314 0 0 1-.92.372H3.9a1.32 1.32 0 0 1-.92-.372 1.26 1.26 0 0 1-.38-.9V7.327c0-.338.137-.662.38-.9.245-.239.575-.373.92-.373h5.915c.15-.72.548-1.366 1.128-1.83A3.293 3.293 0 0 1 13 3.504c.75 0 1.476.254 2.057.718.58.465.979 1.112 1.128 1.83H22.1c.345 0 .675.135.92.374.243.238.38.562.38.9v17.818Z" />
      </svg>

    ),
    filter: true,
    path: '/project'
  },
  {
    label: 'Courses',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
        <path fill="currentColor" d="M11.465.42a4.158 4.158 0 0 1 3.64 0l10.56 5.131c.184.09.34.23.449.406a1.132 1.132 0 0 1 .01 1.18c-.107.178-.26.322-.442.414l-10.508 5.347a4.16 4.16 0 0 1-3.778 0L2.452 8.347v4.986c0 .295-.114.578-.317.786a1.07 1.07 0 0 1-.766.325 1.07 1.07 0 0 1-.766-.325 1.126 1.126 0 0 1-.317-.786V6.611a1.13 1.13 0 0 1 .153-.626c.11-.189.272-.34.466-.434l10.56-5.13ZM4.62 11.931v3.625a1.136 1.136 0 0 0 .318.786l.005.007.05.047.13.124c.108.104.265.242.47.416.405.34.99.788 1.72 1.24 1.451.89 3.54 1.824 5.973 1.824s4.524-.933 5.973-1.824a14.55 14.55 0 0 0 2.193-1.656l.13-.124.034-.036.013-.013.003-.003.004-.002a1.115 1.115 0 0 0 .316-.786v-3.627l-5.815 2.96a6.281 6.281 0 0 1-2.851.686 6.28 6.28 0 0 1-2.851-.686L4.62 11.931Z" />
      </svg>
    ),
    filter: true,
    path: '/courses'
  }
];

const courseManagementNavItems = [
  {
    label: 'All Courses',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Z" />
      </svg>
    ),
    filter: true,
    path: 'all',
  },
  {
    label: 'Create Course',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 40 40">
        <path fill="#000000" d="M40 17.776H28.303l10.13-5.849-2.224-3.854-10.13 5.849 5.847-10.13-3.854-2.225-5.847 10.129V0h-4.45v11.697l-5.85-10.13-3.852 2.225 5.848 10.129-10.13-5.848-2.224 3.853 10.13 5.849H0v4.45h11.695L1.567 28.072l2.224 3.854 10.13-5.848-5.85 10.13 3.855 2.224 5.848-10.13V40h4.45V28.304l5.847 10.13 3.854-2.225-5.849-10.13 10.13 5.848 2.225-3.854-10.129-5.848h11.696v-4.45H40ZM20 26.05a6.074 6.074 0 1 1 0-12.148 6.074 6.074 0 1 1 0 12.148Z" />
      </svg>
    ),
    filter: false,
    path: 'create'
  },
  {
    label: 'Add Course',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
      </svg>
    ),
    filter: false,
    path: 'add',
  }
];

const projectDetailsNavItems = [
  {
    label: 'Overview',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Z" />
      </svg>
    ),
    filter: false,
    path: 'overview',
  },
  {
    label: 'Progress',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 40 40">
        <path fill="#000000" d="M40 17.776H28.303l10.13-5.849-2.224-3.854-10.13 5.849 5.847-10.13-3.854-2.225-5.847 10.129V0h-4.45v11.697l-5.85-10.13-3.852 2.225 5.848 10.129-10.13-5.848-2.224 3.853 10.13 5.849H0v4.45h11.695L1.567 28.072l2.224 3.854 10.13-5.848-5.85 10.13 3.855 2.224 5.848-10.13V40h4.45V28.304l5.847 10.13 3.854-2.225-5.849-10.13 10.13 5.848 2.225-3.854-10.129-5.848h11.696v-4.45H40ZM20 26.05a6.074 6.074 0 1 1 0-12.148 6.074 6.074 0 1 1 0 12.148Z" />
      </svg>
    ),
    filter: true,
    path: 'progress'
  },
  {
    label: 'To-Do',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M680-80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Zm67-105 28-28-75-75v-112h-40v128l87 87Zm-547 65q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v250q-18-13-38-22t-42-16v-212h-80v120H280v-120h-80v560h212q7 22 16 42t22 38H200Zm280-640q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" /></svg>
    ),
    filter: true,
    path: 'todo'
  },
  {
    label: 'Review',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z" /></svg>
    ),
    filter: true,
    path: 'review'
  },
  {
    label: 'Completed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" /></svg>
    ),
    filter: true,
    path: 'completed',
  }
];

const projectManagementNavItems=[
  {
    label: 'Ongoing Projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
      </svg>

    ),
    filter: true,
    access: "all",
    path: 'ongoing',
  },
  {
    label: 'Completed Projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
      </svg>

    ),
    filter: true,
    access: "all",
    path: 'completed',
  },
  {
    label: 'Add Projects',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
      </svg>

    ),
    filter: true,
    access: "projectManagement",
    path: 'add',
  },
  {
    label: 'Teams',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
      </svg>

    ),
    filter: true,
    access: "projectManagement",
    path: 'teams',
  },
]

const UpskillNavItems = [
  {
    label: 'Available',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Z" />
      </svg>
    ),
    filter: false,
    role: "hr",
    path: 'all',
  },
  {
    label: 'Assigned',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
        <path fill="#000" d="M10.467 14.11c1.74-3.872 6.25-5.577 10.076-3.817 3.826 1.76 5.51 6.325 3.772 10.197A7.582 7.582 0 0 1 17.39 25c-2.935 0-5.62-1.716-6.88-4.4H0v-2.2c.065-1.254.913-2.277 2.543-3.102 1.63-.825 3.674-1.254 6.153-1.298.62 0 1.206.055 1.771.11ZM8.696 3c1.217.033 2.239.462 3.054 1.287s1.217 1.859 1.217 3.113-.402 2.288-1.217 3.113c-.815.825-1.837 1.232-3.054 1.232-1.218 0-2.24-.407-3.055-1.232S4.424 8.654 4.424 7.4s.402-2.288 1.217-3.113C6.456 3.462 7.478 3.033 8.696 3Zm8.695 19.8c1.441 0 2.824-.58 3.843-1.61a5.534 5.534 0 0 0 1.592-3.89 5.534 5.534 0 0 0-1.592-3.89 5.402 5.402 0 0 0-3.843-1.61c-1.441 0-2.824.58-3.843 1.61a5.534 5.534 0 0 0-1.592 3.89c0 1.459.573 2.858 1.592 3.89a5.402 5.402 0 0 0 3.843 1.61Z" />
        <path fill="#000" d="M15 2.75c0 .11-.041.184-.124.222l-6.32 2.52A.19.19 0 0 1 8.5 5.5a.19.19 0 0 1-.056-.007l-3.68-1.475c-.161.162-.295.428-.4.798a5.64 5.64 0 0 0-.192 1.278c.237.172.356.432.356.781 0 .33-.11.585-.327.766l.327 3.101a.25.25 0 0 1-.045.18.157.157 0 0 1-.136.078H3.264a.154.154 0 0 1-.136-.079.25.25 0 0 1-.045-.179l.328-3.1c-.219-.182-.328-.438-.328-.767 0-.349.123-.614.367-.795.041-.988.226-1.776.553-2.363l-1.879-.745C2.041 2.934 2 2.86 2 2.75s.041-.184.124-.222l6.32-2.52A.19.19 0 0 1 8.5 0a.19.19 0 0 1 .056.007l6.32 2.521c.083.038.124.112.124.222Z" />
        <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.993 14.492 17.5 17l-.493-2.508a.362.362 0 0 1 .011-.181.407.407 0 0 1 .1-.162.5.5 0 0 1 .172-.11.578.578 0 0 1 .42 0 .5.5 0 0 1 .171.11.407.407 0 0 1 .1.162c.02.059.024.12.012.181Z" />
        <path stroke="#000" d="M17.5 20a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
      </svg>

    ),
    filter: true,
    role: "hr",
    path: 'assigned'
  },
  {
    label: 'Enrolled',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
        <path fill="#000" d="M10.467 14.11c1.74-3.872 6.25-5.577 10.076-3.817 3.826 1.76 5.51 6.325 3.772 10.197A7.582 7.582 0 0 1 17.39 25c-2.935 0-5.62-1.716-6.88-4.4H0v-2.2c.065-1.254.913-2.277 2.543-3.102 1.63-.825 3.674-1.254 6.153-1.298.62 0 1.206.055 1.771.11ZM8.696 3c1.217.033 2.239.462 3.054 1.287s1.217 1.859 1.217 3.113-.402 2.288-1.217 3.113c-.815.825-1.837 1.232-3.054 1.232-1.218 0-2.24-.407-3.055-1.232S4.424 8.654 4.424 7.4s.402-2.288 1.217-3.113C6.456 3.462 7.478 3.033 8.696 3Zm8.695 19.8c1.441 0 2.824-.58 3.843-1.61a5.534 5.534 0 0 0 1.592-3.89 5.534 5.534 0 0 0-1.592-3.89 5.402 5.402 0 0 0-3.843-1.61c-1.441 0-2.824.58-3.843 1.61a5.534 5.534 0 0 0-1.592 3.89c0 1.459.573 2.858 1.592 3.89a5.402 5.402 0 0 0 3.843 1.61ZM16.304 14h1.63v3.102l2.653 1.551-.816 1.43-3.467-2.024V14Z" />
        <path fill="#000" d="M15 2.75c0 .11-.041.184-.124.222l-6.32 2.52A.19.19 0 0 1 8.5 5.5a.19.19 0 0 1-.056-.007l-3.68-1.475c-.161.162-.295.428-.4.798a5.64 5.64 0 0 0-.192 1.278c.237.172.356.432.356.781 0 .33-.11.585-.327.766l.327 3.101a.25.25 0 0 1-.045.18.157.157 0 0 1-.136.078H3.264a.154.154 0 0 1-.136-.079.25.25 0 0 1-.045-.179l.328-3.1c-.219-.182-.328-.438-.328-.767 0-.349.123-.614.367-.795.041-.988.226-1.776.553-2.363l-1.879-.745C2.041 2.934 2 2.86 2 2.75s.041-.184.124-.222l6.32-2.52A.19.19 0 0 1 8.5 0a.19.19 0 0 1 .056.007l6.32 2.521c.083.038.124.112.124.222Z" />
      </svg>

    ),
    filter: true,
    role: "hr",
    path: 'enrolled',
  },
  {
    label: 'Completed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 25 25">
        <path fill="#000" d="M10.467 14.11c1.74-3.872 6.25-5.577 10.076-3.817 3.826 1.76 5.51 6.325 3.772 10.197A7.582 7.582 0 0 1 17.39 25c-2.935 0-5.62-1.716-6.88-4.4H0v-2.2c.065-1.254.913-2.277 2.543-3.102 1.63-.825 3.674-1.254 6.153-1.298.62 0 1.206.055 1.771.11ZM8.696 3c1.217.033 2.239.462 3.054 1.287s1.217 1.859 1.217 3.113-.402 2.288-1.217 3.113c-.815.825-1.837 1.232-3.054 1.232-1.218 0-2.24-.407-3.055-1.232S4.424 8.654 4.424 7.4s.402-2.288 1.217-3.113C6.456 3.462 7.478 3.033 8.696 3Zm8.695 19.8c1.441 0 2.824-.58 3.843-1.61a5.534 5.534 0 0 0 1.592-3.89 5.534 5.534 0 0 0-1.592-3.89 5.402 5.402 0 0 0-3.843-1.61c-1.441 0-2.824.58-3.843 1.61a5.534 5.534 0 0 0-1.592 3.89c0 1.459.573 2.858 1.592 3.89a5.402 5.402 0 0 0 3.843 1.61Z" />
        <path fill="#000" d="M15 2.75c0 .11-.041.184-.124.222l-6.32 2.52A.19.19 0 0 1 8.5 5.5a.19.19 0 0 1-.056-.007l-3.68-1.475c-.161.162-.295.428-.4.798a5.64 5.64 0 0 0-.192 1.278c.237.172.356.432.356.781 0 .33-.11.585-.327.766l.327 3.101a.25.25 0 0 1-.045.18.157.157 0 0 1-.136.078H3.264a.154.154 0 0 1-.136-.079.25.25 0 0 1-.045-.179l.328-3.1c-.219-.182-.328-.438-.328-.767 0-.349.123-.614.367-.795.041-.988.226-1.776.553-2.363l-1.879-.745C2.041 2.934 2 2.86 2 2.75s.041-.184.124-.222l6.32-2.52A.19.19 0 0 1 8.5 0a.19.19 0 0 1 .056.007l6.32 2.521c.083.038.124.112.124.222ZM20.418 14 22 15.492 16.165 21 13 18.013l1.582-1.492 1.583 1.492L20.418 14Z" />
      </svg>

    ),
    filter: true,
    role: "hr",
    path: 'completed',
  }
];

const attendanceNavItems = [
  {
    label: 'Inbox',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm280-120q38 0 69-22t43-58h168v-360H200v360h168q12 36 43 58t69 22ZM200-200h560-560Z" />
      </svg>
    ),
    filter: false,
    access: "leaveManagement",
    path: 'inbox',
  },
  {
    label: 'Attendance',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
      </svg>
    ),
    filter: false,
    access: "all",
    path: 'me',
  },
  {
    label: 'Apply for Leave',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z" />
      </svg>
    ),
    filter: false,
    access: "all",
    path: 'apply'
  },
  {
    label: 'Work Schedule ',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z" />
      </svg>
    ),
    filter: false,
    access: "all",
    path: 'schedule',
  }
];

const companyDocumentsNavItems = [
  {
    label: 'Documents',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
      </svg>

    ),
    filter: true,
    access: "all",
    path: 'all',
  },
  {
    label: 'Upload Documents',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="000">
        <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
      </svg>

    ),
    filter: false,
    access: "companyDocs",
    path: 'upload',
  }
];
//all, onging, completed,add ,routing app.jsx

export const Navbar = ({
  type,
  showFilter = false,
  isFilterActive,
  setIsFilterActive,
  handleClearFilters,
}) => {
  const { user, authDataLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const employeeId = params.empId || '';
  const navRefs = useRef([]);
  const sliderRef = useRef(null);
  const tabContainerRef = useRef(null);
  const [activeNavId, setActiveNavId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  let navItems = [];

  useEffect(() => {
    if (authDataLoading || !user) return;
    const currentPath = location.pathname;
    let updatedNavId = '';

    const findOr404 = (segment) => {
      const matchedItem = navItems.find(
        item =>
          item.path === segment &&
          (item.access === 'all' || user.allowedAccess.includes(item.access))
      );
      if (matchedItem) return matchedItem.path;
      navigate('/404');
      return;
    };

    if (type === 'employeeManagement') {
      updatedNavId = navItems.find(item => currentPath.startsWith(item.path))?.path || navItems[0]?.path;
    } else if (type === 'courseManagement') {
      const courseSegment = currentPath.split('/courses/')[1]?.split('/')[0];
      updatedNavId = navItems.find(item => item.path === courseSegment)?.path || navItems[0]?.path;
    } else if (type === 'employeeDetails') {
      const detailsSegment = currentPath.split('/details')[1];
      updatedNavId = navItems.find(item => detailsSegment?.startsWith(item.path))?.path || navItems[0]?.path;
    } else if (type === 'attendance') {
      const attendanceSegment = currentPath.split('/attendance/')[1]?.split('/')[0];
      updatedNavId = findOr404(attendanceSegment);
      if (!updatedNavId) return;
    } else if (type === 'projectDetails') {
      const projectSegment = currentPath.split('/project/1/')[1]?.split('/')[0];
      updatedNavId = navItems.find(item => item.path === projectSegment)?.path || navItems[0]?.path;
    } else if (type === 'companyDocuments') {
      const documentsSegment = currentPath.split('/documents/')[1]?.split('/')[0];
      updatedNavId = findOr404(documentsSegment);
      if (!updatedNavId) return;
    } else if (type === 'projectManagement') {
      const projectManagementSegment = currentPath.split('/projects/')[1]?.split('/')[0];
      updatedNavId = findOr404(projectManagementSegment);
      if (!updatedNavId) return;
    }

    setActiveNavId(updatedNavId);
    setTimeout(() => updateSlider(updatedNavId), 0);

    const handleResize = () => updateSlider(updatedNavId);
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(handleResize);
    if (tabContainerRef.current) observer.observe(tabContainerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [location.pathname, type, navItems]);

  if (authDataLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (type === 'employeeManagement') {
    navItems = employeeManagementNavItems;
  } else if (type === 'employeeDetails') {
    navItems = employeeDetailsNavItems;
  } else if (type === 'courseManagement') {
    navItems = courseManagementNavItems;
  } else if (type === 'projectDetails') {
    navItems = projectDetailsNavItems;
  } else if (type === 'courseManagement') {
    navItems = courseManagementNavItems;
  } else if (type === 'attendance') {
    navItems = attendanceNavItems.filter((item) => {
      return item.access === 'all' || (item.access === 'leaveManagement' && user.allowedAccess.includes("leaveManagement"));
    });
  } else if (type === 'upskill') {
    navItems = UpskillNavItems;
  } else if (type === 'companyDocuments') {
    navItems = companyDocumentsNavItems.filter((item) => {
      return item.access === 'all' || (item.access === 'companyDocs' && user.allowedAccess.includes("companyDocs"));
    });
  } else if (type === 'projectManagement') {
    navItems = projectManagementNavItems.filter((item) => {
      return item.access === 'all' || (item.access === 'projectManagement' && user.allowedAccess.includes("projectManagement"));
    });
  }


  const updateSlider = (targetPath = activeNavId) => {
    const index = navItems.findIndex(item => item.path === targetPath);
    const tab = navRefs.current[index];
    if (tab && sliderRef.current) {
      sliderRef.current.style.width = `${tab.offsetWidth}px`;
      sliderRef.current.style.transform = `translateX(${tab.offsetLeft}px)`;
    }
  };

  const handleNavigation = (path) => {
    setActiveNavId(path);

    let finalPath;

    if (type === 'employeeManagement') {
      finalPath = path;
    } else if (type === 'courseManagement') {
      finalPath = `/courses/${path}`;
    } else if (type === 'employeeDetails') {
      finalPath = `/employee/${employeeId}/details${path}`;
    } else if (type === 'attendance') {
      finalPath = `/attendance/${path}`;
    } else if (type === 'upskill') {
      finalPath = `/upskill/${path}`;
    } else if (type === 'companyDocuments') {
      finalPath = `/documents/${path}`;
    } else if (type === 'projectDetails') {
      finalPath = `/project/1/${path}`;
    } else if (type === 'projectManagement') {
      finalPath = `/projects/${path}`;
    }

    navigate(finalPath);
    setIsDropdownOpen(false);
    setIsFilterActive?.(false);
    handleClearFilters?.();
  };

  if (!navItems.length) return null;

  const activeItem = navItems.find(item => item.path === activeNavId) || navItems[0];

  return (
    <div className="w-full relative bg-[#BBD3CC] rounded-xl">
      {/* Desktop Nav */}
      <ul
        className="relative hidden md:flex list-none p-0 rounded-xl overflow-hidden"
        ref={tabContainerRef}
      >
        {navItems.length > 1 && (<div
          ref={sliderRef}
          className="absolute top-0 left-0 h-full bg-white/50 rounded-xl transition-all duration-500 ease-in-out z-[1]"
        />)}
        {navItems.map((item, index) => (
          <li
            key={item.path}
            ref={(el) => (navRefs.current[index] = el)}
            className="flex-1 relative z-[2] flex items-center justify-center cursor-pointer font-medium py-4 select-none transition-colors duration-200"
            onClick={() => handleNavigation(item.path)}
            onMouseEnter={() => updateSlider(item.path)}
            onMouseLeave={() => updateSlider(activeNavId)}
          >
            <span className="mr-2 flex items-center">{item.icon}</span>
            {item.label}
          </li>
        ))}
        {showFilter && activeItem?.filter && (
          <li
            className={`relative z-[2] flex items-center justify-center cursor-pointer font-medium px-4 py-4 select-none duration-200 ${isFilterActive ? 'bg-white/40' : ''
              }`}
            onClick={() => setIsFilterActive?.(prev => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="none" viewBox="0 0 20 20">
              <path fill="#000" d="M20 16.606a.75.75 0 0 1-.75.75h-5.1a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h7.74a2.93 2.93 0 0 1 5.66 0h5.1a.75.75 0 0 1 .75.75Zm0-13.21a.75.75 0 0 1-.75.75H16.8a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h10.39a2.93 2.93 0 0 1 5.66 0h2.45a.74.74 0 0 1 .75.75Zm0 6.6a.741.741 0 0 1-.75.75H7.55a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h1.14a2.93 2.93 0 0 1 5.66 0h11.7a.75.75 0 0 1 .75.75Z" />
            </svg>
          </li>
        )}
      </ul>

      {/* Mobile Dropdown Nav */}
      <div className="md:hidden">
        <div className="relative">
          <button
            className="w-full flex items-center justify-between p-4 bg-transparent border-none cursor-pointer font-medium rounded-xl"
            onClick={() => setIsDropdownOpen(prev => !prev)}
          >
            <span className="mr-2 flex items-center">{activeItem?.icon}</span>
            <span className="flex-1 text-left">{activeItem?.label}</span>
            <svg
              className={`w-3 h-3 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                }`}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#BBD3CC] rounded-lg mt-1 z-10 overflow-hidden">
              {navItems
                .filter(item => item.path !== activeNavId)
                .map(item => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full flex items-center px-4 py-3 text-left font-medium hover:bg-black/5"
                  >
                    <span className="mr-2 flex items-center">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};