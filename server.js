var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser');
var distance = require('google-distance-matrix');

var bookingId =1;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;   

distance.key('AIzaSyCwoU_LrXsVuZCL0QRUJG4551FgNkAWSGk');
distance.units('metric');
 

var router = express.Router();

var totalcabs = 50;

router.use(function(req, res, next) {
   
    console.log('Request Received');
    next(); 
});

// API to get the Number of cabs available
// To simulate the Get available cabs request
// We have assumed the initial number of cabs are 500
  
router.route('/taxi/:mobileNo')
.get(function(req, res) {

var custMobileNo = req.params.mobileNo;

console.log(' Mobile number is ',  req.params.mobileNo);

if (req.params.mobileNo == 1111111111) 
    res.json({
    "MobileNo": req.params.mobileNo,
    "cabsAvailable": totalcabs,
    "responseMessage": "success"
});
if (req.params.mobileNo != 1111111111) 
res.status(404).json({
    "MobileNo": req.params.mobileNo,
    "cabsAvailable": 0,
    "responseMessage": "Cabs not available"
});
});

// API to get the fare from source location to destination

router.route('/farerequest/:mobileNo')
.post(function(req, res) {

var custMobileNo = req.params.mobileNo;

console.log(' Mobile number is ',  req.params.mobileNo);

// Create a Source Address String
var sourceAddress = req.body.SourceAddress.apartment +  ',' + req.body.SourceAddress.area + ',' +  
req.body.SourceAddress.city + ',' +  req.body.SourceAddress.pincode + ',' + 'India';

// Create a destination Address String
var DestinationAddress = req.body.DestinationAddress.apartment +  ',' + req.body.DestinationAddress.area + ',' +  
req.body.DestinationAddress.city + ',' +  req.body.DestinationAddress.pincode + ',' + 'India';

var origins = [sourceAddress];
var destinations = [DestinationAddress];
var taxiFare =1;

console.log(' Source Address is ',  sourceAddress);
console.log(' Destination Address is ',  DestinationAddress);

// Calculate the Distance

distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
		console.log('Invalid source and destination address');
        return console.log(err);
    }
    if(!distances) {
		console.log('Invalid source and destination address');
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        
         var origin = distances.origin_addresses[0];
         var destination = distances.destination_addresses[0];
         if (distances.rows[0].elements[0].status == 'OK') {
                    var distance = distances.rows[0].elements[0].distance.text;					
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
					taxiFare = parseFloat(distance) * 15;					
					res.json({
						"MobileNo": req.params.mobileNo,
						"Distance": distance,
						"fare": taxiFare,
						"SourceAddress": sourceAddress,
						"DestinationAddress": DestinationAddress,
						"responseMessage": "success"
});
				} else {
                    console.log(destination + ' is not reachable by land from ' + origin);		
					res.json({
						"MobileNo": req.params.mobileNo,
						"Distance": -1,
						"fare": -1,
						"SourceAddress": sourceAddress,
						"DestinationAddress": DestinationAddress,
						"responseMessage": "Invalid Source or Destination Address"
});					

                }           
        
    }
	console.log('Invalid source and destination address');
})

});


// API to Book a taxi from source location to destination

router.route('/booking/:mobileNo')
.post(function(req, res) {

var custMobileNo = req.params.mobileNo;

console.log(' Mobile number is ',  req.params.mobileNo);

var SourceAddress=req.body.SourceAddress;
var DestinationAddress=req.body.DestinationAddress;

console.log(' SourceAddress ',  SourceAddress);
console.log(' DestinationAddress ',  DestinationAddress);

if ( totalcabs > 0)  {
//---

totalcabs = totalcabs -1;
bookingId = bookingId +1;

// Create a Source Address String
var sourceAddress = req.body.SourceAddress.apartment +  ',' + req.body.SourceAddress.area + ',' +  
req.body.SourceAddress.city + ',' +  req.body.SourceAddress.pincode + ',' + 'India';

// Create a destination Address String
var DestinationAddress = req.body.DestinationAddress.apartment +  ',' + req.body.DestinationAddress.area + ',' +  
req.body.DestinationAddress.city + ',' +  req.body.DestinationAddress.pincode + ',' + 'India';

var origins = [sourceAddress];
var destinations = [DestinationAddress];
var taxiFare =1;

console.log(' Source Address is ',  sourceAddress);
console.log(' Destination Address is ',  DestinationAddress);

// Calculate the Distance

distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
		console.log('Invalid source and destination address');
        return console.log(err);
    }
    if(!distances) {
		console.log('Invalid source and destination address');
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        
         var origin = distances.origin_addresses[0];
         var destination = distances.destination_addresses[0];
         if (distances.rows[0].elements[0].status == 'OK') {
                    var distance = distances.rows[0].elements[0].distance.text;
					console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
					taxiFare = parseFloat(distance) * 15;					
					res.json({
						"MobileNo": req.params.mobileNo,
						"BookingId": bookingId,
						"Distance": distance,
						"fare": taxiFare,
						"SourceAddress": sourceAddress,
						"DestinationAddress": DestinationAddress,
						"responseMessage": "success"
});
				} else {
                    console.log(destination + ' is not reachable by land from ' + origin);		
					res.json({
						"MobileNo": req.params.mobileNo,
						"bookingId": -1,
						"Distance": -1,
						"fare": -1,
						"SourceAddress": sourceAddress,
						"DestinationAddress": DestinationAddress,
						"responseMessage": "Invalid Source or Destination Address"
});					

                }           
        
    }
	console.log('Invalid source and destination address');
});

}
});


// API to Modify or Cancel the booking for the taxi 

router.route('/booking/:mobileNo')
.put(function(req, res) {

var custMobileNo = req.params.mobileNo;

console.log(' Mobile number is ',  req.params.mobileNo);

var SourceAddress=req.body.SourceAddress;
var DestinationAddress=req.body.DestinationAddress;
var cancelBooking=req.body.cancelBooking;
var bookingId=req.body.bookingId;

console.log(' SourceAddress ',  SourceAddress);
console.log(' DestinationAddress ',  DestinationAddress);

if ( cancelBooking == "true")  {

totalcabs = totalcabs + 1;
console.log(' totalcabs ',  totalcabs);
    res.json({
    "MobileNo": req.params.mobileNo,
	"cancelBooking": cancelBooking,
	"bookingId": bookingId,    
    "SourceAddress": SourceAddress,
    "DestinationAddress": DestinationAddress,
    "bookingstatus": "cancelled"
}
);
}

if (cancelBooking == "false")  {

// Create a Source Address String
var sourceAddress = req.body.SourceAddress.apartment +  ',' + req.body.SourceAddress.area + ',' +  
req.body.SourceAddress.city + ',' +  req.body.SourceAddress.pincode + ',' + 'India';

// Create a destination Address String
var DestinationAddress = req.body.DestinationAddress.apartment +  ',' + req.body.DestinationAddress.area + ',' +  
req.body.DestinationAddress.city + ',' +  req.body.DestinationAddress.pincode + ',' + 'India';

var origins = [sourceAddress];
var destinations = [DestinationAddress];
var taxiFare =1;

distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
		console.log('Invalid source and destination address');
        return console.log(err);
    }
    if(!distances) {
		console.log('Invalid source and destination address');
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        
         var origin = distances.origin_addresses[0];
         var destination = distances.destination_addresses[0];
         if (distances.rows[0].elements[0].status == 'OK') {
                    var distance = distances.rows[0].elements[0].distance.text;
					console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
					taxiFare = parseFloat(distance) * 15;					
					res.json({
						"MobileNo": req.params.mobileNo,
						"BookingId": bookingId,
						"cancelBooking": cancelBooking,
						"Distance": distance,
						"fare": taxiFare,
						"SourceAddress": sourceAddress,
						"DestinationAddress": DestinationAddress,
						"responseMessage": "success"
});
				} else {
                    console.log(destination + ' is not reachable by land from ' + origin);		
					res.json({
						"MobileNo": req.params.mobileNo,
						"bookingId": -1,
						"Distance": -1,
						"fare": -1,
						"cancelBooking": cancelBooking,
						"SourceAddress": sourceAddress,
						"DestinationAddress": DestinationAddress,
						"responseMessage": "Invalid Source or Destination Address"
});					

                }           
        
    }
	console.log('Invalid source and destination address');
}

);
}

}

);

// API to provide feedback for the Cab ride 

router.route('/bookingfeedback/:mobileNo')
.post(function(req, res) {

console.log(' Mobile number is ',  req.params.mobileNo);
console.log(' bookingId ',  req.body.bookingId);
console.log(' feedback ',  req.body.feedback);

var bookingId=req.body.bookingId;

    res.json({
    "MobileNo": req.params.mobileNo,	
	"bookingId": req.body.bookingId,    
    "feedback": req.body.feedback,
	"responseMessage": "feedback successfully stored"
}
);

});


app.use('/v1/customer', router);

// The server starts
app.listen(port);
console.log('My Taxi booking application started ' + port);