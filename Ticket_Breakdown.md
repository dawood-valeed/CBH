# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
---
## Ticket 1: Add new table for custom IDs
### DESCRIPTION:
Each facility requires it's own custom id for the agents that have worked at there for their reporting.

### TECHNICAL DETAIL:
Create a bridging table named `Facilities_Agents` which will act as a many-to-many table between `Facilities` and `Agents` and it will contain following columns
- agent_id (foreign key from `Agents` table)
- facility_id (foreign key from `Facilities` table)
- agent_custom_id (key which will contain the custom id for Agent entered by the facility they have worked for).

### ACCEPTANCE CRITERIA:
- Setup a table where each individual facility will be able to enter their own custom id for each agent they hired.

### ESTIMATION
5 Story points

---
## Ticket 1: Add new table for custom IDs
### DESCRIPTION:
Each facility requires it's own custom id for the agents that have worked at there for their reporting.

### TECHNICAL DETAIL:
- Alter the function `getShiftsByFacility` to fetch custom ids of agents from `Facilities_Agents` table and map them with each agent accordingly in the response.
- Update `generateReport` if needed to display custom ids for all the agents.

### ACCEPTANCE CRITERIA:
- Make sure facility based custom ids are presenet for agents.
- Our system's ids are not present for agents.
- PDF should display the correct custom id for each agent.

### ESTIMATION
3 Story points