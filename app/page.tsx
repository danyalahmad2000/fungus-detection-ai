"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { detectFungus } from "@/lib/tensorflow-utils";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasFungus, setHasFungus] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    symptoms: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        setIsAnalyzing(true);
        setError(null);
        try {
          const { hasFungus, predictedClass } = await detectFungus(imageData); // Get both hasFungus and predictedClass
          setHasFungus(hasFungus);
          setPredictedClass(predictedClass); // Add this state to store the predicted class name
        } catch (error) {
          console.error("Error analyzing image:", error);
          setError("Error analyzing image. Please try again.");
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate phone number
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error("Please enter a valid phone number");
      }

      // Prepare JSON payload
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        symptoms: formData.symptoms,
        hasFungus: hasFungus ? "true" : "false",
      };

      // Send the form data as JSON
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", symptoms: "" });
      setSelectedImage(null);
      setHasFungus(null);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/auth");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Skin Fungus Detection
            </h1>
            <p className="text-lg text-gray-600">
              Upload a photo of your skin condition for AI-powered analysis
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="p-6 mb-8">
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                <Label
                  htmlFor="image-upload"
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                >
                  {selectedImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedImage}
                        alt="Uploaded skin"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click or drag to upload an image (max 5MB)
                      </p>
                    </div>
                  )}
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              {isAnalyzing && (
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing image...</span>
                </div>
              )}

              {!isAnalyzing && hasFungus !== null && (
                <div
                  className={`p-4 rounded-lg ${
                    hasFungus ? "bg-red-50" : "bg-green-50"
                  }`}
                >
                  {hasFungus ? (
                    <div className="flex items-center space-x-2 text-red-700">
                      <AlertCircle className="h-5 w-5" />
                      <span>
                        Fungal infection detected: {predictedClass}. Please fill
                        out the form below.
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>
                        Your skin appears healthy! No fungal infection detected.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {!isAnalyzing && hasFungus && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="symptoms">Describe your symptoms</Label>
                    <Textarea
                      id="symptoms"
                      value={formData.symptoms}
                      onChange={(e) =>
                        setFormData({ ...formData, symptoms: e.target.value })
                      }
                      required
                      disabled={isSubmitting}
                      placeholder="Please describe your symptoms, including when they started and any changes you've noticed..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit to Derma Clinic"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
