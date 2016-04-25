# Allergens

Since moving to St. Louis, or I've started to have pretty bad pollen allergies. I'm not sure what kind of tree affects me, how much, or in what combination. To find out, I'm starting a long-term experiment: track pollen counts for each day, and survey how I'm doing. Once enough records exist, I'll start making recommendations for antihistimines.

Given the sheer number of variables, I'm going with KNN classification. I'll probably end up writing my own classifier, because that sounds more fun than just `npm install`.

This will probably live on my raspberry pi, so I'm keeping the backend in the cloud. On firebase, because why not learn a whole bunch at once?

### Training Steps
1. At 2:00 every afternoon, send SMS survey
1. Upon response, scrape take today's allergen record, convert to object, tag `true` or `false` for 'needsHistamine'
1. Fetch historical record from firebase, append data.
1. If bad, send SMS with three highest pollen counts.
1. Upon failure, report failure via SMS

### Classification Steps
1. At 6:00 every morning, get the Aeroallergen report.
1. Collect historical records, find mean, convert to standardized values: `(original value - mean) / standard deviation`
1. Take majority of first 10 results, use number of good and bad allergies.
1. Upon failure, report failure via SMS

#### Eventual
* Track weather - if rain predicted at high percentage, report chance of rain.
* Weekly report - Email myself some kind of reporting.

TODO:
* Create Hapi server
* Create IFTTT Maker channel send SMS event service.
* Create IFTTT Maker channel receive SMS event service.
* Create scraper to collect pollen data from http://pollenandmold.stlouisco.com/Pollen_Day_Text.aspx
* Create function to standardize data, and calculate euclidian distance.
* Set up firebase to store data
* Create Standardization formula.
* Stop messing around and write some tests.
