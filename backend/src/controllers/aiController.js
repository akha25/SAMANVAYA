const { Anthropic } = require('@anthropic-ai/sdk');
const User = require('../models/User');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key', // Ensure there's a fallback or let it crash gracefully
});

exports.chat = async (req, res) => {
  try {
    const { message, chatHistory = [], todayLogs = {} } = req.body;
    
    // Fetch user context
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const systemPrompt = `You are Aanya, the AI Health Coach for SAMANVAYA — a holistic health platform.
The user's name is ${user.name || 'User'}, age ${user.age || 'unknown'}, goal is ${user.goal || 'wellness'}, diet is ${user.dietType || 'unspecified'}.
Today they have consumed ${todayLogs.caloriesConsumed || 0} of ${user.dailyCalorieGoal || 2000} calories.
Remaining macros: Protein ${todayLogs.proteinLeft || user.macroGoals?.protein || 0}g, Carbs ${todayLogs.carbsLeft || user.macroGoals?.carbs || 0}g, Fat ${todayLogs.fatLeft || user.macroGoals?.fat || 0}g.
Be warm, encouraging, and practical. Respond in the language the user writes in (Hindi or English/Hinglish friendly).
If the user asks for meal suggestions, suggest meals fitting their remaining macros and diet type.
If the user asks for workouts, consider their goal and activity level.`;

    // Construct messages payload
    const messages = chatHistory.map(msg => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.content
    }));
    
    // Append current user message
    messages.push({ role: 'user', content: message });

    // Mock response if no API key is provided
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.json({
        role: 'ai',
        content: `(Mock Mode) Hello ${user.name}, this is Aanya! To enable real AI responses, please configure the ANTHROPIC_API_KEY in the backend .env file. You said: "${message}"`
      });
    }

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      temperature: 0.7,
      system: systemPrompt,
      messages: messages,
    });

    res.json({
      role: 'ai',
      content: response.content[0].text
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: error.message });
  }
};
