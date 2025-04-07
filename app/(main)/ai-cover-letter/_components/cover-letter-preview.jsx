"use client";

import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";

export default function CoverLetterPreview({ content }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Cover letter copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy cover letter");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Content
        </Button>
      </div>
      
      <div className="border rounded-lg p-6 bg-white">
        <MDEditor.Markdown 
          source={content} 
          style={{ 
            whiteSpace: 'pre-wrap',
            fontFamily: 'Arial, sans-serif'
          }}
        />
      </div>
    </div>
  );
}