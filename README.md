# Team AlphaQ - Movie Theater Club (MTC) Application

***Application URL:*** [http://alphaq-mtc-sjsu-website.s3-website-us-west-2.amazonaws.com](http://alphaq-mtc-sjsu-website.s3-website-us-west-2.amazonaws.com)

The Movie Theater Club Application allows the end-user to View Movies at Locations, Book their tickets, and Pay for their tickets. The System has a built in Accounts page to keep track of their Rewards Points, Watch History...and so on. Employees have functionalities to change theater components and view analytics.

## Team
* ***Christopher Vi:*** Full-Stack Developer, Database Administrator, Cloud Architect & Administrator  
* ***Mohana Moganti:*** Full-Stack Developer  
* ***Harshil Patel:*** Full-Stack Developer

***Team Collaboration Framework:*** Agile Scrum, 2 Weeks Sprint, Sprint Planning, Sprint Retrospective XP Core Values

## Team Documentation

* [Scrum Artifacts](https://drive.google.com/drive/folders/1Px_koY1QXeSbXKLLa84SCP5LAb92hWh0?usp=drive_link)  
* [Project Board](https://github.com/orgs/gopinathsjsu/projects/93)  
* [Areas of Contributions](https://docs.google.com/document/d/1zFmsmeepCnnBEpHNpllcrioHCpwILlS9/edit?usp=drive_link&ouid=116396627694076638973&rtpof=true&sd=true)
* [UML Diagrams](https://drive.google.com/drive/folders/1-lI6e47wj2tLQ0uaHSoFZbFRu-VBPHJk?usp=drive_link)  
* [Cloud Diagram](https://drive.google.com/drive/folders/1I4VWLmxZZ3hCCJRD7ZYGSfhmx4tQNCHj?usp=drive_link)  
* [Wireframes](https://drive.google.com/drive/folders/1Em0gnieiS61n4U2eUz41sRXt2Rcbd964?usp=drive_link)

## Technology Stack
The Technology Stack implemented for the Movie Theater Club (MTC) Application is as follows:

***Front-End:*** Angular (TypeScript)  
***Back-End:*** Spring Boot (Java)  
Cloud: Amazon Web Services (AWS)  


***Angular Components:*** Angular 17, Angular Material UI w/Chart.js

***Java Components:*** JDK 17, Spring Boot 3.2.1, Maven

***Spring Modules:*** Spring MVC REST, Spring Data JPA, Spring ORM, Spring Transaction Management, Spring IOC & Dependency Injection  

***AWS Components:*** Simple Storage Service (S3), Elastic Compute Cloud (EC2), Relational Database Service (RDS), Security Token Service (STS), Application Load Balancer (ALB), Auto Scaling Group (ASG)  


***Design Patterns:*** Model-View-Controller, Dependency Injection, Object-relational mapping, Data Access Object, Repository, Singleton, Factory, Builder, Observer, Composite, Decorator, Adapter  

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

Design Decision wise our Project decided to use the Microservice Architecture over the Monolithic Architecture for Decoupling the Application, Easier Maintenance, and Resilience; meaning if one part of the application goes down the other won’t (UI in contrast with API & vice versa), resiliency determines how fast the Application can recover from downtime. In addition, the Cloud allows for easier swapping of instances and storage solutions without affecting the whole application.
  
We decided to go with Angular Front-End framework for the MVC Architecture and Dependency Injection features. Finally, we used Java Spring Boot as the Back-End Service to decouple the View and Business Layers; the Spring Boot framework also offers other Enterprise convenience features such as MVC, DAO, Repository, Factory, IOC, Dependency Injection…and so on.    

## Architecture Diagrams
***Cloud Architectural Diagram:***  
![Screenshot of the Cloud Architectural Diagram.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/cloud/AWS%20Architecture%20-%20Team%20AlphaQ.jpg)

***UML Deployment Diagram:***
![Screenshot of the UML Deployment Diagram.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/uml/UML%20Deployment%20Diagram%20-%20Team%20AlphaQ.jpg)

***UML Component Diagram:***
![Screenshot of the UML Component Diagram.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/uml/UML%20Component%20Diagram%20-%20Team%20AlphaQ.jpg)

## Wireframes
***Home Page:***  
![Screenshot of the Home Page.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/ui%20wireframes/Home_Page.png)

***Create Account Page:***  
![Screenshot of the Create Account Page.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/ui%20wireframes/Create_Account_Page.png)

***Member Page:***
![Screenshot of the Member Page.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/ui%20wireframes/Member_Page.png)

***Theater Employee Page:***
![Screenshot of the Theater Employee Page.](https://github.com/gopinathsjsu/team-project-alphaq/blob/main/movie-theater-club-ui/src/assets/diagrams/ui%20wireframes/Theater_Employee_Page.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)