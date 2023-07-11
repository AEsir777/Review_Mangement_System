/****** searchBusiness ******/
/*** Test insert ******/
-- Insert a new business record
CALL InsertIntoBusiness('"MTSW4McQd7CbVtyjqonnmb"', -73.987, 39.9555052, '8AM-5PM', 1, 'YunShang Noodle', '123 Main St', 'N2L 0E2', NULL, 0, 1);

-- Verify the insertion by retrieving the business record
CALL GetBusinessByBid('"MTSW4McQd7CbVtyjqonnmb"');

-- Retrieve a business record by bid
-- Check review count and star
CALL GetBusinessByBid('"kfNv-JZpuN6TVNSO6hHdkw"');
CALL GetBusinessByBid('"MTSW4McQd7CbVtyjqoe9mw"');
CALL GetBusinessByBid('"MTSW4McQd7CbVtyjqonnmb"');
CALL GetBusinessByBid(null);

-- Search for businesses by category, name, state, and city
CALL SearchBusinessBy('Restaurants; Food; Bubble Tea; Coffee & Tea; Bakeries',
 'St Honore Pastries', 'PA', 'Philadelphia');
CALL SearchBusinessBy('Burgers; Fast Food; Sandwiches; Food; Ice Cream & Frozen Yogurt; Restaurants',
 'Sonic Drive-In', 'TN', 'Ashland City');
CALL SearchBusinessBy(null, null, 'PA', 'Philadelphia');
CALL SearchBusinessBy(null, null, 'NY', 'New York');
CALL SearchBusinessBy(null, null, null, 'New York');
CALL SearchBusinessBy(null, null, null, null);
CALL SearchBusinessBy('Korean; Restaurants', null, null, null);
CALL SearchBusinessBy(NULL, null, 'TX', null);
CALL SearchBusinessBy('Italian; Restaurants', null, null, 'Tucson');
CALL SearchBusinessBy('Italian; Restaurants', null, 'AZ', 'Tucson');