# Bootstrap Model My Code Project

## Steps to get things up and running
- This project is using nx in combination with pnpm. The nx libraries are local, but pnpm will need to be installed on the machine.
https://pnpm.io/installation
- run the docker-compose.yaml to setup two containers. One with AxonServer, the other with Postgres.
Alternatively:
  - Go to https://www.axoniq.io/download and download latest version of Axon Server. There are multiple options depending on how you want to run your local version. 
  Go with the default settings or adjust [apps/gateway/src/main.ts](apps/gateway/src/main.ts)
> [!IMPORTANT]
> go to http://localhost:8024/ and finish the installation of axon server by approving the creation of the default context. Otherwise nothing will work!
  
  - Have access to a postgres database. An empty database with the name and settings as provided in [apps/gateway/src/main.ts](apps/gateway/src/main.ts)

# Running the environment
The app environment consists of a NextJS 14 application (**Web-site**) for the front-end and a NodeJS service (**gateway**)to receive and handle the front-end requests.

>pnpm nx run web-site:dev

>pnpm nx run gateway:serve:development

## Web-site 
This nextJS 14 application is using https://ui.shadcn.com/ as building blocks for all the screens.
With https://v0.dev/ we can easily generate all the scaffolding needed to execute commands or display views.
Two examples have been added that either call an action to submit a command or call an action to request a query response.
### routing
<img alt="Screenshot 2024-11-05 081346.png" height="200" src="assets%2FScreenshot%202024-11-05%20081346.png" width="300"/>
<img alt="Screenshot 2024-11-06 145702.png" height="200" src="assets%2FScreenshot%202024-11-06%20145702.png" width="300"/>

For now an easy direct approach has been chosen that links directly back to the setup in Model My Code.
The first part of the route is the name of the context, the second the name of the timeline and the last element is the name of the command or query.
example: 
http://localhost:3000/customer-success/on-boarding/request-trial

http://localhost:3000/customer-success/on-boarding/confirmed-trials-view

## Gateway
The gateway service actually contains all services that are needed by CQRS.
When needed we can split them into separate services to optimize and scale deployment.
It is listing on port 3100 for commands and queries. If you want to change this port you can do this in the main.ts file.

>[!WARNING]
> This is NOT a production ready deployment, but a quick setup to get familiar with how a typescript framework can deliver CQRS.
> Besides safe configuration, this project is not doing any validation of incoming data either.
> This is fully supported by the ebdconnect-framework but not implemented in this project.
