# Can I Walk My Dog Today?

<p align="center">
  <img width="640" alt="Screenshot 2024-08-02 165846" src="https://github.com/user-attachments/assets/e6867978-daa7-4d1c-9a6e-40cfc34bb44d">
</p>

<p align="center">
  <a href="https://xryul.github.io/can-I-walk-my-dog-today/">Live Demo</a>
</p>

---

Overheating in dogs can be a fatal. In the UK, exertional heat-related illness (HRI) affects (74.2%), and kills more dogs, than confinement in a hot vehicle (5.2%).

Simply relying on 1 metric (ambient temperature) usually is not enough to determine how much or how vigorously you can exercise your dog. Thus this one-page-website aims to combat that, by providing multiple other factors. As well as, generic walking times based on various other sources.

- Humidity
- Heat Index
- Heat Index Score
- Apparent Temperature
- WBGT (temp. Celsius, humidity, wind speed, solar radiation)

And provide some generic advice based on ASSA Humidity Reference Chart weather you can do Canicross, Bikejorring or Scooter/Rig Classes.

## Key Factors Affecting a Dog's Body Temperature

1. **Ambient Temperature**: High temperatures can quickly increase a dog's body heat, especially during exercise.
2. **Humidity**:  Humidity is one of the most difficult aspects of heat stroke - usually it comes with overcast conditions and cooler temperatures that lead many to believe that it is safe to walk or exercise their dogs outside. However, High humidity (over 35%) reduces the effectiveness of evaporative cooling, and humidity above 80% can negate it entirely.
3. **Exercise Intensity**: Physical activity generates body heat, which can compound the effects of hot and humid weather.

## How It Works



## Formulas for Recommendations
- ASSA has a few recommendations:
  - General Advice. ASSA Recommends that ambient temperatures are below 15 degrees and below 75% humidity, if you still feel this is too warm then don't run ([ASSA Beginner Guide p.8](https://www.assa.dog/wp-content/uploads/2022/09/assa_beginners_guide_v2022.pdf))
  - Apparent Temperature. For more detailed calculation humidity is taken into consideration, and then specific advice provided based on different activity level ([ASSA HUmidity Reference and Apparent Temperature Chart](https://assa.dog/wp-content/uploads/2017/06/Temp-Humdity-Reference-Guide-v1.0-May-2017.pdf))
    - Canicross: Shortenned distances and timings when Apparent temperture is between 18-21.5C
    - Bikejoring: Shortenned distances and timings when Apparent temperture is between 15-17.5C
    - Scooter/Rig: Shortenned distances and timings when Apparent temperture is between 10-14.5C
- Heat Index Score. CaniCross.org.uk recommends simple formula: HUMIDITY x Temperature = Heat Index Score (if this score exceed 1000 - caution should be taken, and exercise distances and timings shortened) (This is covered across all their freely provided training plans [CanniCross Training Plan provided by Canicross UK](https://www.canicross.org.uk/canicross-training-plans))
- Chelmsford Dog Association. Provides Heat Index Chart for Dogs Engaged in Low Activity. [[CDA - Low activity Duration](https://www.chelmsforddogassociation.org/media_uploads/Heat-Index-Chart.pdf)]



## To Do

- [ ] Fix walking advice! It is dangerously high.
- [ ] Look into Input Validation: cities, postcodes, locations
- [ ] Unit options: Celsius, Farenheit
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
- https://www.chelmsforddogassociation.org/media_uploads/Heat-Index-Chart.pdf
- https://www.ukbwg.org.uk/wp-content/uploads/2021/06/210609-BWG-Position-Statement-Heat-related-illness-in-dogs.pdf
- [Thermal Comfort observations](http://www.bom.gov.au/info/thermal_stress/#atapproximation) by Australian Government Bureau of Meteorology
- [Heat Index Calculation - Regression equation of Rothfusz](https://www.wpc.ncep.noaa.gov/heat_index/hi_equation.html)
- [What is the heat index?](https://www.weather.gov/ama/heatindex) by National Weather Service
- NEW improved calculation of HEAT INDEX - [Extending the Heat Index](https://journals.ametsoc.org/view/journals/apme/61/10/JAMC-D-22-0021.1.xml) by Yi-Chuan Lu and David M. Romps 2022