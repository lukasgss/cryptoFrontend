# Functioning
Front end application of the crypto project, used to visually show coins and exchanges upserted by the worker service.

# Pages
It has a coins listing page, with pagination, an individual coin page to see only details of a specific coin, and listing of exchanges with pagination as well, all of them being responsive.
These are the pages:

\
![image](https://github.com/user-attachments/assets/97bebc07-9993-4616-b4fc-eab2e225590d)
![image](https://github.com/user-attachments/assets/55f84411-fb3d-42fe-95d4-eb738bcb1d0f)
![image](https://github.com/user-attachments/assets/d6c316a5-689d-4af5-9205-e02bbb008a15)

# Observations
- For simplicity reasons, the filtering and ordering of data was done in the front end instead of calling the endpoint, so it only filters within the results of the page. If this application was ever going to production, it would be important that both the filtering and the ordering are done in the back end at the database level.
