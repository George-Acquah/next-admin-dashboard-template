"use client";
import React from "react";
import TableComponent from "./tableComponent"; // Import the reusable TableComponent

const TeamsTable = () => {
  const teamsData = [
    {
      _id: "1",
      image: "/team1.jpg",
      name: "Team Alpha",
      projects: ["Project A", "Project B", "Project C"], // Array of strings
      isActive: true,
    },
    {
      _id: "2",
      image: "/team2.jpg",
      name: "Team Beta",
      projects: ["Project D", "Project E"],
      isActive: false,
    },
    // more teams...
  ];

  const columns = ["image", "name", "projects", "isActive"]; // Specify columns to display

  const handleBulkUpdate = (selectedIds: string[]) => {
    console.log("Bulk update teams with IDs:", selectedIds);
  };

  const deleteAction = async (id: string) => {
    // Implement delete action here
    console.log("Delete team with ID:", id);
  };

  return (
    <TableComponent
      data={teamsData}
      columnData={columns}
      entityType="team"
      deleteAction={deleteAction}
      // onBulkUpdate={handleBulkUpdate}
    />
  );
};

export default TeamsTable;
