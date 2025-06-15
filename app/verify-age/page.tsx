"use client"

import type React from "react"

import {verifyProof}  from "zk-polka-sdk"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, AlertCircle, CheckCircle, ArrowRight, User, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ParticleBackground } from "@/components/particle-background"

export default function VerifyAgePage() {
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(1)
  const router = useRouter()

  useEffect(() => {
    // Check if already verified
    const isVerified = localStorage.getItem("ageVerified")
    if (isVerified) {
      router.push(" ") //checkitiscraZy
    }
  }, [router])

  const verifyAge = async (birthDate: string) => {
  const birth = new Date(birthDate);
  const birthYear = birth.getFullYear();

  try {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthYear }),
    });

    const data = await response.json();
    return data.isValid==1? true : false;
  } catch (e) {
    console.error("ZK verification failed:", e);
    throw e;
  }
};



  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")
    setStep(2)

    try {
      if (!dateOfBirth) {
        setError("Please enter your date of birth")
        setStep(1)
        return
      }

      // Simulate verification steps with progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      const verified = await verifyAge(dateOfBirth);

if (!verified) {
  setError("You must be 18 or older to access Web3 events");
  setStep(1);
  setProgress(0);
  return;
}


      setStep(3)
      localStorage.setItem("ageVerified", "true")
      localStorage.setItem("dateOfBirth", dateOfBirth)
      localStorage.setItem("verificationDate", new Date().toISOString())

      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push(" ") //CheckitisCrazy
    } catch (error) {
      setError("Verification failed. Please try again.")
      setStep(1)
      setProgress(0)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen relative w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6 animate-pulse-slow">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Age Verification</h1>
            <p className="text-gray-300">Verify your age to access exclusive Web3 events</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8 space-x-4">
            {[
              { number: 1, label: "Enter Details", icon: User },
              { number: 2, label: "Verifying", icon: Shield },
              { number: 3, label: "Complete", icon: CheckCircle },
            ].map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= stepItem.number
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step > stepItem.number ? <CheckCircle className="h-6 w-6" /> : <stepItem.icon className="h-6 w-6" />}
                </div>
                {index < 2 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-all duration-300 ${
                      step > stepItem.number ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10 animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle className="text-white flex items-center justify-center gap-2 text-2xl">
                <Calendar className="h-6 w-6" />
                {step === 1 && "Enter Your Details"}
                {step === 2 && "Verifying..."}
                {step === 3 && "Verification Complete!"}
              </CardTitle>
              <CardDescription className="text-gray-300">
                {step === 1 && "Please enter your date of birth to continue"}
                {step === 2 && "Please wait while we verify your information"}
                {step === 3 && "Welcome to the Web3 Events Platform!"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <form onSubmit={handleVerification} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="dob" className="text-white text-lg font-medium">
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="bg-white/10 border-white/20 text-white text-lg p-4 rounded-xl focus:border-purple-500 focus:ring-purple-500 transition-all duration-300"
                      max={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>

                  {error && (
                    <Alert className="bg-red-500/20 border-red-500/50 animate-shake">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-blue-200 text-sm flex items-start gap-2">
                      <Shield className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      Your age information is stored locally and securely. We only verify that you are 18 or older to
                      comply with platform requirements.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Verify Age
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </form>
              )}

              {step === 2 && (
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
                      <Shield className="h-12 w-12 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Progress value={progress} className="w-full h-3 bg-gray-700" />
                    <p className="text-white font-medium">Verifying your information...</p>
                    <p className="text-gray-400 text-sm">{progress}% complete</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className={`flex items-center gap-2 ${progress >= 30 ? "text-green-400" : "text-gray-400"}`}>
                      <CheckCircle className="h-4 w-4" />
                      <span>Validating date format</span>
                    </div>
                    <div className={`flex items-center gap-2 ${progress >= 60 ? "text-green-400" : "text-gray-400"}`}>
                      <CheckCircle className="h-4 w-4" />
                      <span>Calculating age</span>
                    </div>
                    <div className={`flex items-center gap-2 ${progress >= 90 ? "text-green-400" : "text-gray-400"}`}>
                      <CheckCircle className="h-4 w-4" />
                      <span>Verifying eligibility</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center animate-bounce-slow">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Verification Successful!</h3>
                    <p className="text-gray-300">You can now access all Web3 events on our platform</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-200 text-sm">
                      🎉 Welcome to the Web3 community! Redirecting you to events...
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
