"use client";
import Error from "next/error";
import React, { FormEvent } from "react";

export default function Home(): JSX.Element {
  const [topicText, setTopicText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<string[]>([]);
  const [err, setError] = React.useState("");
  async function submitForm(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          topic: topicText,
        }),
      });
      setIsLoading(false);
      const response = await res.json();
      setResult((response.result as string).split("\n"));
    } catch (err) {
      // setError(err)
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-start justify-center p-24">
      <h1 className="text-2xl mb-8">Fun fact of your choice</h1>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <form onSubmit={(e) => submitForm(e)}>
            <input
              type="text"
              value={topicText}
              onChange={(e) => setTopicText(e.target.value)}
              className="p-2 mr-1"
              placeholder="Enter A Topic"
            />
            <button type="submit" className="p-2 mr-2 bg-sky-500 rounded">
              Submit
            </button>
            <button type="reset" className="p-2 bg-green-500 rounded">
              Reset
            </button>
          </form>
          <div>
            {err != "" ? (
              <span className="text-red-500">{err}</span>
            ) : (
              <ul>
                {result.map((ef) => (
                  <li>{ef}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </main>
  );
}
