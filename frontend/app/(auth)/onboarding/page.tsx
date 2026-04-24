"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Form State
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietType, setDietType] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: Number(age),
          gender,
          height: Number(height),
          weight: Number(weight),
          goal,
          activityLevel,
          dietType,
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to complete onboarding");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Let's get to know you</CardTitle>
          <CardDescription className="text-zinc-400">Step {step} of 4</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select onValueChange={(val) => setGender(val || "")} value={gender}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="bg-zinc-800 border-zinc-700" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>What is your goal?</Label>
                <Select onValueChange={(val) => setGoal(val || "")} value={goal}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose weight">Lose Weight</SelectItem>
                    <SelectItem value="gain muscle">Gain Muscle</SelectItem>
                    <SelectItem value="stay fit">Stay Fit</SelectItem>
                    <SelectItem value="improve wellness">Improve Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select onValueChange={(val) => setActivityLevel(val || "")} value={activityLevel}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="lightly active">Lightly Active</SelectItem>
                    <SelectItem value="very active">Very Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Diet Preference</Label>
                <Select onValueChange={(val) => setDietType(val || "")} value={dietType}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="non-veg">Non-veg</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="diabetic">Diabetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={step === 1} className="border-zinc-700 text-zinc-300">
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">Complete</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
