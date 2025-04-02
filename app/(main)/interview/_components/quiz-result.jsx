"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function QuizResult({ result, score, onStartNew }) {
  // Add null checks and default values
  if (!result || !result.questions) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Results Available</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Unable to load quiz results.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const formattedScore = typeof score === 'number' ? score.toFixed(1) : '0.0';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{formattedScore}%</p>
            <p className="text-sm text-muted-foreground">Your Score</p>
          </div>
          <div className="space-y-6">
          
            {result.improvementTip && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Improvement Tip:</p>
                <p className="text-muted-foreground">{result.improvementTip}</p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-medium">Question Review</h3>
              {result.questions.map((q, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{q.question}</p>
                    {q.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Your answer: {q.userAnswer}</p>
                    {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
                  </div>
                  <div className="text-sm bg-muted p-2 rounded">
                    <p className="font-medium">Explanation:</p>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onStartNew} className="w-full">
          Start New Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}