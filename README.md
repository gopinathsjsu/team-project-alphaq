# Team AlphaQ - MovieBook Application

***Application URL:*** [202-Project-Load-Balancer-923992007.us-east-2.elb.amazonaws.com:3000](202-Project-Load-Balancer-923992007.us-east-2.elb.amazonaws.com)

The MovieBook Application allows the end-user to View Movies at Locations, Book their tickets, and Pay for their tickets. The System has a built in Accounts to keep track of their Rewards Points, Watch History...and so on. Employees have functionalities to change theater components like shows and its details.

## Team
* ***Christopher Vi:*** Full-Stack Developer, Database Administrator, Cloud Architect & Administrator  
* ***Mohana Moganti:*** Full-Stack Developer  
* ***Harshil Patel:*** Full-Stack Developer

***Team Collaboration Framework:*** Agile Scrum, 2 Weeks Sprint, Sprint Planning, Sprint Retrospective XP Core Values

## Team Documentation

* [Scrum Artifacts](https://docs.google.com/spreadsheets/d/1Ou5nr0qhjXJf1ZBdfvXOFh1wPpQr0Ojk/edit#gid=1688276313)  
* [Project Board](https://github.com/orgs/gopinathsjsu/projects/93)  
* [Areas of Contributions](https://docs.google.com/document/d/1zFmsmeepCnnBEpHNpllcrioHCpwILlS9/edit?usp=drive_link&ouid=116396627694076638973&rtpof=true&sd=true)
* [UML Diagrams](https://drive.google.com/drive/folders/1-lI6e47wj2tLQ0uaHSoFZbFRu-VBPHJk?usp=drive_link)  
* [Cloud Diagram](https://drive.google.com/drive/folders/1I4VWLmxZZ3hCCJRD7ZYGSfhmx4tQNCHj?usp=drive_link)  

## Technology Stack
The Technology Stack implemented for the MovieBook Application is as follows:

***Front-End:*** ReactJs  
***Back-End:*** ExpressJs   
Cloud: Amazon Web Services (AWS)  



## General Information

***Feature Set:***
UI is accessed by Members, Non-Members, and Theater employees (who are admins)

***Home Page***  
-Login Component  
-Create Account  
-Membership Plans  
-Movie Schedules  

***Book Tickets and Payment***  
-Select Movie Showtime    
-Book & Pay for Tickets  

***Member Page***
-View Member Status  
-View Rewards Points  
-View Watch History  

***Theater Employee Page***  
-Change Theater Components (Seats, Movies...etc)  
-View Analytics

## Design Decisions
For our project, we opted for the MERN stack (MongoDB, Express.js, React, Node.js) due to its cohesive full-stack JavaScript environment, which offers a seamless integration and a streamlined development process. This choice aligns with our objective to create a scalable and contemporary web application.

We embraced a Microservices Architecture for its benefits in decoupling, easier maintenance, and enhanced resilience. This architectural style allows different components of our application, such as the user interface and API, to function independently. Thus, if one service experiences issues, it doesn't impact the others, enhancing the system's overall reliability. Additionally, our focus on resilience ensures quick recovery from any downtime.

In our MERN stack:
- **MongoDB** is our database choice, providing a flexible, schema-less structure, ideal for our microservices approach.
- **Express.js**, operating on Node.js, forms the core of our backend, offering a robust framework for building efficient and scalable APIs.
- **React** is employed for the front end, favored for its component-based architecture, which allows for reusable UI components and a streamlined user experience.
- **Node.js** underlies our server-side operations, chosen for its non-blocking I/O and event-driven nature, suitable for distributed systems.

For deployment, we utilize AWS (Amazon Web Services) to access a broad range of reliable cloud services. Key AWS services we employ include:
- **Elastic Compute Cloud (EC2)**, providing flexible and scalable computing capacity.
- **Amazon RDS for MongoDB** or **Amazon DocumentDB**, offering managed database services compatible with MongoDB.

By leveraging AWS, we can easily scale our computing and database resources, ensuring minimal impact on the overall application. AWS's robust cloud infrastructure further supports our microservices architecture by offering high availability and fault tolerance. This deployment strategy enables us to maintain a resilient and efficient web application.

## Architecture Diagrams
***Cloud Architectural Diagram:***  
![Screenshot of the Cloud Architectural Diagram.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/cloud/AWS%20Architecture%20-%20Team%20AlphaQ.jpg)

***UML Deployment Diagram:***
![Screenshot of the UML Deployment Diagram.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/uml/UML%20Deployment%20Diagram%20-%20Team%20AlphaQ.jpg)

***UML Component Diagram:***
![Screenshot of the UML Component Diagram.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/uml/UML%20Component%20Diagram%20-%20Team%20AlphaQ.jpg)


## License

[MIT](https://choosealicense.com/licenses/mit/)
