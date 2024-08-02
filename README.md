# Can I Walk My Dog Today?

<p align="center">
  <img width="364" alt="Screenshot 2024-08-02 165846" src="https://github.com/user-attachments/assets/b503659f-9ea2-46b6-aab5-00f3ab5cb81b">
</p>

<p align="center">
  <a href="https://xryul.github.io/can-I-walk-my-dog-today/">Live Demo</a>
</p>

---

Dogs overheating can be a fatal. In the UK, exertional heat-related illness affects more dogs (74.2%), and kills more dogs, than confinement in a hot vehicle (5.2%).

## Key Factors Affecting a Dog's Body Temperature

1. **Ambient Temperature**: High temperatures can quickly increase a dog's body heat, especially during exercise.
2. **Humidity**: Humidity is one of the most difficult aspects of heat stroke, as it will many times come with overcast conditions that lead many to believe that it is safe to exercise their dogs outside. The buildup of humidity generally corresponds with slightly cooler temperatures, making owners believe that is is now cool enough to walk or exercise their dogs outside. But usually it is even worse than the heat. 
3. **Exercise Intensity**: Physical activity generates body heat, which can compound the effects of hot and humid weather.

## How It Works

1. **User Input**: Enter the city name into the input field.
2. **Fetch Coordinates**: The application fetches the geographical coordinates of the city using the OpenStreetMap API.
3. **Fetch Weather Data**: It retrieves current temperature and humidity data from the Open-Meteo API.
4. **Calculate Heat Index**: The application calculates the heat index to assess the combined effect of temperature and humidity.
5. **Safe Walking Time Recommendation**: Based on the heat index, the application provides a recommendation on how long it is safe to walk your dog.

## To Do

- [ ] Implement breed-specific recommendations
- [ ] Look into heat acclimation
- [ ] Incorporate findings that male dogs have a higher chance of heatstroke
- [ ] Factor in coat color, as dark-coated dogs have a higher chance of heatstroke
- [ ] Add a Calendar View to plan safe walking times over the coming days based on weather forecasts
- [ ] Provide alternative walking times, suggesting cooler parts of the day if the current conditions are too hot
- [ ] Allow users to input their dog's typical activity level for more precise recommendations
- [ ] Tailor advice based on the age of the dog
- [ ] Include an option to factor in specific health conditions
- [ ] Implement real-time alerts for sudden changes in weather that could impact planned walks
- [ ] Integrate an interactive map showing nearby shaded parks, water stations, and dog-friendly cooling areas
- [ ] Include educational resources on recognizing signs of heat stress and first aid steps for heatstroke

## References

- [Post-exercise management of exertional hyperthermia in dogs participating in dog sport (canicross) events in the UK](https://www.sciencedirect.com/science/article/pii/S0306456524000457) by Anne J. Carter, Emily J. Hall, Jude Bradbury, Sian Beard, Sophie Gilbert, Dominic Barfield, Dan G. O'Neill.
- [Investigating factors affecting the body temperature of dogs competing in cross country (canicross) races in the UK](https://heatstroke.dog/wp-content/uploads/2018/06/final-canicross-canine-temperatures.pdf) by Anne Carter, Emily J. Hall.
- [Too Hot to Run](https://www.canicross.org.uk/post/too-hot-to-run)
- [Temperature & Humidity Reference Guide](https://assa.dog/wp-content/uploads/2017/06/Temp-Humdity-Reference-Guide-v1.0-May-2017.pdf)
- [Beginners Guide](https://www.assa.dog/wp-content/uploads/2022/09/assa_beginners_guide_v2022.pdf)
- [Dogs Don’t Die Just in Hot Cars—Exertional Heat-Related Illness (Heatstroke) Is a Greater Threat to UK Dogs](https://www.mdpi.com/2076-2615/10/8/1324) by Emily J. Hall, Anne J. Carter and Dan G. O'Neill.
- [How Humidity Can Lead To Heat Stroke In Dogs](https://rundawg.com/how-humidity-can-lead-to-heat-stroke-in-dogs/) by Run Dawg, 2022
- [Canine Heat Stroke](https://www.iowaveterinaryspecialties.com/student-scholars/canine-heat-stroke-literature-review) by Victoria T 2017