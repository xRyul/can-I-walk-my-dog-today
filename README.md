# can-I-walk-my-dog-today
Can I walk my dog today?

<img width="364" alt="Screenshot 2024-08-02 165846" src="https://github.com/user-attachments/assets/b503659f-9ea2-46b6-aab5-00f3ab5cb81b">

Live at: https://xryul.github.io/can-I-walk-my-dog-today/


Dogs overheating can be a serious issue, leading to heatstroke and other health complications. 

### Key Factors Affecting a Dog's Body Temperature

1. **Ambient Temperature**: High temperatures can quickly increase a dog's body heat, especially during exercise.
2. **Humidity**: High humidity levels make it harder for dogs to cool down through panting, increasing the risk of overheating.
3. **Exercise Intensity**: Physical activity generates body heat, which can compound the effects of hot and humid weather.


## How It Works

1. **User Input**: Enter the city name into the input field.
2. **Fetch Coordinates**: The application fetches the geographical coordinates of the city using the OpenStreetMap API.
3. **Fetch Weather Data**: It retrieves current temperature and humidity data from the Open-Meteo API.
4. **Calculate Heat Index**: The application calculates the heat index to assess the combined effect of temperature and humidity.
5. **Safe Walking Time Recommendation**: Based on the heat index, the application provides a recommendation on how long it is safe to walk your dog.


## To do:

- Implement breed specific recommendaitons
- According to some studies male dogs have higher chance of heatstroke.
- Coat. According to some studies dark-coated dogs have higher chance of heatstroke.
- Calendar View: Add a feature allowing users to view and plan safe walking times over the coming days based on weather forecasts.
- Recommended Walking Times: Provide alternative walking times, suggesting cooler parts of the day if the current conditions are too hot.
- Activity Level Customization: Allow users to input their dog's typical activity level to get more precise recommendations based on their dog's energy needs and heat tolerance.
- Age-Specific Recommendations: Tailor advice based on the age of the dog, as puppies and senior dogs may have different vulnerabilities to heat.
- Health Condition Considerations: Include an option to factor in specific health conditions (e.g., brachycephalic breeds, overweight dogs) that might make a dog more susceptible to heat-related issues.
- Real-Time Alerts: Implement push notifications or email alerts for sudden changes in weather that could impact planned walks.
- Interactive Map: Integrate an interactive map showing nearby shaded parks, water stations, and dog-friendly cooling areas.
- Heat Stress Signs Education: Include educational resources on recognizing signs of heat stress and first aid steps for heatstroke



## References:
- Post-exercise management of exertional hyperthermia in dogs participating in dog sport (canicross) events in the UK . Anne J. Carter, Emily J. Hall, Jude Bradbury,Sian Beard, Sophie Gilbert, Dominic Barfield, Dan G. O'Neill. https://www.sciencedirect.com/science/article/pii/S0306456524000457

- Investigating factors affecting the body temperature of dogs competing in cross country
(canicross) races in the UK. Anne Carter, Emily J. Hall. https://heatstroke.dog/wp-content/uploads/2018/06/final-canicross-canine-temperatures.pdf

- [Too Hot to Run](https://www.canicross.org.uk/post/too-hot-to-run)
- [Temperature & Humidity Reference Guide](https://assa.dog/wp-content/uploads/2017/06/Temp-Humdity-Reference-Guide-v1.0-May-2017.pdf)
- [Beginners Guide](https://www.assa.dog/wp-content/uploads/2022/09/assa_beginners_guide_v2022.pdf)