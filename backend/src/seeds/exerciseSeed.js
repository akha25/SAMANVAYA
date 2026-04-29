const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Exercise = require('../models/Exercise');

dotenv.config();

// Using raw placeholder URLs or you can swap with real GIFs
const getGif = (id) => `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/0.gif`;

const exercises = [
  // Chest
  {
    name: "Push-up",
    category: "strength",
    muscleGroup: "chest",
    equipment: "none",
    difficulty: "beginner",
    instructions: ["Start in high plank", "Lower body", "Push back up"],
    gifUrl: getGif("0662"),
    caloriesPerMin: 7,
    defaultSets: 3,
    defaultReps: 15,
    tips: ["Keep core tight", "Don't let lower back sag"]
  },
  {
    name: "Barbell Bench Press",
    category: "strength",
    muscleGroup: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: ["Lie on bench", "Grip bar slightly wider than shoulder width", "Lower bar to chest", "Press up"],
    gifUrl: getGif("0025"),
    caloriesPerMin: 6,
    defaultSets: 4,
    defaultReps: 8,
    tips: ["Retract scapula", "Plant feet firmly"]
  },
  {
    name: "Incline Dumbbell Press",
    category: "strength",
    muscleGroup: "chest",
    equipment: "dumbbells",
    difficulty: "intermediate",
    instructions: ["Set bench to 30-45 degrees", "Press dumbbells up", "Lower slowly"],
    gifUrl: getGif("0314"),
    caloriesPerMin: 6,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Don't flare elbows", "Full range of motion"]
  },
  {
    name: "Cable Fly",
    category: "strength",
    muscleGroup: "chest",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: ["Set pulleys high", "Bring handles together", "Squeeze chest", "Return slowly"],
    gifUrl: getGif("0251"),
    caloriesPerMin: 5,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Keep slight bend in elbows"]
  },
  {
    name: "Chest Dips",
    category: "strength",
    muscleGroup: "chest",
    equipment: "machine",
    difficulty: "advanced",
    instructions: ["Lean forward on dip bars", "Lower body", "Push up"],
    gifUrl: getGif("0251"), // Needs better id
    caloriesPerMin: 8,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Lean forward to target chest"]
  },
  // Back
  {
    name: "Pull-up",
    category: "strength",
    muscleGroup: "back",
    equipment: "none",
    difficulty: "intermediate",
    instructions: ["Hang from bar", "Pull chest to bar", "Lower slowly"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 8,
    defaultSets: 3,
    defaultReps: 8,
    tips: ["Initiate with lats", "Don't use momentum"]
  },
  {
    name: "Bent-over Row",
    category: "strength",
    muscleGroup: "back",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: ["Hinge at hips", "Row bar to belly button", "Lower slowly"],
    gifUrl: getGif("0027"),
    caloriesPerMin: 7,
    defaultSets: 4,
    defaultReps: 8,
    tips: ["Keep back straight", "Squeeze shoulder blades"]
  },
  {
    name: "Lat Pulldown",
    category: "strength",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions: ["Sit at machine", "Pull bar to upper chest", "Return slowly"],
    gifUrl: getGif("0150"),
    caloriesPerMin: 5,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Don't lean back too far"]
  },
  {
    name: "Seated Cable Row",
    category: "strength",
    muscleGroup: "back",
    equipment: "cable",
    difficulty: "beginner",
    instructions: ["Sit on bench", "Pull handle to abdomen", "Return slowly"],
    gifUrl: getGif("0150"),
    caloriesPerMin: 5,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Keep chest up", "Don't round lower back"]
  },
  {
    name: "Deadlift",
    category: "strength",
    muscleGroup: "back",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: ["Stand with bar over mid-foot", "Hinge and grip bar", "Lift by extending hips and knees"],
    gifUrl: getGif("0032"),
    caloriesPerMin: 9,
    defaultSets: 3,
    defaultReps: 5,
    tips: ["Keep bar close to body", "Maintain neutral spine"]
  },
  // Shoulders
  {
    name: "Overhead Press",
    category: "strength",
    muscleGroup: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: ["Stand with bar at shoulders", "Press bar overhead", "Return to start"],
    gifUrl: getGif("0041"),
    caloriesPerMin: 6,
    defaultSets: 4,
    defaultReps: 8,
    tips: ["Squeeze glutes", "Don't arch lower back excessively"]
  },
  {
    name: "Lateral Raise",
    category: "strength",
    muscleGroup: "shoulders",
    equipment: "dumbbells",
    difficulty: "beginner",
    instructions: ["Hold dumbbells at sides", "Raise arms to side", "Lower slowly"],
    gifUrl: getGif("0334"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 15,
    tips: ["Lead with elbows", "Keep slight bend in arms"]
  },
  {
    name: "Front Raise",
    category: "strength",
    muscleGroup: "shoulders",
    equipment: "dumbbells",
    difficulty: "beginner",
    instructions: ["Hold dumbbells at front", "Raise arms forward", "Lower slowly"],
    gifUrl: getGif("0334"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Don't swing", "Control the negative"]
  },
  {
    name: "Face Pull",
    category: "strength",
    muscleGroup: "shoulders",
    equipment: "cable",
    difficulty: "intermediate",
    instructions: ["Set cable to upper chest height", "Pull rope to face", "Externally rotate shoulders"],
    gifUrl: getGif("0150"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 15,
    tips: ["Squeeze rear delts", "Keep elbows high"]
  },
  {
    name: "Dumbbell Shrugs",
    category: "strength",
    muscleGroup: "shoulders",
    equipment: "dumbbells",
    difficulty: "beginner",
    instructions: ["Hold dumbbells at sides", "Shrug shoulders up", "Lower slowly"],
    gifUrl: getGif("0334"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Don't roll shoulders", "Straight up and down"]
  },
  // Arms
  {
    name: "Barbell Bicep Curl",
    category: "strength",
    muscleGroup: "arms",
    equipment: "barbell",
    difficulty: "beginner",
    instructions: ["Hold bar with underhand grip", "Curl weight up", "Lower slowly"],
    gifUrl: getGif("0031"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Keep elbows pinned to sides", "Don't use momentum"]
  },
  {
    name: "Hammer Curl",
    category: "strength",
    muscleGroup: "arms",
    equipment: "dumbbells",
    difficulty: "beginner",
    instructions: ["Hold dumbbells with neutral grip", "Curl up", "Lower slowly"],
    gifUrl: getGif("0313"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Squeeze at top"]
  },
  {
    name: "Tricep Pushdown",
    category: "strength",
    muscleGroup: "arms",
    equipment: "cable",
    difficulty: "beginner",
    instructions: ["Hold rope attached to high cable", "Push down until arms are straight", "Return slowly"],
    gifUrl: getGif("0150"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Keep elbows tucked", "Full extension"]
  },
  {
    name: "Skull Crusher",
    category: "strength",
    muscleGroup: "arms",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: ["Lie on bench", "Hold EZ bar over chest", "Lower to forehead", "Extend arms"],
    gifUrl: getGif("0031"),
    caloriesPerMin: 5,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Keep elbows pointing up"]
  },
  {
    name: "Tricep Dips",
    category: "strength",
    muscleGroup: "arms",
    equipment: "none",
    difficulty: "intermediate",
    instructions: ["Place hands on bench", "Lower body", "Push up"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 5,
    defaultSets: 3,
    defaultReps: 12,
    tips: ["Keep back close to bench"]
  },
  // Legs
  {
    name: "Barbell Squat",
    category: "strength",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: ["Place bar on upper back", "Squat down", "Drive back up"],
    gifUrl: getGif("0043"),
    caloriesPerMin: 8,
    defaultSets: 4,
    defaultReps: 8,
    tips: ["Keep chest up", "Drive through heels"]
  },
  {
    name: "Walking Lunges",
    category: "strength",
    muscleGroup: "legs",
    equipment: "dumbbells",
    difficulty: "intermediate",
    instructions: ["Hold dumbbells", "Step forward and lunge", "Alternate legs"],
    gifUrl: getGif("0334"),
    caloriesPerMin: 8,
    defaultSets: 3,
    defaultReps: 20,
    tips: ["Keep torso upright", "Knee shouldn't pass toes"]
  },
  {
    name: "Leg Press",
    category: "strength",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions: ["Sit in machine", "Press sled away", "Lower slowly"],
    gifUrl: getGif("0150"),
    caloriesPerMin: 7,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Don't lock knees at top"]
  },
  {
    name: "Romanian Deadlift",
    category: "strength",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: ["Hold bar", "Hinge at hips", "Lower bar keeping legs relatively straight", "Return up"],
    gifUrl: getGif("0032"),
    caloriesPerMin: 7,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Keep back straight", "Feel stretch in hamstrings"]
  },
  {
    name: "Calf Raise",
    category: "strength",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions: ["Stand on edge of step", "Raise heels", "Lower below parallel"],
    gifUrl: getGif("0150"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 15,
    tips: ["Full range of motion", "Pause at top"]
  },
  // Core
  {
    name: "Plank",
    category: "strength",
    muscleGroup: "core",
    equipment: "none",
    difficulty: "beginner",
    instructions: ["Rest on forearms and toes", "Keep body straight", "Hold"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 5,
    defaultSets: 3,
    defaultReps: 60,
    tips: ["Don't let hips sag", "Squeeze glutes"]
  },
  {
    name: "Crunch",
    category: "strength",
    muscleGroup: "core",
    equipment: "none",
    difficulty: "beginner",
    instructions: ["Lie on back", "Curl shoulders off floor", "Lower slowly"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 4,
    defaultSets: 3,
    defaultReps: 20,
    tips: ["Don't pull on neck"]
  },
  {
    name: "Russian Twist",
    category: "strength",
    muscleGroup: "core",
    equipment: "none",
    difficulty: "intermediate",
    instructions: ["Sit on floor", "Lean back slightly", "Twist torso side to side"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 5,
    defaultSets: 3,
    defaultReps: 20,
    tips: ["Keep core engaged"]
  },
  {
    name: "Hanging Leg Raise",
    category: "strength",
    muscleGroup: "core",
    equipment: "none",
    difficulty: "advanced",
    instructions: ["Hang from bar", "Raise legs straight up", "Lower slowly"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 6,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Don't swing"]
  },
  {
    name: "Mountain Climber",
    category: "cardio",
    muscleGroup: "core",
    equipment: "none",
    difficulty: "beginner",
    instructions: ["Start in high plank", "Drive knees to chest alternatively"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 9,
    defaultSets: 3,
    defaultReps: 30,
    tips: ["Keep hips low", "Move quickly"]
  },
  // Cardio
  {
    name: "Burpees",
    category: "hiit",
    muscleGroup: "full-body",
    equipment: "none",
    difficulty: "advanced",
    instructions: ["Squat down", "Jump to plank", "Do a push-up", "Jump back to squat", "Jump up"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 12,
    defaultSets: 3,
    defaultReps: 15,
    tips: ["Pace yourself"]
  },
  {
    name: "Jumping Jacks",
    category: "cardio",
    muscleGroup: "full-body",
    equipment: "none",
    difficulty: "beginner",
    instructions: ["Jump legs apart while raising arms", "Jump back"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 8,
    defaultSets: 3,
    defaultReps: 50,
    tips: ["Land softly"]
  },
  {
    name: "High Knees",
    category: "hiit",
    muscleGroup: "legs",
    equipment: "none",
    difficulty: "intermediate",
    instructions: ["Run in place", "Drive knees up high"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 10,
    defaultSets: 3,
    defaultReps: 30,
    tips: ["Use arms for momentum"]
  },
  {
    name: "Jump Rope",
    category: "cardio",
    muscleGroup: "full-body",
    equipment: "none",
    difficulty: "beginner",
    instructions: ["Swing rope", "Hop over it"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 11,
    defaultSets: 3,
    defaultReps: 100,
    tips: ["Stay on balls of feet"]
  },
  {
    name: "Box Jump",
    category: "hiit",
    muscleGroup: "legs",
    equipment: "none",
    difficulty: "advanced",
    instructions: ["Stand in front of box", "Squat and jump onto box", "Step down"],
    gifUrl: getGif("0652"),
    caloriesPerMin: 10,
    defaultSets: 3,
    defaultReps: 10,
    tips: ["Land softly in squat position"]
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/samanvaya';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding');

    await Exercise.deleteMany({});
    console.log('Cleared existing exercises');

    await Exercise.insertMany(exercises);
    console.log('Successfully seeded exercises');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
