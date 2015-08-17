# My-Taxi-Booking-Application
REST APIs for Taxi Booking Application

How to start using this application?

1. Make sure the node.js is installed on yiur local desktop
2. Download the code from Github repository
https://github.com/dattatrayhkulkarni/My-Taxi-Booking-Application

3.After downloading the code, 

open the command line, go to folder My-Taxi-Booking-Application

We will need to have all the node modules in place to make this application work.

4. Run below commands.

npm install

5. This command will create a new folder node_modules and download all the requried modules, in it.

6. To start the application, run below command

node server.js			
The below message will be displayed.

My Taxi booking application started 8080


How to test the API?

A tool like REST console of Chrome browser can be used.

1. Get available cabs

http://localhost:8080/v1/customer/taxi/1111111111
GET

Response
{
    "MobileNo": "1111111111",
    "cabsAvailable": 50,
    "responseMessage": "success"
}

2. Fare Request
http://localhost:8080/v1/customer/farerequest/<MobileNo>

Request 
 
 {
    "SourceAddress": {
        "apartment": "Gandhi Bhavan",
        "area": "Gandhi Bhavan Road, Gananjay Society, Kothrud",
        "city": "Pune",
        "pincode": 411038
    },
    "DestinationAddress": {
        "apartment": "Lokmanya Hosiptal",
        "area": "Nigadi Pradhikaran",
        "city": "Pune",
        "pincode": 411004
    }
}



Response 

{
    "MobileNo": "1111111112",
    "Distance": "25.0 km",
    "fare": 375,
    "SourceAddress": "Gandhi Bhavan,Gandhi Bhavan Road, Gananjay Society, Kothrud,Pune,411038,India",
    "DestinationAddress": "Lokmanya Hosiptal,Nigadi Pradhikaran,Pune,411004,India",
    "responseMessage": "success"
}


3. Book a Taxi
POST
http://localhost:8080/v1/customer/booking/<MobileNo> 

{
    "SourceAddress": {
        "apartment": "Gandhi Bhavan",
        "area": "Gandhi Bhavan Road, Gananjay Society, Kothrud",
        "city": "Pune",
        "pincode": 411038
    },
    "DestinationAddress": {
        "apartment": "Lokmanya Hosiptal",
        "area": "Nigadi Pradhikaran",
        "city": "Pune",
        "pincode": 411004
    }
}

Response

{
    "MobileNo": "1111111111",
    "BookingId": 2,
    "Distance": "25.0 km",
    "fare": 375,
    "SourceAddress": "Gandhi Bhavan,Gandhi Bhavan Road, Gananjay Society, Kothrud,Pune,411038,India",
    "DestinationAddress": "Lokmanya Hosiptal,Nigadi Pradhikaran,Pune,411004,India",
    "responseMessage": "success"
}

4. Cancel or Modify Booking

http://mytaxiservice.in/v1/customer/booking/<MobileNo> 
PUT

{
     "bookingId":2,
     "cancelBooking": "true",
    "SourceAddress": {
        "apartment": "Gandhi Bhavan",
        "area": "Gandhi Bhavan Road, Gananjay Society, Kothrud",
        "city": "Pune",
        "pincode": 411038
    },
    "DestinationAddress": {
        "apartment": "Lokmanya Hosiptal",
        "area": "Nigadi Pradhikaran",
        "city": "Pune",
        "pincode": 411004
    }
}

Response

{
    "MobileNo": "1111111111",
    "cancelBooking": "true",
    "bookingId": 2,
    "SourceAddress": {
        "apartment": "Gandhi Bhavan",
        "area": "Gandhi Bhavan Road, Gananjay Society, Kothrud",
        "city": "Pune",
        "pincode": 411038
    },
    "DestinationAddress": {
        "apartment": "Lokmanya Hosiptal",
        "area": "Nigadi Pradhikaran",
        "city": "Pune",
        "pincode": 411004
    },
    "bookingstatus": "cancelled"
}

Modify Booking

http://localhost:8080/v1/customer/booking/1111111111

PUT
request messages

{
     "bookingId":2,
     "cancelBooking": "false",
    "SourceAddress": {
        "apartment": "Gandhi Bhavan",
        "area": "Gandhi Bhavan Road, Gananjay Society, Kothrud",
        "city": "Pune",
        "pincode": 411038
    },
    "DestinationAddress": {
        "apartment": "Pune Uinversity",
        "area": "Pune University",
        "city": "Pune",
        "pincode": 411004
    }
}

Response

{
    "MobileNo": "1111111111",
    "BookingId": 2,
    "cancelBooking": "false",
    "Distance": "4.7 km",
    "fare": 70.5,
    "SourceAddress": "Gandhi Bhavan,Gandhi Bhavan Road, Gananjay Society, Kothrud,Pune,411038,India",
    "DestinationAddress": "Pune Uinversity,Pune University,Pune,411004,India",
    "responseMessage": "success"
}


