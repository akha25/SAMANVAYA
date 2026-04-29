// Calculate BMR and TDEE based on the Mifflin-St Jeor equation
exports.calculateMacros = (age, weight, height, gender, activityLevel, goal) => {
  let bmr;
  
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else if (gender === 'female') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  } else {
    // Average for 'other'
    const maleBmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    const femaleBmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    bmr = (maleBmr + femaleBmr) / 2;
  }

  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };

  const tdee = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2));
  
  let calories;
  if (goal === 'lose') calories = tdee - 500;
  else if (goal === 'gain') calories = tdee + 300;
  else calories = tdee;

  // Macros: protein = 2g/kg bodyweight, fat = 25% calories, carbs = remainder
  const protein = Math.round(weight * 2);
  const fat = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - (protein * 4) - (fat * 9)) / 4);

  return {
    bmr: Math.round(bmr),
    tdee,
    calories,
    macros: {
      protein,
      fat,
      carbs
    }
  };
};
